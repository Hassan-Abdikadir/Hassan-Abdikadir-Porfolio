const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  subtitle: { type: String, trim: true },
  category: { type: String, required: true, enum: ['FullStack App', 'Data & AI', 'Web Platform', 'System', 'Other'] },
  description: { type: String, required: true },
  longDesc: { type: String },
  tech: [{ type: String }],
  github: { type: String, default: '#' },
  live: { type: String, default: '#' },
  flagship: { type: Boolean, default: false },
  featured: { type: Boolean, default: false },
  stats: {
    users: { type: String },
    courses: { type: String },
    uptime: { type: String },
    accuracy: { type: String }
  },
  gradient: { type: String, default: 'linear-gradient(135deg, #3B82F6, #8B5CF6)' },
  order: { type: Number, default: 0 },
  status: { type: String, enum: ['live', 'in-progress', 'archived'], default: 'live' }
}, { timestamps: true })

module.exports = mongoose.model('Project', projectSchema)
