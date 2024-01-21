import mongoose from 'mongoose';
import { productService } from "../services/service.js";
import { cartService } from '../services/service.js';
import cartModel from "../Daos/Mongo/models/carts.model.js";
import { logger } from "../middleware/loggers.js";


const readCarts = async (req, res) => {
    try {
        const carts = await cartService.get();
        res.json(carts);
    } catch (error) {
        console.error('Error leyendo carritos:', error);
        res.status(500).send('Error leyendo carritos');
    }
};

const writeCarts = async (req, res) => {
    try {
        const cart = req.body;
        await cartService.insertMany(cart);
        res.send('Carritos escritos en MongoDB');
    } catch (error) {
        console.error('Error escribiendo carritos:', error);
        res.status(500).send('Error escribiendo carritos');
    }
};

const exist = async (req, res) => {
    try {
        const id = req.params.id;
        const cart = await cartService.findById(id);
        res.json({ exists: cart !== null });
    } catch (error) {
        console.error('Error verificando existencia del carrito:', error);
        res.status(500).send('Error verificando existencia del carrito');
    }
};

const addCarts = async (email) => {
    try {
        // Verificar si estás utilizando correctamente el servicio de cartService
        const existingCart = await cartService.getBy({ userEmail: email });

        if (!existingCart) {
            // Asegurarte de que cartService.create recibe correctamente un objeto con userEmail
            const newCart = await cartService.create({ userEmail: email });
            console.log('Carrito asignado con éxito.');
        } else {
            console.log('El usuario ya tiene un carrito asignado.');
        }
    } catch (error) {
        // Revisar qué información contiene el error
        console.error('Error al asignar el carrito:', error);
        throw error;
    }
};


const getCartByID = async (req, res) => {
    try {

        const cart = await cartService.getBy({ _id: req.params.cid });
        res.json(cart || 'Carrito no encontrado');
    } catch (error) {
        console.error('Error obteniendo carrito por ID:', error);
        res.status(500).send('Error obteniendo carrito por ID');
    }
};

const takeProduct = async (req, res) => {
    try {
       
        const cart = await cartService.getBy({ _id: req.params.cid });
        if (!cart) return res.status(404).send('Carrito no encontrado');
       
        const product = await productService.get({ _id: req.params.pid });
        if (!product) return res.status(404).send('Producto no encontrado');
        
        await cartService.addProduct(cart, product);

       
        res.send('Producto agregado al carrito');
    } catch (error) {
        // Manejar errores
        console.error('Error agregando producto al carrito:', error);
        res.status(500).send('Error agregando producto al carrito');
    }
};


export {
    readCarts,
    writeCarts,
    exist,
    addCarts,
    getCartByID,
    takeProduct
};

