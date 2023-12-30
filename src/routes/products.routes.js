import { Router } from 'express'
import { getItems, getItem, createItem, deleteItem, updateItem } from '../controllers/product.controller.js'

const router = Router()





router
    .post("/products", createItem)

    .get('/products', getItems)

    .get('/products/:pid', getItem)

    .delete('/products/:pid', deleteItem)

    .put('/products/:pid', updateItem)



export default router