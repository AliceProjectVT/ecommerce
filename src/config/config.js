import { connect } from "mongoose"
import dotenv from "dotenv"
import program from "../utils/commander.js"
import { logger } from "../middleware/loggers.js"

const { mode } = program.opts()

dotenv.config({
    path: mode === `development` ? `./.env.development` : `./.env.production`
})


const configObject = {
    port: process.env.PORT,
    mongo_url: process.env.DB_URI,
    msg_connection_db: process.env.DB_CONNECT_MSG,
    jwt_private_key: process.env.JWT_CLAVE_PRIVADA,
    sessions_private_key: process.env.SESSIONS_CLAVE_PRIVADA,
    ID_github_client: process.env.CLIENT_ID_GITHUB,
    codigo_github: process.env.CLIENT_SECRET_GITHUB,
    callback_github: process.env.CALLBACK_URL_GITHUB,
}
logger.info(`Start in mode: \x1b[36m${mode}\x1b[0m`);




const dbConnect = async () => {


    try {

        connect(configObject.mongo_url)
        logger.info(configObject.msg_connection_db)
    } catch (error) {

        logger.fatal(`Error al conectar: ${error}`);
    }
}
export { dbConnect, configObject }