const User = require('../models/User')
const { generateToken } = require('../utils/jwt')

// POST /api/v1/auth/register
exports.register = async (req, res) => {
  try {
    const { name, email, password, company, role } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email and password are required.' })
    }

    const cleanName = String(name).trim()
    if (/[0-9]/.test(cleanName)) {
      return res.status(400).json({ success: false, message: 'Name must not contain numbers.' })
    }
    if (cleanName.length < 2 || cleanName.length > 100) {
      return res.status(400).json({ success: false, message: 'Name must be between 2 and 100 characters.' })
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const cleanEmail = String(email).trim().toLowerCase()
    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' })
    }

    if (typeof password !== 'string' || password.length < 6 || password.length > 128) {
      return res.status(400).json({ success: false, message: 'Password must be between 6 and 128 characters.' })
    }

    const cleanCompany = String(company || '').trim().slice(0, 100)

    const existing = await User.findOne({ email: cleanEmail })
    if (existing) {
      return res.status(409).json({ success: false, message: 'An account with this email already exists.' })
    }

    // First user gets admin role, all others get 'user' or 'recruiter'
    const userCount = await User.countDocuments()
    const assignedRole = userCount === 0 ? 'admin' : (role === 'recruiter' ? 'recruiter' : 'user')

    const user = await User.create({
      name: cleanName,
      email: cleanEmail,
      password,
      company: cleanCompany,
      role: assignedRole
    })

    const token = generateToken(user._id, user.role)

    res.status(201).json({
      success: true,
      message: 'Account created successfully! Welcome to Hassan\'s Portfolio.',
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          company: user.company,
          createdAt: user.createdAt
        }
      }
    })
  } catch (error) {
    console.error('Register error:', error)
    res.status(500).json({ success: false, message: 'Server error during registration.' })
  }
}

// POST /api/v1/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' })
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password')
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' })
    }

    const isMatch = await user.matchPassword(password)
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' })
    }

    if (!user.isActive) {
      return res.status(403).json({ success: false, message: 'Account is deactivated. Contact Hassan for access.' })
    }

    user.lastLogin = new Date()
    await user.save({ validateBeforeSave: false })

    const token = generateToken(user._id, user.role)

    res.json({
      success: true,
      message: `Welcome back, ${user.name}!`,
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          company: user.company,
          lastLogin: user.lastLogin
        }
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ success: false, message: 'Server error during login.' })
  }
}

// GET /api/v1/auth/me
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    res.json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        company: user.company,
        bio: user.bio,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt
      }
    })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch user profile.' })
  }
}

// PUT /api/v1/auth/profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, company, bio } = req.body
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, company, bio },
      { new: true, runValidators: true }
    )
    res.json({ success: true, message: 'Profile updated successfully.', data: user })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update profile.' })
  }
}

// GET /api/v1/auth/users (admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 })
    res.json({ success: true, count: users.length, data: users })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch users.' })
  }
}
