const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  snippet: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  readTime: { type: String, default: '5 min read' },
  date: { type: String, default: () => new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) },
  author: { type: String, default: 'Hassan Abdikadir' },
  gradient: { type: String, default: 'linear-gradient(135deg, #2563EB, #7C3AED)' },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  tags: [{ type: String }],
}, { timestamps: true })

module.exports = mongoose.model('Article', articleSchema)
