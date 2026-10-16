const mongoose = require('mongoose')

const chatHistorySchema = new mongoose.Schema({
  sessionId: { type: String, default: 'anonymous' },
  userMessage: { type: String, required: true },
  botResponse: { type: String, required: true },
  intentDetected: { type: String, default: 'general' },
  roleLens: { type: String, default: 'all' },
}, { timestamps: true })

module.exports = mongoose.model('ChatHistory', chatHistorySchema)
