const express = require('express')
const router = express.Router()
const { getExperiences, createExperience } = require('../controllers/experienceController')

router.route('/')
  .get(getExperiences)
  .post(createExperience)

module.exports = router
