
const index = (req, res) => {
    res.render("index")
}
const register = (req, res) => {
    res.render("register")
}
const login = (req, res) => {
    res.render("login")
}
const dash = (req, res) => {
    res.render("admindashboard")
}

const resetPassword = (req, res) => {
    res.render("resetPassword")
}
const catalog = (req, res) => {
    res.render("products")
}
const recovery = (req, res) => {
    res.render("passwordRecovery")
}
const changePassword = (req, res) => {
    res.render("changePassword")
}
export {
    index,
    register,
    login,
    dash,
    resetPassword,
    catalog,
    recovery,
    changePassword
    
}