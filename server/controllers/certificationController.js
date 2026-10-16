const Certification = require('../models/Certification')
const { sendResponse } = require('../utils/apiResponse')

// @desc    Get all certifications
// @route   GET /api/v1/certifications
exports.getCertifications = async (req, res, next) => {
  try {
    const certs = await Certification.find({}).sort({ order: 1 })
    return sendResponse(res, 200, true, 'Certifications retrieved successfully', certs)
  } catch (error) {
    next(error)
  }
}

// @desc    Create certification
// @route   POST /api/v1/certifications
exports.createCertification = async (req, res, next) => {
  try {
    const cert = await Certification.create(req.body)
    return sendResponse(res, 201, true, 'Certification created successfully', cert)
  } catch (error) {
    next(error)
  }
}
