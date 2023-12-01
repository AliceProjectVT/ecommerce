import { Router } from "express";
import CartManager from "../Daos/Mongo/cartManager.js";

const router = Router()
const carts = new CartManager




router.post("/post", async (req, res) => {
    res.send(await carts.addCarts())
})

router.get("/", async (req, res) => {
    res.send(await carts.readCarts())
})
router.get("/:id", async (req, res) => {
    res.send(await carts.getCartsByID(req.params.id))
})
router.post("/:cid/products/:pid", async (req, res) => {

    let cartID = req.params.cid
    let productID = req.params.pid
    res.send(await carts.addProductInCart(cartID, productID))
})



export default router