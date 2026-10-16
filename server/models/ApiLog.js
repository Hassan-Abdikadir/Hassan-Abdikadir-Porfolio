const mongoose = require('mongoose')

const apiLogSchema = new mongoose.Schema({
  endpoint: { type: String, required: true },
  method: { type: String, required: true },
  requestBody: { type: mongoose.Schema.Types.Mixed },
  responseStatus: { type: Number, default: 200 },
  responseData: { type: mongoose.Schema.Types.Mixed },
  latencyMs: { type: Number, default: 0 },
  ip: { type: String, default: '127.0.0.1' },
}, { timestamps: true })

module.exports = mongoose.model('ApiLog', apiLogSchema)
