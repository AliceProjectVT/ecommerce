import { Router } from 'express';
import productRoute from './products.routes.js'
import sessionRoute from './sessions.routes.js'
import userRouter from './api/users.routes.js'
import viewsRouter from './views.routes.js'
import testRouter from './test.routes.js'
const router = Router()

router.use('/api', productRoute)
router.use('/sessions', sessionRoute)
router.use('/api', userRouter)
router.use('/', viewsRouter)
router.use('/test', testRouter)

export default router;
