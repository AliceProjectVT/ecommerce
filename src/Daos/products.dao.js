import productModel from "./Mongo/models/product.model.js";
import { logger } from "../middleware/loggers.js";

class productDao {
    constructor() {
        this.model = productModel
    }


    async get() {
        try {
            return await this.model.find({})

        } catch (error) {
            logger.error(error)
        }
    }
    async getBy(filter) {
        try {
            return await this.model.findOne(filter);
        } catch (error) {
            logger.error(error);
        }
    }
    async create(newProduct) {
        try {

            return await this.model.create(newProduct);

        } catch (error) {
            logger.error('error en daos', error)

        }

    }
    async update(filter, update) {
        try {
            // Utilizar findOneAndUpdate para obtener el documento actualizado
            return await this.model.findOneAndUpdate(filter, update, { new: true });
        } catch (error) {
            logger.error('Error al actualizar producto', error);
            throw error;
        }
    }
}
export default productDao;