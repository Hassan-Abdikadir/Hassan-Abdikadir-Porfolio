const Contact = require('../models/Contact')
const { sendResponse } = require('../utils/apiResponse')

// @desc    Submit contact message
// @route   POST /api/v1/contact
exports.submitContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body
    if (!name || !email || !message) {
      return sendResponse(res, 400, false, 'Please fill in all required fields (name, email, message)')
    }

    // Validation: Name must not contain numbers
    const cleanName = String(name).trim()
    if (/[0-9]/.test(cleanName)) {
      return sendResponse(res, 400, false, 'Name field must not contain numbers.')
    }
    if (cleanName.length < 2 || cleanName.length > 100) {
      return sendResponse(res, 400, false, 'Name must be between 2 and 100 characters.')
    }

    // Validation: Email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const cleanEmail = String(email).trim().toLowerCase()
    if (!emailRegex.test(cleanEmail)) {
      return sendResponse(res, 400, false, 'Please provide a valid email address.')
    }

    // Validation: Subject & Message length
    const cleanSubject = String(subject || 'Portfolio Contact Inquiry').trim().slice(0, 200)
    const cleanMessage = String(message).trim()
    if (cleanMessage.length < 5 || cleanMessage.length > 5000) {
      return sendResponse(res, 400, false, 'Message must be between 5 and 5000 characters.')
    }

    const contactMsg = await Contact.create({
      name: cleanName,
      email: cleanEmail,
      subject: cleanSubject,
      message: cleanMessage,
      ip: req.ip || req.headers['x-forwarded-for'] || '127.0.0.1'
    })

    // Direct Email Dispatch via Nodemailer (if SMTP configured) or Log
    try {
      const nodemailer = require('nodemailer')
      if (process.env.SMTP_HOST || process.env.EMAIL_USER) {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || 'smtp.gmail.com',
          port: parseInt(process.env.SMTP_PORT || '587'),
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: process.env.EMAIL_USER || 'hasanabdikadir15@gmail.com',
            pass: process.env.EMAIL_PASS
          }
        })

        await transporter.sendMail({
          from: `"Portfolio Contact Form" <${process.env.EMAIL_USER || 'hasanabdikadir15@gmail.com'}>`,
          to: 'hasanabdikadir15@gmail.com',
          replyTo: cleanEmail,
          subject: `📩 New Portfolio Inquiry: ${cleanSubject}`,
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #0f172a; color: #f8fafc; border-radius: 8px;">
              <h2 style="color: #38bdf8;">New Contact Message Received</h2>
              <p><strong>Sender Name:</strong> ${cleanName}</p>
              <p><strong>Sender Email:</strong> ${cleanEmail}</p>
              <p><strong>Subject:</strong> ${cleanSubject}</p>
              <hr style="border-color: #334155; margin: 15px 0;" />
              <p><strong>Message:</strong></p>
              <p style="background: #1e293b; padding: 15px; border-radius: 6px; white-space: pre-wrap;">${cleanMessage}</p>
              <p style="font-size: 0.8em; color: #94a3b8; margin-top: 20px;">Sent from Hassan Abdikadir Portfolio Platform</p>
            </div>
          `
        })
      }
    } catch (mailError) {
      console.warn('Nodemailer notice (SMTP not configured yet or authentication pending):', mailError.message)
    }

    return sendResponse(res, 201, true, 'Thank you! Message delivered successfully to Hassan Abdikadir (hasanabdikadir15@gmail.com).', contactMsg)
  } catch (error) {
    next(error)
  }
}

// @desc    Get all messages (Admin)
// @route   GET /api/v1/contact
exports.getMessages = async (req, res, next) => {
  try {
    const messages = await Contact.find({}).sort({ createdAt: -1 })
    return sendResponse(res, 200, true, 'Messages retrieved successfully', messages)
  } catch (error) {
    next(error)
  }
}
