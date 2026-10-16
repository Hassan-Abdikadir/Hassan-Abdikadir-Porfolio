const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, lowercase: true, trim: true },
  subject: { type: String, trim: true, maxlength: 200, default: 'Portfolio Inquiry' },
  message: { type: String, required: true, maxlength: 5000 },
  read: { type: Boolean, default: false },
}, { timestamps: true })

module.exports = mongoose.model('Contact', contactSchema)
