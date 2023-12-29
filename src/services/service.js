//Los services usan los DAOs para hacer las operaciones
import userDaoMongo from '../Daos/user.dao.js'
import productDao from '../Daos/products.dao.js'

const userService = new userDaoMongo()
const productService = new productDao()



export  { userService, productService }