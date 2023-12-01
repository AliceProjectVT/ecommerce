import express from "express"
import router from './routes/index.js'
import dotenv from "dotenv"
import cors from "cors"
import {dbConnect} from "./config/config.js"
import { engine } from "express-handlebars";
import * as path from "path"
import __dirname from "./utils/dirname.js"



//inicializar express
const app = express()
//dotenv para ocultar información 
dotenv.config()


app.use(cors())
//puerto a utilizar


const PORT = process.env.PORT




// iniciar enlace 
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set()

//conexión a MONGO
dbConnect()

//usar rutas del Router
app.use(router)

//motor de plantillas
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))

//middleware para manejar errores

app.use((err, req, res, next) => {
    console.error(err.message)
    return res.status(500).send("Algo se rompió")
})

//Escuchar el puerto y traer la respuesta para confirmar que todo está correcto
app.listen(PORT, () => {
    console.log(`Servidor en el puerto ${PORT}`)

})