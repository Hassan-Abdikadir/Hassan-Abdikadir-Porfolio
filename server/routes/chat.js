const express = require('express')
const router = express.Router()
const { sendChatMessage, getChatHistory } = require('../controllers/chatController')

router.post('/message', sendChatMessage)
router.get('/history', getChatHistory)

module.exports = router
