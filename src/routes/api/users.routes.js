import Router from "express"
import { getUsers, getUser, deleteUser} from "../../controllers/user.controller.js "



const router = Router()

router
    .get('/users', getUsers)
    .get('/users/:uid', getUser)
    .delete('/users/:uid', deleteUser)


export default router