import express from "express"
import router from './routes/index.js'
import dotenv from "dotenv"
import cors from "cors"
import { configObject, dbConnect } from "./config/config.js"
import { engine } from "express-handlebars";
import * as path from "path"
import __dirname from "./utils/dirname.js"
import { addLogger, logger } from "./middleware/loggers.js"
import initializePassport from "./config/passport.config.js"
import MongoStore from "connect-mongo"
import cookieParser from "cookie-parser"
import session from "express-session"
import swaggerJsDoc from "swagger-jsdoc"
import swaggerUiExpress from 'swagger-ui-express'
import { requireTokenHelper } from "./helpers/authHelpers.js"
import { Server } from "socket.io"
//! Handlebars no permitia el acceso a los datos de los objetos, por lo que se tuvo que instalar la siguiente dependencia
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access"
import Handlebars from "handlebars"
//___________________________________________Express_____________________________________
const app = express()

//*___________________________________________Socket configuraciones para Importaciones_____________________________________

const httpServer = app.listen(configObject.port, () => {
    console.log(`Servidor inicializado en el puerto ${configObject.port}`)
})
const socketServer = new Server(httpServer)



//___________________________________________Conexion a Mongo_____________________________________
dbConnect()
//_________________________________________________________________________________________________
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use((req, res, next) => {
    res.locals.cookies = req.cookies
    next()
})

initializePassport()

app.use(cookieParser('secreto'))
app.use(session({
    secret: 'secreto',
    resave: true,
    saveUninitialized: true,

}))
dotenv.config()
app.use(addLogger)
app.use(cors())
//___________________________________________Swagger/documentación_____________________________________
const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Swagger API",
            description: "Api para documentar"
        },

    }, apis: [`src/docs/**/*.yaml`]
}
const specs = swaggerJsDoc(swaggerOptions)

app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

//?___________________________________________Configuracion Handlebars_____________________________________

//___________________________________________Archivos estaticos handlebars(css, js, etc...)_____________________________________
app.use(express.static(path.resolve(__dirname, 'public')));
//___________________________________________Motores para Handlebars_____________________________________
//?___________________________________________Configuracion Helpers_____________________________________



//!_ Se tuvo que instalar la dependencia @handlebars/allow-prototype-access para que handlebars permita el acceso a los datos de los objetos
app.engine("handlebars", engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}))
//___________________________________________extencion de vistas_____________________________________
app.set("view engine", "handlebars")
//___________________________________________ruta de vistas_____________________________________
app.set("views", (__dirname + "/views"))
app.set()
//***___________________________________________Implementar router para Vistas y Endpoints_____________________________________
app.use(router)

//!!___________________________________________Manejo de errores_____________________________________
app.use((err, req, res, next) => {
    logger.error(err.message)
    return res.status(500).send("Algo se rompió")
})


//*___________________________________________Socket listener_____________________________________

socketServer.on('connection', socket => {

    logger.info("Usuario conectado id: " + socket.id)

    socket.on('mensaje', data => {
        console.log(data)
    })
    //? Socket broadcast para enviar a todos los usuarios conectados menos al que envia el mensaje


})
//!___________________________________________Socket listener Close_____________________________________


