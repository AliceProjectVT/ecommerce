import Router from "express"
import { getUsers, getUser, deleteUser, premium_user, createUser } from "../../controllers/user.controller.js "
import passportCall from "../../utils/passportCall.js"
import authorization from "../../middleware/authorization.js"

const router = Router()

router
    .get('/users', passportCall('jwt'), getUsers)
    .get('/users/:uid', getUser)
    .post('/users', createUser)
    .delete('/users/:uid', deleteUser)
    .put("/premium/:uid", premium_user)



export default router