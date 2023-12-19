import { Router } from 'express';
import productRoute from './products.routes.js'
import sessionRoute from './sessions.routes.js'
import userRouter from './users.routes.js'
import viewsRouter from './views.routes.js'
import testRouter from './test.routes.js'
import messagesRouter from './messages.routes.js'
const router = Router()

router.use('/api', productRoute)
router.use('/sessions', sessionRoute)
router.use('/api', userRouter)
router.use('/', viewsRouter)
router.use('/api/messages', messagesRouter)
router.use('/test', testRouter)

export default router;
