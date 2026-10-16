import { useState, useRef, useEffect } from 'react'
import { FiMessageSquare, FiX, FiSend, FiCpu, FiUser, FiZap } from 'react-icons/fi'
import { sendChatMessage } from '../../services/portfolioService'
import './AIChatbot.css'

const presetPrompts = [
  "🚀 What are Hassan's key skills?",
  "⭐ Tell me about FullStack Academy",
  "📊 Does Hassan specialize in Data Analytics?",
  "💼 Is Hassan available for remote work?",
]

export default function AIChatbot({ developer }) {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: `Hello! I am **Hassan's Portfolio AI Assistant**. 🤖\nAsk me anything about Hassan's architecture experience, skills, projects, or hireability!`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ])
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSend = async (textToSend) => {
    const query = textToSend || input
    if (!query.trim()) return

    const userMsg = {
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, userMsg])
    if (!textToSend) setInput('')
    setIsTyping(true)

    try {
      // Log chat to MongoDB & fetch response from backend AI controller
      const res = await sendChatMessage({ message: query, sessionId: 'recruiter_session' })
      const botResponse = res?.botResponse || `I am Hassan's AI assistant! Hassan is a Software Engineer & Data Analyst specializing in MERN Stack and Data Telemetry.`
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: botResponse,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ])
    } catch {
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: `Thanks for reaching out! Hassan is ready to discuss technical opportunities. Email: hasanabdikadir15@gmail.com | Phone: +252 63 6364115`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="ai-chatbot-wrapper">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          className="ai-toggle-btn glass-card glow-border"
          onClick={() => setIsOpen(true)}
          title="Open AI Assistant"
          data-hover
        >
          <div className="ai-btn-pulse" />
          <FiZap className="ai-sparkle-icon" />
          <span className="ai-btn-text">Ask AI</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="ai-chat-window glass-card">
          <div className="ai-chat-header">
            <div className="ai-header-left">
              <div className="ai-avatar">
                <FiCpu />
              </div>
              <div>
                <div className="ai-title">
                  Hassan Portfolio AI <span className="ai-badge">v2.5</span>
                </div>
                <div className="ai-subtitle">Online • Instant Assistant</div>
              </div>
            </div>
            <button className="ai-close-btn" onClick={() => setIsOpen(false)} data-hover>
              <FiX />
            </button>
          </div>

          {/* Messages Area */}
          <div className="ai-chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`ai-msg-group msg-${m.sender}`}>
                <div className="ai-msg-avatar">
                  {m.sender === 'bot' ? <FiCpu /> : <FiUser />}
                </div>
                <div className="ai-msg-content">
                  <div className="ai-msg-text">
                    {m.text.split('\n').map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                  </div>
                  <span className="ai-msg-time">{m.time}</span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="ai-msg-group msg-bot">
                <div className="ai-msg-avatar"><FiCpu /></div>
                <div className="ai-msg-content">
                  <div className="ai-typing-indicator">
                    <span /><span /><span />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Presets */}
          <div className="ai-presets">
            {presetPrompts.map((p, i) => (
              <button key={i} className="ai-preset-chip" onClick={() => handleSend(p)} data-hover>
                {p}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form className="ai-input-bar" onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
            <input
              type="text"
              className="ai-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask anything about Hassan..."
              maxLength={300}
            />
            <button type="submit" className="ai-send-btn" disabled={!input.trim()} data-hover>
              <FiSend />
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
