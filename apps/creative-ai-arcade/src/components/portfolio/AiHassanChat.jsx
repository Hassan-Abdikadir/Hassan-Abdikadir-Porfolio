import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Sparkles, RefreshCw, MessageSquare, Terminal } from 'lucide-react';
import { soundEngine } from '../AudioSynthesizer';

export default function AiHassanChat() {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "👋 Salaam! I am Hassan's AI Digital Twin. Ask me anything about Hassan Abdikadir's skills, experience in Hargeisa, Somaliland, tech stack, or project availability!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const quickPrompts = [
    "What is Hassan's core tech stack?",
    "Tell me about his experience in Hargeisa",
    "Is Hassan available for hire?",
    "What projects has Hassan built?"
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    soundEngine.playClick();
    const newMessages = [...messages, { sender: 'user', text: query }];
    setMessages(newMessages);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // AI Knowledge Base Engine Response Simulation
    setTimeout(() => {
      soundEngine.playSuccess();
      let reply = "";
      const qLower = query.toLowerCase();

      if (qLower.includes('stack') || qLower.includes('skill') || qLower.includes('tech')) {
        reply = "⚡ Hassan specializes in Full-Stack MERN development (React 19, Node.js, Express, MongoDB), Vanilla CSS design systems, Web Audio API synthesizers, HTML5 Canvas generative graphics, and REST/GraphQL APIs.";
      } else if (qLower.includes('hargeisa') || qLower.includes('location') || qLower.includes('somali')) {
        reply = "🌍 Hassan is based in Hargeisa, Somaliland (GMT+3). He works with international client teams globally via remote collaboration tools, high-speed fiber connectivity, and flexible shift schedules.";
      } else if (qLower.includes('hire') || qLower.includes('available') || qLower.includes('work') || qLower.includes('contact')) {
        reply = "🚀 Yes! Hassan is actively open for Full-Time, Senior Full-Stack, and High-Impact Remote roles. You can contact him via his terminal or email him directly!";
      } else if (qLower.includes('project')) {
        reply = "📂 Hassan has engineered several production web applications including: 1) Nexus AI Creative Studio & Data Lab, 2) Digital Education Management LMS, 3) Cyber Security & Auth Suite, and 4) Interactive Algorithmic Code Arcade.";
      } else {
        reply = `💡 Hassan Abdikadir is a passionate Full-Stack Engineer dedicated to crafting world-class, cyber-premium user experiences with high performance and scalable backend logic. Feel free to explore his RPG Skill Tree or test his Cyber CLI Terminal!`;
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', height: '100%', minHeight: '480px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'var(--grad-cyan-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bot size={22} color="#fff" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800' }}>HASSAN_AI // DIGITAL TWIN</h3>
            <span className="mono-tag" style={{ fontSize: '0.65rem' }}>AUTONOMOUS RECRUITER ASSISTANT</span>
          </div>
        </div>
        <span className="cyber-badge cyber-badge-green">
          <span className="live-indicator"></span> ACTIVE
        </span>
      </div>

      {/* Quick Questions Pills */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {quickPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(p)}
            style={{
              background: 'rgba(0, 240, 255, 0.08)',
              border: '1px solid rgba(0, 240, 255, 0.25)',
              color: 'var(--neon-cyan)',
              padding: '0.35rem 0.65rem',
              borderRadius: '20px',
              fontSize: '0.75rem',
              cursor: 'pointer',
              fontWeight: '500',
              transition: 'all 0.2s ease'
            }}
          >
            💬 {p}
          </button>
        ))}
      </div>

      {/* Message Chat Window */}
      <div style={{
        flex: 1,
        background: 'rgba(5, 10, 20, 0.6)',
        borderRadius: '12px',
        padding: '1rem',
        overflowY: 'auto',
        maxHeight: '280px',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.85rem',
        border: '1px solid var(--border-glass)'
      }}>
        {messages.map((m, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              gap: '0.6rem',
              alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '85%'
            }}
          >
            {m.sender === 'ai' && (
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--neon-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Bot size={16} color="#000" />
              </div>
            )}
            <div style={{
              background: m.sender === 'user' ? 'rgba(157, 78, 221, 0.25)' : 'rgba(255, 255, 255, 0.05)',
              border: `1px solid ${m.sender === 'user' ? 'var(--neon-purple)' : 'var(--border-glass)'}`,
              padding: '0.75rem 1rem',
              borderRadius: '12px',
              fontSize: '0.88rem',
              color: 'var(--text-main)',
              lineHeight: '1.5'
            }}>
              {m.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neon-cyan)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
            <Sparkles size={14} className="animate-spin" /> Hassan AI is typing response...
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Box */}
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          className="cyber-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask Hassan AI anything..."
        />
        <button onClick={() => handleSend()} className="btn-cyber">
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
