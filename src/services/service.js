//Los services usan los DAOs para hacer las operaciones
import userDaoMongo from '../Daos/user.dao.js'
import productDao from '../Daos/products.dao.js'
import cartDao from '../Daos/cart.dao.js'

const userService = new userDaoMongo()
const productService = new productDao()
const cartService = new cartDao()


export { userService, productService, cartService }