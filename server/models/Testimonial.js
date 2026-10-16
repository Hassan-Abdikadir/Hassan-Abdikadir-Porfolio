const mongoose = require('mongoose')

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  role: { type: String, required: true, trim: true },
  company: { type: String, trim: true },
  text: { type: String, required: true },
  avatar: { type: String },
  rating: { type: Number, default: 5 },
  featured: { type: Boolean, default: true }
}, { timestamps: true })

module.exports = mongoose.model('Testimonial', testimonialSchema)
