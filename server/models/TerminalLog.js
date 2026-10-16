const mongoose = require('mongoose')

const terminalLogSchema = new mongoose.Schema({
  command: { type: String, required: true },
  args: [{ type: String }],
  output: { type: String },
  status: { type: String, default: 'OK' },
}, { timestamps: true })

module.exports = mongoose.model('TerminalLog', terminalLogSchema)
