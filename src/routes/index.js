import { Router } from 'express';
import productRoute from './products.routes.js'
import sessionRoute from './sessions.routes.js'
import userRouter from './users.routes.js'
import viewsRouter from './views.routes.js'
const router = Router()

router.use('/api', productRoute)
router.use('/sessions', sessionRoute)
router.use('/api', userRouter)
router.use('/', viewsRouter)

export default router;
