import express from "express"
import router from './routes/index.js'
import dotenv from "dotenv"
import cors from "cors"
import { configObject, dbConnect } from "./config/config.js"
import { engine } from "express-handlebars";
import * as path from "path"
import __dirname from "./utils/dirname.js"
import { Server } from "socket.io"
import { addLogger, logger } from "./middleware/loggers.js"


//inicializar express
const app = express()
//Logger personalizado 
app.use(addLogger)
//inicializar servidor

const server = app.listen(configObject.port, () => {
    logger.info(`Servidor en el puerto ${configObject.port}`)
})

const io = new Server(server);



//dotenv para ocultar información 
dotenv.config()


app.use(cors())
//puerto a utilizar






// iniciar enlace 
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set()

//conexión a MONGO
dbConnect()

//usar rutas del Router
app.use(router)

//archivos estaticos
app.use(express.static(path.resolve(__dirname + "/public")))
//motor de plantillas
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))

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
    socket.on("newProduct", (newProduct) => {
        products.addProduct(newProduct)
        socket.emit("succes", "Producto agregado correctamente")
    });
    socket.on("updateProduct", (updateProduct) => {
        products.updateProduct(updateProduct)
        socket.emit("succes", "Producto actualizado correctamente")
    });
    socket.on("deleteProduct", (deleteProduct) => {
        products.deleteProduct(deleteProduct)
        socket.emit("succes", "Producto eliminado correctamente")
    });

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
