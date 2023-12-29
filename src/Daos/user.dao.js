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
            // Use updateOne to update a document based on the filter
            return await this.model.updateOne(filter, update);
        } catch (error) {
            // Log the error and rethrow it
            logger.error('Error en DAOs', error);
            throw error; // Ensure that the error is thrown to be handled in the higher layer if necessary
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