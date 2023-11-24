import { Router } from 'express'

const router = Router()




router.get('/', (req, res) => {
    res.send({ list: [1, 2, 3] })

})

router.get('/', (req, res) => {

})
router.post("/api", async (req, res) => {
    try {

        const newProduct = req.body

        let result = await productManager.createProduct(newProduct)
        res.send({
            status: 'success',
            payload: result
        })
    } catch (error) {
        console.log(error)
    }

})


export default router