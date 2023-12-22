import Router from "express"
import { register, login } from "../controllers/session.controller.js"
import { isCorrectPassword } from "../utils/hash.js"


const router = Router()


router

    .post("/register", register)
    .post("/login", login)

export default router