import cartModel from '../Daos/Mongo/models/carts.model.js';
import productModel from '../Daos/Mongo/models/product.model.js';
import { logger } from '../middleware/loggers.js';


class cartDao {
    constructor() {
        this.model = cartModel
    }

    async get() {
        try {
            return await this.model.find({})
        } catch (error) {
            logger.error('Error en DAOs', error);
            throw error;
        }
    }

    async getBy(filter) {
        try {
            return await this.model.findOne(filter);
        } catch (error) {
            logger.error('Error en DAOs', error);
            throw error;
        }
    }

    async create(newCart) {
        try {
            return await this.model.create(newCart);
        } catch (error) {
            logger.error('Error en DAOs', error);
            throw error;
        }
    }

    async update(filter, update) {
        try {
            return await this.model.updateOne(filter, update);
        } catch (error) {
            logger.error('Error en DAOs', error);
            throw error;
        }
    }

    async delete(filter) {
        try {
            return await this.model.deleteOne(filter);
        } catch (error) {
            logger.error('Error en DAOs', error);
            throw error;
        }
    }
    async addProduct(cartID, productID) {
        try {
            const cart = await this.model.findById(cartID)
            const product = await productModel.findById(productID)
            if (!cart) throw new Error("Carrito no encontrado")
            if (!product) throw new Error("Producto no encontrado")
            cart.products.push(product)
            await cart.save()
            return cart
        } catch (error) {
            logger.error('Error en DAOs', error);
            throw error;
        }
    }
}

export default cartDao;