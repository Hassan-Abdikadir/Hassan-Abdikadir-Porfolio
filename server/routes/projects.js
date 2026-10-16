const express = require('express')
const router = express.Router()
const { getProjects, getProjectById, createProject } = require('../controllers/projectController')

router.route('/')
  .get(getProjects)
  .post(createProject)

router.route('/:id')
  .get(getProjectById)

module.exports = router
