import Router from "express"
import { register, login, recovery, resetPassword } from "../controllers/session.controller.js"


const router = Router()


router

    .post("/register", register)
    .post("/login", login)
    .post("/recovery", recovery)
    .post('/change-password', resetPassword)
    .get('githubcallback', (req, res) => {
        res.send("github callback")
    })

export default router