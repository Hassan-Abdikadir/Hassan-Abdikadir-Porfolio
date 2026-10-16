const mongoose = require('mongoose')

const codeSubmissionSchema = new mongoose.Schema({
  language: { type: String, required: true, enum: ['javascript', 'python', 'sql'] },
  code: { type: String, required: true },
  output: { type: String },
  executionTimeMs: { type: Number, default: 0 },
  status: { type: String, enum: ['SUCCESS', 'ERROR'], default: 'SUCCESS' },
}, { timestamps: true })

module.exports = mongoose.model('CodeSubmission', codeSubmissionSchema)
