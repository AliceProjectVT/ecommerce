import mongoose from 'mongoose';
import ProductManager from './productManager.js';

// Importa el modelo de carrito (cartModel)
import cartModel from './models/carts.model.js';

const productAll = new ProductManager();

class CartManager {
    constructor() { }

    async connectToDatabase() {
        try {
            await mongoose.connect('mongodb://localhost:27017/your_database_name', {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log('Conectado a MongoDB');
        } catch (error) {
            console.error('Error conectando a MongoDB:', error);
        }
    }

    async readCarts() {
        try {
            return await cartModel.find();
        } catch (error) {
            console.error('Error leyendo carritos desde MongoDB:', error);
            return [];
        }
    }

    async writeCarts(cart) {
        try {
            await cartModel.insertMany(cart);
            console.log('Carritos escritos en MongoDB');
        } catch (error) {
            console.error('Error escribiendo carritos en MongoDB:', error);
        }
    }

    async exist(id) {
        try {
            const cart = await cartModel.findById(id);
            return cart !== null;
        } catch (error) {
            console.error('Error verificando existencia del carrito en MongoDB:', error);
            return false;
        }
    }

    async addCarts() {
        try {
            await this.writeCarts([{ products: [] }]);
            return 'Carrito agregado';
        } catch (error) {
            console.error('Error agregando carrito a MongoDB:', error);
            return 'Error agregando carrito';
        }
    }

    async getCartsByID(id) {
        try {
            const cart = await cartModel.findById(id);
            return cart || 'Carrito no encontrado';
        } catch (error) {
            console.error('Error obteniendo carrito por ID desde MongoDB:', error);
            return 'Error obteniendo carrito por ID';
        }
    }

    async addProductInCart(cartID, productID) {
        try {
            const cart = await cartModel.findById(cartID);
            if (!cart) return 'Carrito no encontrado';

            const product = await productAll.exist(productID);
            if (!product) return 'Producto no encontrado';

            const existingProduct = cart.products.find((prod) => prod.id === productID);
            if (existingProduct) {
                existingProduct.cantidad++;
            } else {
                cart.products.push({ id: product.id, cantidad: 1 });
            }

            await cart.save();
            return 'Producto agregado al carrito';
        } catch (error) {
            console.error('Error agregando producto al carrito en MongoDB:', error);
            return 'Error agregando producto al carrito';
        }
    }
}

export default CartManager;
