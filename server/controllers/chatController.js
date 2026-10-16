const ChatHistory = require('../models/ChatHistory')

// POST /api/v1/chat/message
exports.sendChatMessage = async (req, res) => {
  try {
    const { message, sessionId = 'anon', roleLens = 'all' } = req.body
    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Message text is required.' })
    }

    const cleanMsg = String(message).trim().slice(0, 500)
    const lower = cleanMsg.toLowerCase()

    let botResponse = ''
    let intent = 'general'

    if (lower.includes('project') || lower.includes('work') || lower.includes('portfolio') || lower.includes('mashruuc')) {
      intent = 'projects'
      botResponse = `Hassan has engineered flagship systems including FullStack Academy (Interactive Learning & AI Mock Interviewer platform) and real-time Data Telemetry dashboards built with React, Node.js, Express, and MongoDB!`
    } else if (lower.includes('skill') || lower.includes('stack') || lower.includes('xirfad')) {
      intent = 'skills'
      botResponse = `Hassan's technical arsenal includes MERN Stack (MongoDB, Express.js, React.js, Node.js), Python Data Analytics, SQL/NoSQL databases, REST API Design, and Microservices Architecture!`
    } else if (lower.includes('contact') || lower.includes('hire') || lower.includes('email') || lower.includes('shaqo')) {
      intent = 'contact'
      botResponse = `You can reach Hassan Abdikadir via email at hassan@portfolio.dev or via the Contact section below. He responds within 24 hours for full-time roles, freelance contracts, and system consulting.`
    } else if (lower.includes('experience') || lower.includes('years') || lower.includes('khibrad')) {
      intent = 'experience'
      botResponse = `Hassan has over 3+ years of professional software engineering and data analytics experience delivering high-impact systems for tech education platforms and enterprise applications.`
    } else {
      botResponse = `Thanks for reaching out! I am Hassan's AI Assistant. Hassan is a Software Engineer & Data Analyst specializing in MERN Stack systems and Data Telemetry. Feel free to ask about his projects, skills, or employment availability!`
    }

    // Store conversation turn in MongoDB
    const chatLog = await ChatHistory.create({
      sessionId: String(sessionId).trim().slice(0, 100),
      userMessage: cleanMsg,
      botResponse,
      intentDetected: intent,
      roleLens: String(roleLens).slice(0, 50)
    })

    res.json({
      success: true,
      data: {
        id: chatLog._id,
        userMessage: cleanMsg,
        botResponse,
        intentDetected: intent,
        timestamp: chatLog.createdAt
      }
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// GET /api/v1/chat/history
exports.getChatHistory = async (req, res) => {
  try {
    const { sessionId = 'anon' } = req.query
    const history = await ChatHistory.find({ sessionId }).sort({ createdAt: 1 }).limit(50)
    res.json({ success: true, count: history.length, data: history })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
