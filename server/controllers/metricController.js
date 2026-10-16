const Metric = require('../models/Metric')
const { sendResponse } = require('../utils/apiResponse')

// @desc    Get all metrics
// @route   GET /api/v1/metrics
exports.getMetrics = async (req, res, next) => {
  try {
    const metrics = await Metric.find({}).sort({ order: 1 })
    return sendResponse(res, 200, true, 'Metrics retrieved successfully', metrics)
  } catch (error) {
    next(error)
  }
}
