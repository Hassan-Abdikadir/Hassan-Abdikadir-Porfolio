const express = require('express')
const router = express.Router()
const { getMetrics } = require('../controllers/metricController')

router.route('/')
  .get(getMetrics)

module.exports = router
