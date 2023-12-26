import Router from "express"
import { getUsers, getUser, deleteUser } from "../../controllers/user.controller.js "
import passportCall from "../../utils/passportCall.js"
import auth from "../../middleware/autentication.js"
import passport from "passport"

const router = Router()

router
    .get('/users', passportCall('jwt'), getUsers)
    .get('/users/:uid', getUser)
    .delete('/users/:uid', deleteUser)


export default router