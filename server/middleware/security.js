const rateLimit = require('express-rate-limit')
const validator = require('validator')

// 1. Custom NoSQL Injection Sanitizer (Strips '$' and '.' from keys/values in req.body, req.query, req.params)
const mongoSanitize = (req, res, next) => {
  const sanitizeObj = (obj) => {
    if (!obj || typeof obj !== 'object') return obj

    if (Array.isArray(obj)) {
      return obj.map(sanitizeObj)
    }

    const clean = {}
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        // Strip leading $ or . keys used in NoSQL operator injection
        const cleanKey = key.replace(/^\$|\./g, '')
        let val = obj[key]

        if (typeof val === 'string') {
          // If value starts with MongoDB operator prefix like '$gt'
          val = val.replace(/^\$/g, '')
        } else if (typeof val === 'object' && val !== null) {
          val = sanitizeObj(val)
        }

        clean[cleanKey] = val
      }
    }
    return clean
  }

  if (req.body) req.body = sanitizeObj(req.body)
  if (req.query) req.query = sanitizeObj(req.query)
  if (req.params) req.params = sanitizeObj(req.params)

  next()
}

// 2. Custom XSS Payload Cleaner (Sanitizes HTML tags and script vectors)
const xssSanitizer = (req, res, next) => {
  const sanitizeString = (str) => {
    if (typeof str !== 'string') return str
    // Remove inline scripts and event handlers
    let clean = str
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '')
    return clean
  }

  const cleanDeep = (obj) => {
    if (!obj || typeof obj !== 'object') return obj
    if (Array.isArray(obj)) return obj.map(cleanDeep)

    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        obj[key] = sanitizeString(obj[key])
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        cleanDeep(obj[key])
      }
    }
    return obj
  }

  if (req.body) req.body = cleanDeep(req.body)
  if (req.query) req.query = cleanDeep(req.query)

  next()
}

// 3. HTTP Parameter Pollution Guard (HPP)
const hppGuard = (req, res, next) => {
  if (req.query) {
    for (const key in req.query) {
      if (Array.isArray(req.query[key])) {
        // Keep only the last parameter if duplicate parameters are passed
        req.query[key] = req.query[key][req.query[key].length - 1]
      }
    }
  }
  next()
}

// 4. Strict Rate Limiters
// Auth Limiter: 100 attempts in dev, 10 in production (per 15 min)
const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === 'production' ? 10 : 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many authentication attempts from this IP. Please try again after 15 minutes for system security.'
  }
})

// Contact Form Limiter: Max 5 contact messages per 30 minutes
const contactRateLimiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Contact form message limit reached. Hassan will review your previous messages shortly.'
  }
})

// Terminal & API Sandbox Limiter: Max 60 requests per 15 minutes
const sandboxRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Sandbox rate limit exceeded. Please wait a few minutes before executing more terminal commands.'
  }
})

module.exports = {
  mongoSanitize,
  xssSanitizer,
  hppGuard,
  authRateLimiter,
  contactRateLimiter,
  sandboxRateLimiter
}
