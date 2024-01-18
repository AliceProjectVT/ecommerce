import { userService } from '../services/service.js';
import userModel from "../Daos/Mongo/models/user.models.js";

//!!IMPORT PARA API DE USUARIOS
import { createHash, isCorrectPassword } from "../utils/hash.js";
import sendMail from "../utils/sendMailer.js";
//!!FIN IMPORT PARA API DE USUARIOS



const getUsers = async (req, res) => {
    try {
        const users = await userService.get();
        res.send({ status: 'success', payload: users })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const getUser = async (req, res) => {
    try {

        const user = await userService.getBy({ _id: req.params.uid });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};





const updateUser = async (req, res) => {
    try {
        const userService = await userService.findById(req.params.id);
        if (userService) {
            userService.name = req.body.name || userService.name;
            userService.email = req.body.email || userService.email;
            userService.password = req.body.password || userService.password;

            const updatedUser = await userService.save();
            res.json(updatedUser);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await userService.getBy({ _id: req.params.uid });
        if (user) {

            await userService.delete({ _id: req.params.uid });
            res.json({ message: 'Usuario eliminado' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(401).send({ status: 'error', error: 'Usuario o Contraseña incorrecto' });
    }

    if (!isCorrectPassword(user.password, password)) {
        return res.status(401).send({ status: 'error', error: 'Password incorrecto' });
    }



    res.status(200).send({
        status: 'success',
        message: "Bienvenido",
    });
}

const premium_user = async (req, res) => {
    try {
        const { uid } = req.params;
        const result = await userService.update({ _id: uid }, {
            role: "user_premium"
        });
        res.send('Usuario actualizado a premium');
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario a premium', error: error.message });
    }
};

//!!RUTA PARA DOCUMENTACIÓN	
const createUser = async (req, res) => {
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

        res.status(201).send({ status: "success", payload: result._id });
        await sendMail(`${user.email}`, "Se ha registrado correctamente.", `<div> Bienvenido </div>`);

    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error", error });
    }
}
export {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    premium_user,
    createUser,
};
