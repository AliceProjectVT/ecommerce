import express from "express"
import router from './routes/index.js'
import dotenv from "dotenv"
import cors from "cors"
import { configObject, dbConnect } from "./config/config.js"
import { engine } from "express-handlebars";
import * as path from "path"
import __dirname from "./utils/dirname.js"
import { Server as HTTPServer } from "http"
import { Server as IOServer } from "socket.io"
import { addLogger, logger } from "./middleware/loggers.js"
import initializePassport from "./config/passport.config.js"
import MongoStore from "connect-mongo"
import cookieParser from "cookie-parser"
import session from "express-session"
import productsIoSocket from "./utils/productoIoSocket.js"
import swaggerJsDoc from "swagger-jsdoc"
import swaggerUiExpress from 'swagger-ui-express'

//inicializar express
const app = express()
const httpServer = new HTTPServer(app)
const io = new IOServer(httpServer);

//conexión a MONGO
dbConnect()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// app.use(session({
//     store: MongoStore.create({
//         mongoUrl: configObject.mongoUrl,
//         mongoOptions: {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,

//         },
//         ttl: 600,
//     }),
//     secret: 'secreto',
//     resave: true,
//     saveUninitialized: true,
// }))
initializePassport()
// app.use(passport.initialize())
app.use(cookieParser('secreto'))
app.use(session({
    secret: 'secreto',
    resave: true,
    saveUninitialized: true,

}))




//dotenv para ocultar información
dotenv.config()

//Logger personalizado
app.use(addLogger)
app.use(cors())

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

//inicializar servidor
httpServer.listen(configObject.port, (err) => {
    if (err) logger.error(err.message)
    logger.info(`Servidor en el puerto ${configObject.port}`)
})




console.log("Proceso", process.pid)

// iniciar enlace

//archivos estaticos
app.use(express.static(path.resolve(__dirname, 'public')));
//motor de plantillas
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", (__dirname + "/views"))
//usar rutas del Router

app.set()
app.use(router)








//middleware para manejar errores

app.use((err, req, res, next) => {
    logger.error(err.message)
    return res.status(500).send("Algo se rompió")
})

//Escuchar el puerto y traer la respuesta para confirmar que todo está correcto



//Conexión a socket.io


io.on("connection", (socket) => {
    logger.info("socket conectado")
    //! INICIO SOCKET

    //*** CRUD RTP  ***/
    // socket.on("newProduct", (newProduct) => {
    //     products.addProduct(newProduct)
    //     socket.emit("succes", "Producto agregado correctamente")
    // });
    // socket.on("updateProduct", (updateProduct) => {
    //     products.updateProduct(updateProduct)
    //     socket.emit("succes", "Producto actualizado correctamente")
    // });
    // socket.on("deleteProduct", (deleteProduct) => {
    //     products.deleteProduct(deleteProduct)
    //     socket.emit("succes", "Producto eliminado correctamente")
    // });

    //! FIN CRUD RTP  !//


    //*** Nodemail  ***/
    socket.on("sendEmail", async ({ email, comment }) => {
        let result = await WebTransport.sendMail({

            from: 'chat correo <islamartinezd@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Hola", // Subject line
            html: `<h1>${comment}</h1>`, // html body
            attachments: []



        })
        socket.emit("succes", "Correo enviado correctamente");

    })



    //! Fin Nodemail /







    //! FIN SOCKET
})
productsIoSocket(io)