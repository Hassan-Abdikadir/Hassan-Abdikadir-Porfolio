const { verifyToken } = require('../utils/jwt')
const User = require('../models/User')

const protect = async (req, res, next) => {
  let token
  const authHeader = req.headers.authorization
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1]
  }
  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized — no token provided.' })
  }
  try {
    const decoded = verifyToken(token)
    const user = await User.findById(decoded.id).select('-password')
    if (!user || !user.isActive) {
      return res.status(401).json({ success: false, message: 'User account not found or deactivated.' })
    }
    req.user = user
    next()
  } catch {
    return res.status(401).json({ success: false, message: 'Token invalid or expired. Please login again.' })
  }
}

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') return next()
  return res.status(403).json({ success: false, message: 'Access denied — Admin only.' })
}

module.exports = { protect, adminOnly }
