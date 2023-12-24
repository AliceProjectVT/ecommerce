import { Router } from "express";
import { index, register, catalog, login, dash, recovery } from "../controllers/views.controller.js"

const router = Router()
router
    .get("/", index)
    .get("/register", register)
    .get("/catalog", catalog)
    .get("/login", login)
    .get("/dash", dash)
    .get('/recovery', recovery)

export default router