const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
require('dotenv').config()

const connectDB = require('./config/db')

const {
  mongoSanitize,
  xssSanitizer,
  hppGuard,
  authRateLimiter,
  contactRateLimiter,
  sandboxRateLimiter
} = require('./middleware/security')

const app = express()

// Connect Database
connectDB()

// 1. HTTP Security Headers (Helmet with Anti-Clickjacking & XSS Protection)
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", process.env.CLIENT_URL || '*']
    }
  },
  crossOriginEmbedderPolicy: false,
  frameguard: { action: 'sameorigin' }, // Anti-Clickjacking
  noSniff: true, // X-Content-Type-Options
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  xssFilter: true
}))

// 2. CORS Policy Configuration
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}))

// 3. Payload Body Limit (Mitigate Payload DoS Attacks)
app.use(express.json({ limit: '500kb' }))
app.use(express.urlencoded({ extended: true, limit: '500kb' }))

// 4. Data Sanitization Against NoSQL Query Injection & XSS & HPP
app.use(mongoSanitize)
app.use(xssSanitizer)
app.use(hppGuard)

// 5. Global Rate Limiter for general API routes
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 150,
  message: { success: false, message: 'Too many requests, please try again later.' }
})
app.use('/api/', globalLimiter)

// 6. Targeted Strict Rate Limiters for Sensitive Endpoints
app.use('/api/v1/auth/login', authRateLimiter)
app.use('/api/v1/auth/register', authRateLimiter)
app.use('/api/v1/admin/login', authRateLimiter)
app.use('/api/v1/contact', contactRateLimiter)
app.use('/api/v1/terminal', sandboxRateLimiter)
app.use('/api/v1/sandbox', sandboxRateLimiter)

// API Routes
app.use('/api/v1/projects', require('./routes/projects'))
app.use('/api/v1/skills', require('./routes/skills'))
app.use('/api/v1/experiences', require('./routes/experiences'))
app.use('/api/v1/certifications', require('./routes/certifications'))
app.use('/api/v1/metrics', require('./routes/metrics'))
app.use('/api/v1/testimonials', require('./routes/testimonials'))
app.use('/api/v1/contact', require('./routes/contact'))
app.use('/api/v1/auth', require('./routes/auth'))
app.use('/api/v1/articles', require('./routes/articles'))
app.use('/api/v1/sandbox', require('./routes/sandbox'))
app.use('/api/v1/telemetry', require('./routes/telemetry'))
app.use('/api/v1/chat', require('./routes/chat'))
app.use('/api/v1/terminal', require('./routes/terminal'))
app.use('/api/v1/admin', require('./routes/admin'))

// Health check endpoint
app.get('/api/v1/health', (req, res) => {
  res.json({
    success: true,
    message: 'Hassan Abdikadir Portfolio MERN API is Live 🚀',
    developer: 'Hassan Abdikadir',
    database: 'MongoDB (MyPortfolio)',
    timestamp: new Date().toISOString(),
    uptime: process.uptime().toFixed(2) + 's',
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' })
})

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack || err.message)
  res.status(500).json({ success: false, message: err.message || 'Internal Server Error' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Hassan's Portfolio Server running on port ${PORT}`)
  console.log(`🌐 Health check: http://localhost:${PORT}/api/v1/health`)
})
