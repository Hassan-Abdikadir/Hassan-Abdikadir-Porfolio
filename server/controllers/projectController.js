const Project = require('../models/Project')
const { sendResponse } = require('../utils/apiResponse')

// @desc    Get all projects
// @route   GET /api/v1/projects
exports.getProjects = async (req, res, next) => {
  try {
    const { category, featured, flagship } = req.query
    const filter = {}
    if (category && category !== 'All') filter.category = category
    if (featured === 'true') filter.featured = true
    if (flagship === 'true') filter.flagship = true

    const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 })
    return sendResponse(res, 200, true, 'Projects retrieved successfully', projects)
  } catch (error) {
    next(error)
  }
}

// @desc    Get single project by ID
// @route   GET /api/v1/projects/:id
exports.getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id)
    if (!project) {
      return sendResponse(res, 404, false, 'Project not found')
    }
    return sendResponse(res, 200, true, 'Project fetched successfully', project)
  } catch (error) {
    next(error)
  }
}

// @desc    Create new project
// @route   POST /api/v1/projects
exports.createProject = async (req, res, next) => {
  try {
    const project = await Project.create(req.body)
    return sendResponse(res, 201, true, 'Project created successfully', project)
  } catch (error) {
    next(error)
  }
}
