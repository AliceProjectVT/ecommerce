import { logger } from "../../../middleware/loggers.js"
import { messageService } from "../../../services/service.js";


class messageController {

    getMessages = async (req, res) => {
        try {
            const messages = messageService.getMessages()
            res.send({ message: messages })
        } catch (error) {
            logger.error('getMessages');
        }
    }

    getMessageById = async (req, res) => {
        try {
            const result = messageService.getByMessage()
            res.send({ message: result })
        } catch (error) {
            logger.error('getMessageById');
        }
    }

    createMessage = async (req, res) => {
        try {
            const result = messageService.createMessage()
            res.send({ result: result })
        } catch (error) {
            logger.error('createMessage');
        }
    }

    updateMessage = async (req, res) => {
        try {
            const result = messageService.updateMessage()
            res.send({ result: result })
        } catch (error) {
            logger.error('updateMessage');
        }
    }

    deleteMessage = async (req, res) => {
        try {
            const result = messageService.deleteMessage()
            res.send({ message: result })
        } catch (error) {
            logger.error('deleteMessage');
        }
    }
};


export default messageController;