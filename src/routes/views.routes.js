import { Router } from "express";

const router = Router()
router.get("/", (req, res) => {
    res.render("index")
})
router.get("/register", (req, res) => {
    res.render("register")
})
router.get("/catalog", (req, res) => {
    res.render("products")
})
router.get("/login", (req, res) => {
    res.render("login")
})
.get("/dash", (req, res) => {
    res.render("admindashboard")
})


export default router