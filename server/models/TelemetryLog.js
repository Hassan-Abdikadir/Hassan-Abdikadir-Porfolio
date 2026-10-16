const mongoose = require('mongoose')

const telemetryLogSchema = new mongoose.Schema({
  metricName: { type: String, required: true },
  value: { type: mongoose.Schema.Types.Mixed, required: true },
  category: { type: String, default: 'system' },
  details: { type: String },
}, { timestamps: true })

module.exports = mongoose.model('TelemetryLog', telemetryLogSchema)
