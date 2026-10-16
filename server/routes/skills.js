const express = require('express')
const router = express.Router()
const { getSkills, createSkill } = require('../controllers/skillController')

router.route('/')
  .get(getSkills)
  .post(createSkill)

module.exports = router
