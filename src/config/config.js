import { connect } from "mongoose"
import dotenv from "dotenv"
import program  from "../utils/commander.js"


const { mode } = program.opts()

dotenv.config({
    path: mode === `development` ? `./.env.development` : `./.env.production`
})


console.log(mode)




const dbConnect = async () => {
    const DB_URI = process.env.DB_URI

    try {
        console.log(process.env.DB_CONNECT_MSG)
    } catch (error) {

        console.log(`Error al conectar: ${error}`);
    }
}
export default dbConnect