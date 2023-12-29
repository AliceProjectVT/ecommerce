import { Router } from "express";
import { index, register, catalog, login, dash, recovery, changePassword } from "../controllers/views.controller.js"
import passportCall from "../utils/passportCall.js";
import authorization from "../middleware/authorization.js";

const router = Router()
router
    .get("/", index)
    .get("/register", register)
    .get("/catalog", catalog)
    .get("/login", login)
    .get("/dash", dash)
    .get('/recovery', recovery)
    .get('/dashboard', dash)
    .get('/change-pass', [], changePassword)
export default router