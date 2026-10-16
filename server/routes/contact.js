const express = require('express')
const router = express.Router()
const { submitContact, getMessages } = require('../controllers/contactController')

router.route('/')
  .post(submitContact)
  .get(getMessages)

module.exports = router
