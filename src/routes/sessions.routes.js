import Router from "express"
import userManagerMongo from "../Daos/Mongo/controllers/userManager.js"
import userModel from "../Daos/Mongo/models/userModels.js"
import { createHash, isCorrectPassword } from "../utils/hash.js"

//renombrar las variables del Manejadorx
let userService = new userManagerMongo()

const router = Router()


router.post("/register", async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body

        const exist = await userModel.findOne({ email })
        if (exist) return res.status(401).send({ status: 'error', error: 'El correo se encuentra en uso.' })
        const newUser = {
            first_name,
            last_name,
            email,
            password: createHash(password)
        }
        let result = await userService.createUser(newUser)
        res.send('usuario creado')
        console.log("se ha añadido un nuevo usuario");


    } catch (error) {

        console.log(error);
    }
});


router.get('/:id')


router.get('/')

router.patch('/:id')

router.delete('/:id')

export default router