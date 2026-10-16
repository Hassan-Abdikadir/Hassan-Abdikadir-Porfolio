const express = require('express')
const router = express.Router()
const { getCertifications, createCertification } = require('../controllers/certificationController')

router.route('/')
  .get(getCertifications)
  .post(createCertification)

module.exports = router
