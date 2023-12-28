import Router from "express"
import { register, login, recovery, } from "../controllers/session.controller.js"


const router = Router()


router

    .post("/register", register)
    .post("/login", login)
    .post("/recovery", recovery)
    .get('githubcallback', (req, res) => {
        res.send("github callback")
    })
    
// .get('/github', passport.autenticate('github', { scope: ['user:email'] }), async (req, res) => { })

//     .get('/githubcallback', passport.autenticate('github', { failureRedirect: '/login' }), async (req, res) => {
//     req.session.user = req.user
//     res.redirect('/product')
// })

export default router