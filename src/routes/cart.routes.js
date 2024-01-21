import { Router } from "express";
import { readCarts, getCartByID, takeProduct } from "../controllers/cart.controller.js";


const router = Router()



router
    .post("/post", async (req, res) => {
        res.send(await carts.addCarts())
    })


    .get("/carro/:cid", getCartByID)

    .post("/carro/:cid/products/:pid", takeProduct)

    .get("/carros", readCarts)



    .delete('/:cid/products/:pid', async (req, res) => {
        const { cid, pid } = req.params
        console.log(cid, pid)
        const result = await cartSrvice.removeItemFromCart({ cid, pid })
        res.send(
            {
                status: "success",
                payload: result
            }
        )
    })



export default router