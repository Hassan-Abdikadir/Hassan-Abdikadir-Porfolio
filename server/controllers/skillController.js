const Skill = require('../models/Skill')
const { sendResponse } = require('../utils/apiResponse')

// @desc    Get all skills
// @route   GET /api/v1/skills
exports.getSkills = async (req, res, next) => {
  try {
    const { category } = req.query
    const filter = category && category !== 'All' ? { category } : {}
    const skills = await Skill.find(filter).sort({ order: 1, level: -1 })
    return sendResponse(res, 200, true, 'Skills retrieved successfully', skills)
  } catch (error) {
    next(error)
  }
}

// @desc    Create skill
// @route   POST /api/v1/skills
exports.createSkill = async (req, res, next) => {
  try {
    const skill = await Skill.create(req.body)
    return sendResponse(res, 201, true, 'Skill created successfully', skill)
  } catch (error) {
    next(error)
  }
}
