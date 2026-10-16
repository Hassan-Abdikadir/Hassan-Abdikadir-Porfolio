const mongoose = require('mongoose')

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, required: true, enum: ['Frontend', 'Backend', 'Data & Analytics', 'DevOps & Tools'] },
  level: { type: Number, required: true, min: 0, max: 100 },
  color: { type: String, default: '#3B82F6' },
  iconKey: { type: String },
  featured: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, { timestamps: true })

module.exports = mongoose.model('Skill', skillSchema)
