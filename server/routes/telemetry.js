const express = require('express')
const router = express.Router()
const { getTelemetryData, logTelemetryEvent } = require('../controllers/telemetryController')

router.get('/', getTelemetryData)
router.post('/log', logTelemetryEvent)

module.exports = router
