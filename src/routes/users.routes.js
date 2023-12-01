import Router from "express"
import userManagerMongo from "../Daos/Mongo/controllers/userManager.js"
import userModel from "../Daos/Mongo/models/user.models.js"

let userService = new userManagerMongo()

const router = Router()

router.get('/users', async (req, res) => {
    try {
        let users = await userService.getUsers()
        res.send({
            status: 'success',
            payload: users
        })
    } catch (error) {
        console.log(error)
    }
})



export default router