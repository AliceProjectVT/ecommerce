import { Router } from 'express';
import productRoute from './products.routes.js'
import sessionRoute from './sessions.routes.js'
import userRouter from './users.routes.js'
const router = Router()

router.use('/products', productRoute)
router.use('/sessions', sessionRoute)
router.use('/api', userRouter)

export default router;
