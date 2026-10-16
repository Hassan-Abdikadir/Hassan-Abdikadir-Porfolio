import { useState, useRef, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { FiTerminal, FiPlay } from 'react-icons/fi'
import { executeTerminalCommand } from '../../services/portfolioService'
import './Terminal.css'

export default function Terminal({ developer }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([
    { type: 'system', text: 'Hassan Abdikadir Portfolio Interactive Terminal v2.5' },
    { type: 'system', text: 'Type "help" to list available CLI commands.' }
  ])
  const terminalEndRef = useRef(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const handleCommand = async (e) => {
    e.preventDefault()
    const rawInput = input
    const cmd = rawInput.trim().toLowerCase()
    if (!cmd) return

    const newHistory = [...history, { type: 'user', text: `$ ${rawInput}` }]
    setInput('')

    if (cmd === 'clear') {
      setHistory([])
      return
    }

    try {
      // Execute command on MongoDB API backend
      await executeTerminalCommand(rawInput)
    } catch {
      // ignore
    }

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `Available commands:
  • about       : Brief overview of Hassan
  • skills      : List top technical skills
  • projects    : View featured projects
  • contact     : Get contact details
  • socials     : Query all social & technical profile links
  • cv          : Open resume / CV
  • clear       : Clear terminal screen
  • sudo hire   : Execute hiring protocol 🚀`
        })
        break

      case 'about':
        newHistory.push({
          type: 'output',
          text: `[Hassan Abdikadir] - Software Engineer, FullStack MERN Architect & Data Analyst.
Building enterprise-grade platforms, real-time engines, and data intelligence systems.`
        })
        break

      case 'skills':
        newHistory.push({
          type: 'output',
          text: `✦ Frontend : React.js, ES6+, TailwindCSS, Redux Toolkit, Next.js
✦ Backend  : Node.js, Express.js, MongoDB, Socket.io, REST APIs, JWT Security
✦ Data     : Python, Chart.js, SQL / PostgreSQL, Pandas, Telemetry Analytics`
        })
        break

      case 'projects':
        newHistory.push({
          type: 'output',
          text: `⭐ 1. FullStack Academy (Flagship Platform)
📊 2. Data Analytics Dashboard
🛒 3. E-Commerce Enterprise Store
💬 4. Real-Time Socket.io Messaging Engine
🤖 5. AI Technical Mock Interviewer`
        })
        break

      case 'socials':
      case 'contact':
        newHistory.push({
          type: 'output',
          text: `Email         : hasanabdikadir15@gmail.com
Phone         : +252 63 6364115
WhatsApp      : https://wa.me/252636364115
GitHub        : https://github.com/HassanAbdikadir
LinkedIn      : https://linkedin.com/in/hassanabdikadir
Discord       : https://discord.com/users/1362003780568354957
Telegram      : https://t.me/HassanAbdikadir
Telegram Ch.  : https://t.me/PostFiles
Twitter / X   : https://x.com/HasanAbdikadir8
YouTube       : https://www.youtube.com/@Hassan-AlBakri
Instagram     : https://www.instagram.com/the_albakri/
Facebook      : https://www.facebook.com/hassan.abdikadir.adam
TikTok        : https://www.tiktok.com/@hasan_abdikadir
Reddit        : https://www.reddit.com/user/This_Package5648/
Kaggle        : https://www.kaggle.com/hassanabdikadir
Dev.to        : https://dev.to/hassan-abdikadir
LeetCode      : https://leetcode.com/u/hassan_abdikadir/
StackOverflow : https://stackoverflow.com/users/33181258/hassan-abdikadir
Medium        : https://medium.com/@hassan_abdikadir
Location      : Hargeisa, Somaliland`
        })
        break

      case 'sudo hire':
        newHistory.push({
          type: 'success',
          text: `🎉 EXCELLENT DECISION! Hassan is ready to join your engineering team!
Sending automated handshake... Please reach out via contact form or email!`
        })
        break

      default:
        newHistory.push({
          type: 'error',
          text: `Command not recognized: "${cmd}". Type "help" for available commands.`
        })
    }

    setHistory(newHistory)
  }

  return (
    <section id="terminal" className="section terminal-section">
      <div className="grid-bg" />
      <div className="container" ref={ref}>
        <div className={`section-header ${inView ? 'visible' : ''}`}>
          <div className="section-label">interactive.cli</div>
          <h2 className="section-title">
            Interactive Developer <span className="gradient-text">Terminal</span>
          </h2>
          <p className="section-subtitle">
            Prefer command line interface? Interact directly with Hassan's portfolio via terminal prompt.
          </p>
        </div>

        <div className={`terminal-window glass-card ${inView ? 'visible' : ''}`}>
          <div className="terminal-header">
            <div className="terminal-dots">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
            </div>
            <div className="terminal-title">
              <FiTerminal /> hassan@portfolio-cli: ~
            </div>
          </div>

          <div className="terminal-body">
            {history.map((item, index) => (
              <div key={index} className={`terminal-line line-${item.type}`}>
                <pre>{item.text}</pre>
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          <form className="terminal-input-bar" onSubmit={handleCommand}>
            <span className="prompt-symbol">❯</span>
            <input
              type="text"
              className="terminal-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder='Type a command... (e.g. "help", "skills", "sudo hire")'
              maxLength={200}
            />
            <button type="submit" className="terminal-send-btn">
              <FiPlay />
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
