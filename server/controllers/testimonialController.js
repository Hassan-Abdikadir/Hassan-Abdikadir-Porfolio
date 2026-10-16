const Testimonial = require('../models/Testimonial')
const { sendResponse } = require('../utils/apiResponse')

// @desc    Get all testimonials
// @route   GET /api/v1/testimonials
exports.getTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find({}).sort({ createdAt: -1 })
    return sendResponse(res, 200, true, 'Testimonials retrieved successfully', testimonials)
  } catch (error) {
    next(error)
  }
}

// @desc    Create testimonial
// @route   POST /api/v1/testimonials
exports.createTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.create(req.body)
    return sendResponse(res, 201, true, 'Testimonial created successfully', testimonial)
  } catch (error) {
    next(error)
  }
}
