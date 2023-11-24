import express from "express"
import router from './routes/index.js'
import dotenv from "dotenv"
import cors from "cors"
import dbConnect from "./config/config.js"


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


//conexión a MONGO
dbConnect()

//usar rutas del Router
app.use(router)

//Escuchar el puerto y traer la respuesta para confirmar que todo está correcto
app.listen(PORT, () => {
    console.log(`Servidor en el puerto ${PORT}`)

})