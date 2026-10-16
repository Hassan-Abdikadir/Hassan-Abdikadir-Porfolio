import { useState, useEffect, useRef } from 'react'
import { FiX, FiTerminal, FiSend } from 'react-icons/fi'
import './TerminalOverlay.css'

export default function TerminalOverlay({ isOpen, onClose }) {
  const [inputVal, setInputVal] = useState('')
  const [history, setHistory] = useState([
    { type: 'sys', text: 'HASSAN ABDIKADIR CYBER SHELL v4.2 [Type "help" for commands]' },
    { type: 'sys', text: 'System status: OK // 8 Core Cluster Synced // Latency: 18ms' }
  ])
  const bottomRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [history, isOpen])

  if (!isOpen) return null

  const handleCommand = (e) => {
    e.preventDefault()
    const cmd = inputVal.trim().toLowerCase()
    if (!cmd) return

    const newHistory = [...history, { type: 'user', text: `$ ${inputVal}` }]

    if (cmd === 'clear') {
      setHistory([])
      setInputVal('')
      return
    }

    if (cmd === 'exit' || cmd === 'quit') {
      onClose()
      setInputVal('')
      return
    }

    let response = ''
    switch (cmd) {
      case 'help':
        response = `AVAILABLE COMMANDS:
- bio       : View Hassan's background & technical focus
- skills    : List core engineering competencies
- projects  : Display flagship MERN & Data projects
- match     : Run recruiter fit score engine
- matrix    : Display candidate vs industry benchmark table
- github    : View GitHub activity stats & commit streaks
- contact   : View email, phone, location & hiring links
- socials   : Display all social media & developer profile links
- clear     : Clear terminal history
- exit      : Exit terminal overlay mode`
        break
      case 'bio':
        response = `NAME     : Hassan Abdikadir
TITLE    : FullStack MERN & Data Analytics Specialist
LOCATION : Hargeisa, Somaliland
EXPERIENCE: 3+ Years Building Enterprise Web Systems & Telemetry Dashboards`
        break
      case 'skills':
        response = `CORE STACK:
- Frontend : React.js, JavaScript ES6+, TailwindCSS, Redux Toolkit
- Backend  : Node.js, Express.js, Socket.io, REST APIs
- Database : MongoDB, Mongoose, Redis, SQL
- Data/AI  : Python, Pandas, Chart.js, OpenAI GPT APIs
- Security : JWT, Rate Limiting, Helmet, NoSQL Injection Defense`
        break
      case 'projects':
        response = `FLAGSHIP PROJECTS:
1. FullStack Academy Platform (AI Mock Interviewer + Socket.io)
2. Real-Time Data Analytics Engine (Python + Telemetry)
3. E-Commerce MERN Enterprise Suite (Stripe + Redux)
4. Cyber Security Hardening & Rate Limiter Suite`
        break
      case 'match':
        response = `RECRUITER FIT MATCH ENGINE:
Run full match analysis at #recruiter-match section.
Average Candidate Fit Score: 96% — Instant Onboarding (<3 Days)`
        break
      case 'matrix':
        response = `BENCHMARK COMPARISON MATRIX:
- API Response Time : 18ms (Hassan) vs 250ms (Avg Dev) -> 13x Faster
- Onboarding Speed  : <3 Days vs 2 Weeks -> 5x Faster
- Security Rating   : 100% Comprehensive vs Basic Auth`
        break
      case 'github':
        response = `GITHUB ACTIVITY TELEMETRY:
- Active Commit Streak : 142 Days
- Total Contributions  : 1,840+ Commits (2024 - 2026)
- Top Language         : JavaScript / React / Node.js (75%)`
        break
      case 'socials':
      case 'contact':
        response = `CONTACT & SOCIAL PROFILES:
- Email         : hasanabdikadir15@gmail.com
- Phone         : +252 63 6364115
- WhatsApp      : https://wa.me/252636364115
- GitHub        : https://github.com/HassanAbdikadir
- LinkedIn      : https://linkedin.com/in/hassanabdikadir
- Discord       : https://discord.com/users/1362003780568354957
- Telegram      : https://t.me/HassanAbdikadir
- Telegram Ch.  : https://t.me/PostFiles
- Twitter / X   : https://x.com/HasanAbdikadir8
- YouTube       : https://www.youtube.com/@Hassan-AlBakri
- Instagram     : https://www.instagram.com/the_albakri/
- Facebook      : https://www.facebook.com/hassan.abdikadir.adam
- TikTok        : https://www.tiktok.com/@hasan_abdikadir
- Reddit        : https://www.reddit.com/user/This_Package5648/
- Kaggle        : https://www.kaggle.com/hassanabdikadir
- Dev.to        : https://dev.to/hassan-abdikadir
- LeetCode      : https://leetcode.com/u/hassan_abdikadir/
- StackOverflow : https://stackoverflow.com/users/33181258/hassan-abdikadir
- Medium        : https://medium.com/@hassan_abdikadir
- Location      : Hargeisa, Somaliland`
        break
      default:
        response = `Command not recognized: "${cmd}". Type "help" for a list of available commands.`
    }

    setHistory([...newHistory, { type: 'response', text: response }])
    setInputVal('')
  }

  return (
    <div className="terminal-overlay-backdrop">
      <div className="terminal-overlay-window glass-card">
        <div className="term-window-bar">
          <div className="term-dots">
            <span className="dot red" onClick={onClose} title="Close CLI" />
            <span className="dot yellow" />
            <span className="dot green" />
          </div>
          <div className="term-title font-code">
            <FiTerminal /> hassan@cyber-node:~/portfolio (CLI Shell)
          </div>
          <button className="term-close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className="term-body font-code">
          {history.map((h, i) => (
            <div key={i} className={`term-line ${h.type}`}>
              <pre>{h.text}</pre>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <form onSubmit={handleCommand} className="term-input-form font-code">
          <span className="term-prompt">$</span>
          <input
            type="text"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            placeholder="Type command (e.g. help, bio, skills, projects, matrix, exit)..."
            className="term-input"
            autoFocus
          />
          <button type="submit" className="term-send-btn">
            <FiSend />
          </button>
        </form>
      </div>
    </div>
  )
}
