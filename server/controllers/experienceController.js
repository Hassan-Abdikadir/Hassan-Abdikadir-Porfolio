const Experience = require('../models/Experience')
const { sendResponse } = require('../utils/apiResponse')

// @desc    Get all experiences
// @route   GET /api/v1/experiences
exports.getExperiences = async (req, res, next) => {
  try {
    const experiences = await Experience.find({}).sort({ order: 1, createdAt: -1 })
    return sendResponse(res, 200, true, 'Experiences retrieved successfully', experiences)
  } catch (error) {
    next(error)
  }
}

// @desc    Create experience
// @route   POST /api/v1/experiences
exports.createExperience = async (req, res, next) => {
  try {
    const exp = await Experience.create(req.body)
    return sendResponse(res, 201, true, 'Experience created successfully', exp)
  } catch (error) {
    next(error)
  }
}
