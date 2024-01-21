import { productService } from "../services/service.js"



const index = (req, res) => {
    res.render("index")
}
const register = (req, res) => {
    res.render("register")
}
const login = (req, res) => {
    res.render("login")
}
const dash = async (req, res) => {
    const allProd = await productService.get()
    res.render("admindashboard", { products: allProd })
}

const resetPassword = (req, res) => {
    res.render("resetPassword")
}
const catalog = async (req, res) => {
    const allProd = await productService.get()
    res.render("catalogo", { products: allProd })
}
const recovery = (req, res) => {
    res.render("passwordRecovery")
}
const changePassword = (req, res) => {
    res.render("changePassword")
}
const productos = (req, res) => {
    res.render("catalogo")
}
export {
    index,
    register,
    login,
    dash,
    resetPassword,
    catalog,
    recovery,
    changePassword,
    productos

}