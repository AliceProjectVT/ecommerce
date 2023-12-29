import { Router } from "express";
import CartManager from "../../Daos/Mongo/cartManager.js";

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

router.get('/:cid', async (req, res) => {
    const { cid } = req.params
    const cart = await cartSrvice.getCartBy({ _id: cid })
    res.send(
        {
            status: "success",
            payload: cart
        }
    )
}
)
router.put('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params
    const { qty } = req.body
    const cart = await cartSrvice.addItemToCart({ cid, pid, qty })
    res.send(
        {
            status: "success",
            payload: cart
        }
    )
})

router.delete('/:cid/products/:pid', async (req, res) => {
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