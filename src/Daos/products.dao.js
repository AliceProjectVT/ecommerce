import productModel from "./Mongo/models/product.model.js";

class productDao {
    constructor() {
        this.model = productModel
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
    async update() { }
    async delete(filter) {
        try {
            return await this.model.deleteOne(filter);
        } catch (error) {
            logger.error('error en daos', error);
        }
    }
}
export default productDao;