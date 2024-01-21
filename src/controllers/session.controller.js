import { createHash, isCorrectPassword } from "../utils/hash.js";
import { userService, cartService } from "../services/service.js";
import userModel from "../Daos/Mongo/models/user.models.js";
import sendMail from "../utils/sendMailer.js";
import { generateToken, verifyResetToken } from "../utils/jsonwebtoken.js";
import { addCarts } from "./cart.controller.js";
import passport from "passport";

const register = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        if (!first_name || !last_name || !email || !password) {
            return res.status(400).json({ error: true, message: "Rellena todos los campos." });
        }

        const exist = await userModel.findOne({ email });
        if (exist) {
            console.log("El correo se encuentra en uso.");
            return res.status(401).json({ error: true, message: 'El correo se encuentra en uso.' });
        }

        const hashedPassword = await createHash(password);
        const user = {
            first_name,
            last_name,
            email,
            password: hashedPassword
        };

        // Crear el usuario
        const result = await userService.create(user);

        // Vincular el correo del usuario con el carrito
        await addCarts(user.email);

        res.status(201).send({ status: "success", payload: result._id });

        try {
            await sendMail({
                to: `${user.email}`,
                subject: "Se ha registrado correctamente.",
                html: `<div> Bienvenido </div>`
            });
        } catch (error) {
            console.log("Error al enviar el correo de bienvenida:", error);
        }

    } catch (error) {
        console.log("Error al registrar el usuario:", error);
        res.status(500).send({ status: "error", error });
    }
};

const login = async (req, res) => {
    console.log('Llegó al código del login');
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(401).send({ status: 'error', error: 'Usuario no existe' });
    } console.log('encontró el usuario')

    if (!isCorrectPassword(user.password, password)) {
        return res.status(401).send({ status: 'error', error: 'Datos ingresados incorrectos' });
    } console.log('contraseña correcta')

    const token = generateToken({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role
    });

    res.cookie('cookieToken', token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true
    }).status(200).send({
        status: 'success',
        message: 'logged in successfully'
    });
};

const recovery = async (req, res) => {
    const { email } = req.body;
    const user = await userService.getBy({ email });
    if (!user) {
        console.log("El correo no se encuentra registrado.");
        return res.status(404).send({
            status: 'error',
            error: 'El correo no se encuentra registrado.'
        });
    }

    const token = generateToken({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role
    });

    const resetPass = `http://localhost:4000/change-password?token=${token}`;

    const html = `
    <div><a href="${resetPass}">Cambiar contraseña</a></div>`;
    sendMail({ to: user.email, subject: "Recuperar contraseña", html });

    res.cookie('resetToken', token, {
        maxAge: 60 * 60,
        httpOnly: true,
    }).send('Correo enviado');
};
const resetPassword = async (req, res) => {
    const { token } = req.query;
    const validate = verifyToken(token);
    const emailToken = tokenEmail(token)
    console.log(email)
    if (validate) {
        res.render('changePassword', { token, email: emailToken });
    }
    else {
        res.send('El token no es valido')
    }

    // if (password !== passwordConfirm) {
    //     return res.send({
    //         status: 'error',
    //         error: 'Las contraseñas no coinciden',
    //     });
    // }

    // try {

    //     const hashedPassword = await createHash(password);

    //     const userUpdate = await userService.update({ password: hashedPassword }, { email: cookieToken });
    //     if (!userUpdate) {
    //         return res.send({
    //             status: 'error',
    //             error: 'El correo no se encuentra registrado',
    //         });
    //     }

    //     console.log({ cookieToken });
    //     console.log(password, passwordConfirm);

    //     res.send({
    //         status: 'success',
    //         message: 'La contraseña se cambió correctamente',
    //     });
    // } catch (error) {
    //     console.error('Error resetting password:', error);
    //     res.status(500).send({
    //         status: 'error',
    //         error: 'Error interno del servidor al cambiar la contraseña',
    //     });
    // }
};

export {
    register,
    login,
    recovery,
    resetPassword
};
