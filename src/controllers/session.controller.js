import { createHash, isCorrectPassword } from "../utils/hash.js";
import { userService } from "../services/service.js";
import userModel from "../Daos/Mongo/models/user.models.js";
import sendMail from "../utils/sendMailer.js";

const register = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        if (!first_name || !last_name || !email || !password) {
            return res.status(400).send({ status: "error", error: "Incomplete values" });
        }
        const exist = await userModel.findOne({ email });
        if (exist) {
            console.log("El correo se encuentra en uso.");
            return res.status(401).send({ status: 'error', error: 'El correo se encuentra en uso.' });
        }


        const hashedPassword = await createHash(password);
        const user = {
            first_name,
            last_name,
            email,
            password: hashedPassword
        };
        const result = await userService.create(user);

        res.send({ status: "success", payload: result._id });
        await sendMail(`${user.email}`, "Se ha registrado correctamente.", `<div> Bienvenido </div>`);

    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error", error });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).send({ status: "error", error: "Valores incompletos" });
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            console.log("El correo no se encuentra registrado.");
            return res.status(401).send({ status: 'error', error: 'El correo no se encuentra registrado.' });
        }
        if (!isCorrectPassword(user.password, password)) {
            return res.status(401).send({ status: 'error', error: 'La contraseña es incorrecta.' });
        }
        res.send({ status: "success", payload: user._id });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error", error });
    }
}

const recovery = async (req, res) => {
    const { email } = req.body
    const user = await userService.getBy({ email })
    if (!user) {
        console.log("El correo no se encuentra registrado.");
        return res.status(404).send({
            status: 'error',
            error: 'El correo no se encuentra registrado.'
        });
    }
    //form de cambio de contraseña ingresar email y repetir email
    const html = `
    <div><a href="/change-pass">Cambiar contraseña</a></>`
    sendMail({ to: user.email, subject: "Recuperar contraseña", html })
    //Logica para caducar enlace
    const token = 'tokengenericopararecuperar'
    //logica a seguir, 
    //const token = generateToken({first_name: user.first_name, last_name: user.last_name, email: user.email role:'user'})
    res.cookie('cookieToken', token, {
        maxAge: 60 * 60,
        httpOnly: true,
    }).send('Correo enviado')
}

export {
    register,
    login,
    recovery
};
