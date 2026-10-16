const mongoose = require('mongoose')

const experienceSchema = new mongoose.Schema({
  type: { type: String, required: true, enum: ['work', 'education'] },
  title: { type: String, required: true, trim: true },
  org: { type: String, required: true, trim: true },
  period: { type: String, required: true },
  desc: { type: String, required: true },
  tags: [{ type: String }],
  gradient: { type: String, default: 'var(--grad-hero)' },
  order: { type: Number, default: 0 }
}, { timestamps: true })

module.exports = mongoose.model('Experience', experienceSchema)
