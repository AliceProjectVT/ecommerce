import Router from "express"
import { getUsers, getUser, deleteUser, premium_user } from "../../controllers/user.controller.js "
import passportCall from "../../utils/passportCall.js"
import authorization from "../../middleware/authorization.js"

const router = Router()

router
    .get('/users', passportCall('jwt'), authorization(['ADMIN']), getUsers)
    .get('/users/:uid', getUser)
    .delete('/users/:uid', deleteUser)
    .put("/premium/:uid", premium_user)



export default router