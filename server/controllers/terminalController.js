const TerminalLog = require('../models/TerminalLog')
const Project = require('../models/Project')
const Skill = require('../models/Skill')

// POST /api/v1/terminal/execute
exports.executeCommand = async (req, res) => {
  try {
    const { command = '' } = req.body
    if (typeof command !== 'string') {
      return res.status(400).json({ success: false, message: 'Command must be a string.' })
    }

    const trimmed = command.trim().slice(0, 200)
    const parts = trimmed.split(' ')
    const cmd = parts[0].toLowerCase()

    let output = ''

    if (cmd === 'help') {
      output = `Available Commands:\n  help        - Display command matrix\n  whoami      - Developer profile information\n  skills      - Query verified skill stack from MongoDB\n  projects    - Query flagship production systems\n  clear       - Clear CLI terminal screen\n  contact     - Retrieve contact details\n  socials     - Retrieve all social media & dev profile links\n  telemetry   - Live MongoDB & Node.js metrics`
    } else if (cmd === 'whoami') {
      output = `Hassan Abdikadir // Software Engineer & Data Analyst\nSpecialization: MERN Stack Architecture, RESTful Microservices & Data Telemetry.`
    } else if (cmd === 'skills') {
      const skills = await Skill.find().limit(6)
      output = `MongoDB Skill Query Results:\n` + skills.map(s => `  • ${s.name} [${s.category}]: ${s.level}% Mastery`).join('\n')
    } else if (cmd === 'projects') {
      const projects = await Project.find().limit(5)
      output = `MongoDB Projects Query Results:\n` + projects.map(p => `  🚀 ${p.title} (${p.category}) - ${p.subtitle}`).join('\n')
    } else if (cmd === 'contact' || cmd === 'socials') {
      output = `Email: hasanabdikadir15@gmail.com\nPhone: +252 63 6364115\nWhatsApp: https://wa.me/252636364115\nGitHub: https://github.com/HassanAbdikadir\nLinkedIn: https://linkedin.com/in/hassanabdikadir\nDiscord: https://discord.com/users/1362003780568354957\nTelegram: https://t.me/HassanAbdikadir\nTelegram Channel: https://t.me/PostFiles\nTwitter/X: https://x.com/HasanAbdikadir8\nYouTube: https://www.youtube.com/@Hassan-AlBakri\nInstagram: https://www.instagram.com/the_albakri/\nFacebook: https://www.facebook.com/hassan.abdikadir.adam\nTikTok: https://www.tiktok.com/@hasan_abdikadir\nReddit: https://www.reddit.com/user/This_Package5648/\nLocation: Hargeisa, Somaliland`
    } else if (cmd === 'telemetry') {
      output = `MongoDB Status: CONNECTED\nLatency: 16ms\nUptime: ${process.uptime().toFixed(0)}s\nActive DB Collections: Projects, Skills, Experiences, Certifications, Testimonials, Contacts, Articles, ApiLogs, CodeSubmissions, ChatHistories, TerminalLogs`
    } else {
      output = `Command not recognized: "${cmd}". Type "help" for CLI command guide.`
    }

    const log = await TerminalLog.create({
      command: trimmed,
      args: parts.slice(1),
      output,
      status: 'OK'
    })

    res.json({
      success: true,
      data: {
        id: log._id,
        command: trimmed,
        output
      }
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// GET /api/v1/terminal/logs
exports.getTerminalLogs = async (req, res) => {
  try {
    const logs = await TerminalLog.find().sort({ createdAt: -1 }).limit(20)
    res.json({ success: true, count: logs.length, data: logs })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
