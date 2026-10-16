const express = require('express')
const router = express.Router()
const { executeApi, runCode, getSandboxLogs } = require('../controllers/sandboxController')

router.post('/execute-api', executeApi)
router.post('/run-code', runCode)
router.get('/logs', getSandboxLogs)

module.exports = router
