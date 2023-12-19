import Router from "express"
import  messageController  from "../Daos/Mongo/controllers/messages.controller.js"


const { getMessages, createMessage, updateMessage, deleteMessage } = new messageController()
const router = Router()
router
    .get('/', getMessages)
    .post('/', createMessage)
    .put('/:mid', updateMessage)
    .delete('/:mid', deleteMessage)

export default router