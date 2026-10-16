const express = require('express')
const router = express.Router()
const { executeCommand, getTerminalLogs } = require('../controllers/terminalController')

router.post('/execute', executeCommand)
router.get('/logs', getTerminalLogs)

module.exports = router
