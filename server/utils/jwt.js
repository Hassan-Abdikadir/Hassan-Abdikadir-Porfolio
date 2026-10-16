const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || 'hassan_portfolio_jwt_super_secret_2026'
const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d'

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, JWT_SECRET, { expiresIn: JWT_EXPIRE })
}

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET)
}

module.exports = { generateToken, verifyToken }
