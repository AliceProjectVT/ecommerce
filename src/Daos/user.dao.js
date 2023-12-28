//los DAOs usan los modelos para hacer las operaciones
import userModel from "../Daos/Mongo/models/user.models.js";
import { logger } from "../middleware/loggers.js";

class userDao {
    constructor() {
        this.model = userModel
    }


    async get() {
        try {
            return await this.model.find({})

        } catch (error) {
            console.log(error)
        }
    }
    async getBy(filter) {
        try {
            return await this.model.findOne(filter);
        } catch (error) {
            console.log(error);
        }
    }
    async create(newUser) {
        try {

            return await this.model.create(newUser);

        } catch (error) {
            logger.error('error en daos', error)

        }

    }
    async update(filter, update) {
        try {
            return await this.model.updateOne(filter, update);
        } catch (error) {
            logger.error('Error en DAOs', error);
            throw error; // Asegurémonos de lanzar el error para que pueda ser manejado en la capa superior si es necesario
        }
    }
    
    async delete(filter) {
        try {
            return await this.model.deleteOne(filter);
        } catch (error) {
            logger.error('error en daos', error);
        }
    }
}

export default userDao