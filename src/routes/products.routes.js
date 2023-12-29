import { Router } from 'express'
import { getItems, getItem, createItem } from '../controllers/product.controller.js'

const router = Router()




router.get('/', (req, res) => {
    res.send({ list: [1, 2, 3] })

})

router.get('/products', getItems)
router.get('/products', getItem)
router.post("/products", createItem)


export default router