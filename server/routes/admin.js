const express = require('express')
const router = express.Router()
const {
  loginAdmin,
  getContactMessages,
  deleteContactMessage,
  createProject,
  createSkill,
  getSystemLogs
} = require('../controllers/adminController')

router.post('/login', loginAdmin)
router.get('/messages', getContactMessages)
router.delete('/messages/:id', deleteContactMessage)
router.post('/projects', createProject)
router.post('/skills', createSkill)
router.get('/logs', getSystemLogs)

module.exports = router
