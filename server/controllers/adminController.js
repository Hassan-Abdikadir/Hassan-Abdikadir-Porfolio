const { sendSuccess, sendError } = require('../utils/apiResponse')
const Contact = require('../models/Contact')
const Project = require('../models/Project')
const Skill = require('../models/Skill')
const ApiLog = require('../models/ApiLog')
const TerminalLog = require('../models/TerminalLog')

// Admin Authentication
const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USER || 'hassan.admin',
  password: process.env.ADMIN_PASSWORD || 'hassan123456'
}

exports.loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      const token = `hassan_admin_token_${Date.now()}`
      return sendSuccess(res, { token, username }, 'Admin authenticated successfully')
    }
    return sendError(res, 'Invalid Admin Credentials', 401)
  } catch (error) {
    return sendError(res, 'Server Auth Error', 500, error)
  }
}

exports.getContactMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 })
    return sendSuccess(res, messages, 'Contact messages fetched successfully')
  } catch (error) {
    return sendError(res, 'Failed to fetch messages', 500, error)
  }
}

exports.deleteContactMessage = async (req, res) => {
  try {
    const { id } = req.params
    await Contact.findByIdAndDelete(id)
    return sendSuccess(res, null, 'Message deleted successfully')
  } catch (error) {
    return sendError(res, 'Failed to delete message', 500, error)
  }
}

exports.createProject = async (req, res) => {
  try {
    const { title, subtitle, description, category } = req.body
    if (!title || !subtitle || !description) {
      return sendError(res, 'Title, subtitle, and description are required fields.', 400)
    }

    const cleanTitle = String(title).trim().slice(0, 150)
    const cleanSubtitle = String(subtitle).trim().slice(0, 250)
    const cleanDesc = String(description).trim().slice(0, 3000)

    const project = await Project.create({
      ...req.body,
      title: cleanTitle,
      subtitle: cleanSubtitle,
      description: cleanDesc,
      category: category || 'FullStack App'
    })
    return sendSuccess(res, project, 'Project created successfully', 201)
  } catch (error) {
    return sendError(res, 'Failed to create project', 400, error)
  }
}

exports.createSkill = async (req, res) => {
  try {
    const { name, category, level } = req.body
    if (!name) {
      return sendError(res, 'Skill name is required.', 400)
    }

    const cleanName = String(name).trim().slice(0, 100)
    const numLevel = Math.max(1, Math.min(100, parseInt(level) || 90))

    const skill = await Skill.create({
      ...req.body,
      name: cleanName,
      category: category || 'Backend',
      level: numLevel
    })
    return sendSuccess(res, skill, 'Skill created successfully', 201)
  } catch (error) {
    return sendError(res, 'Failed to create skill', 400, error)
  }
}

exports.getSystemLogs = async (req, res) => {
  try {
    const apiLogs = await ApiLog.find().sort({ createdAt: -1 }).limit(15)
    const terminalLogs = await TerminalLog.find().sort({ createdAt: -1 }).limit(15)
    return sendSuccess(res, { apiLogs, terminalLogs }, 'System logs fetched successfully')
  } catch (error) {
    return sendError(res, 'Failed to fetch logs', 500, error)
  }
}
