import { useEffect, useRef, useState } from 'react'
import { FiGithub, FiLinkedin, FiMail, FiPhone, FiArrowUp, FiCode, FiTerminal, FiCpu } from 'react-icons/fi'
import { SiMongodb, SiReact, SiNodedotjs, SiPython, SiExpress, SiKaggle, SiDevdotto, SiLeetcode, SiStackoverflow, SiMedium, SiDiscord, SiFacebook, SiWhatsapp, SiInstagram, SiTiktok, SiTelegram, SiX, SiYoutube, SiReddit } from 'react-icons/si'
import './Footer.css'

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]

const techStack = [
  { icon: <SiReact />, label: 'React', color: '#61DAFB' },
  { icon: <SiNodedotjs />, label: 'Node.js', color: '#339933' },
  { icon: <SiMongodb />, label: 'MongoDB', color: '#47A248' },
  { icon: <SiExpress />, label: 'Express', color: '#ffffff' },
  { icon: <SiPython />, label: 'Python', color: '#3776AB' },
]

const terminalLines = [
  { prefix: '$', cmd: 'git clone hassan-abdikadir/portfolio', color: '#06B6D4' },
  { prefix: '>', cmd: 'npm install && npm run dev', color: '#10B981' },
  { prefix: '✓', cmd: 'Server running on port 5173', color: '#8B5CF6' },
  { prefix: '~', cmd: 'All systems operational', color: '#F59E0B' },
]

export default function Footer({ developer, onOpenAdmin }) {
  const canvasRef = useRef(null)
  const [currentLine, setCurrentLine] = useState(0)
  const [typed, setTyped] = useState('')
  const [charIdx, setCharIdx] = useState(0)
  const year = new Date().getFullYear()

  // Terminal typing animation
  useEffect(() => {
    const line = terminalLines[currentLine]
    const fullText = `${line.prefix} ${line.cmd}`
    if (charIdx < fullText.length) {
      const t = setTimeout(() => {
        setTyped(prev => prev + fullText[charIdx])
        setCharIdx(c => c + 1)
      }, 38)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => {
        setTyped('')
        setCharIdx(0)
        setCurrentLine(l => (l + 1) % terminalLines.length)
      }, 1800)
      return () => clearTimeout(t)
    }
  }, [charIdx, currentLine])

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W = canvas.width = canvas.offsetWidth
    let H = canvas.height = canvas.offsetHeight

    const pts = Array.from({ length: 60 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.2 + 0.3,
      op: Math.random() * 0.4 + 0.1,
      color: Math.random() > 0.5 ? '#3B82F6' : '#8B5CF6'
    }))

    let id
    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color; ctx.globalAlpha = p.op; ctx.fill()
      })
      ctx.globalAlpha = 1
      pts.forEach((p, i) => pts.slice(i + 1).forEach(q => {
        const d = Math.hypot(p.x - q.x, p.y - q.y)
        if (d < 90) {
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y)
          ctx.strokeStyle = `rgba(59,130,246,${0.06 * (1 - d / 90)})`
          ctx.lineWidth = 0.5; ctx.stroke()
        }
      }))
      id = requestAnimationFrame(draw)
    }
    draw()
    const resize = () => { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight }
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize) }
  }, [])

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <canvas ref={canvasRef} className="footer-canvas" />
      <div className="footer-grid-bg" />

      {/* Top glow line */}
      <div className="footer-top-glow" />

      <div className="container footer-inner">

        {/* ── ROW 1: Brand + Terminal + Stats ── */}
        <div className="footer-row-top">

          {/* Brand Block */}
          <div className="footer-brand">
            <div className="footer-logo-wrap">
              <img src="/LOGO.png" alt="Hassan" className="footer-logo-img" />
              <div className="footer-logo-glow" />
            </div>
            <div className="footer-brand-text">
              <div className="footer-name ocean-gradient-text">Hassan-Abdikadir</div>
              <div className="footer-role">
                <FiCpu className="footer-role-icon" />
                FullStack Engineer · Data Analyst · System Architect
              </div>
            </div>
            <p className="footer-bio">
              Building production-grade systems that <span className="footer-highlight">scale</span>,
              <span className="footer-highlight"> perform</span>, and
              <span className="footer-highlight"> deliver impact</span>. From MERN Stack to Data Intelligence.
            </p>
            <div className="footer-socials">
              <a href={developer?.github || 'https://github.com/HassanAbdikadir'} target="_blank" rel="noreferrer" className="footer-social-btn" data-hover title="GitHub">
                <FiGithub />
              </a>
              <a href={developer?.linkedin || 'https://linkedin.com/in/hassanabdikadir'} target="_blank" rel="noreferrer" className="footer-social-btn" data-hover title="LinkedIn">
                <FiLinkedin />
              </a>
              <a href={developer?.kaggle || 'https://www.kaggle.com/hassanabdikadir'} target="_blank" rel="noreferrer" className="footer-social-btn" data-hover title="Kaggle">
                <SiKaggle />
              </a>
              <a href={developer?.devto || 'https://dev.to/hassan-abdikadir'} target="_blank" rel="noreferrer" className="footer-social-btn" data-hover title="Dev.to">
                <SiDevdotto />
              </a>
              <a href={developer?.leetcode || 'https://leetcode.com/u/hassan_abdikadir/'} target="_blank" rel="noreferrer" className="footer-social-btn" data-hover title="LeetCode">
                <SiLeetcode />
              </a>
              <a href={developer?.stackoverflow || 'https://stackoverflow.com/users/33181258/hassan-abdikadir'} target="_blank" rel="noreferrer" className="footer-social-btn" data-hover title="Stack Overflow">
                <SiStackoverflow />
              </a>
              <a href={developer?.medium || 'https://medium.com/@hassan_abdikadir'} target="_blank" rel="noreferrer" className="footer-social-btn" data-hover title="Medium">
                <SiMedium />
              </a>
              <a href={developer?.discord || 'https://discord.com/users/1362003780568354957'} target="_blank" rel="noreferrer" className="footer-social-btn" data-hover title="Discord">
                <SiDiscord />
              </a>
              <a href={developer?.telegram || 'https://t.me/HassanAbdikadir'} target="_blank" rel="noreferrer" className="footer-social-btn" data-hover title="Telegram">
                <SiTelegram />
              </a>
              <a href={developer?.telegramChannel || 'https://t.me/PostFiles'} target="_blank" rel="noreferrer" className="footer-social-btn" data-hover title="Telegram Channel (PostFiles)">
                <SiTelegram />
              </a>
              <a href={developer?.whatsapp || 'https://wa.me/252636364115'} target="_blank" rel="noreferrer" className="footer-social-btn" data-hover title="WhatsApp">
                <SiWhatsapp />
              </a>
              <a href={developer?.twitter || 'https://x.com/HasanAbdikadir8'} target="_blank" rel="noreferrer" className="footer-social-btn" data-hover title="Twitter / X">
                <SiX />
              </a>
              <a href={developer?.youtube || 'https://www.youtube.com/@Hassan-AlBakri'} target="_blank" rel="noreferrer" className="footer-social-btn" data-hover title="YouTube">
                <SiYoutube />
              </a>
              <a href={developer?.instagram || 'https://www.instagram.com/the_albakri/'} target="_blank" rel="noreferrer" className="footer-social-btn" data-hover title="Instagram">
                <SiInstagram />
              </a>
              <a href={developer?.facebook || 'https://www.facebook.com/hassan.abdikadir.adam'} target="_blank" rel="noreferrer" className="footer-social-btn" data-hover title="Facebook">
                <SiFacebook />
              </a>
              <a href={developer?.tiktok || 'https://www.tiktok.com/@hasan_abdikadir'} target="_blank" rel="noreferrer" className="footer-social-btn" data-hover title="TikTok">
                <SiTiktok />
              </a>
              <a href={developer?.reddit || 'https://www.reddit.com/user/This_Package5648/'} target="_blank" rel="noreferrer" className="footer-social-btn" data-hover title="Reddit">
                <SiReddit />
              </a>
              <a href={`mailto:${developer?.email || 'hasanabdikadir15@gmail.com'}`} className="footer-social-btn" data-hover title="Email">
                <FiMail />
              </a>
              <a href={`tel:${developer?.phone || '+252636364115'}`} className="footer-social-btn" data-hover title="Call Phone">
                <FiPhone />
              </a>
            </div>
          </div>

          {/* Live Terminal Block */}
          <div className="footer-terminal glass-card">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="t-dot red" /><span className="t-dot yellow" /><span className="t-dot green" />
              </div>
              <span className="terminal-title"><FiTerminal /> hassan@portfolio:~</span>
            </div>
            <div className="terminal-body">
              {terminalLines.slice(0, currentLine).map((l, i) => (
                <div key={i} className="terminal-line done">
                  <span style={{ color: l.color }}>{l.prefix}</span>
                  <span className="terminal-cmd">{l.cmd}</span>
                </div>
              ))}
              <div className="terminal-line active">
                <span style={{ color: terminalLines[currentLine].color }}>
                  {typed}
                </span>
                <span className="terminal-cursor">▋</span>
              </div>
            </div>
            <div className="terminal-status-bar">
              <span className="ts-dot" />
              <span>System Online · Port 5173</span>
              <span className="ts-version">v2.0.4</span>
            </div>
          </div>

          {/* Stats Block */}
          <div className="footer-stats">
            {[
              { val: '20+', label: 'Projects Shipped', color: '#3B82F6' },
              { val: '3+', label: 'Years in Tech', color: '#8B5CF6' },
              { val: '99.9%', label: 'Uptime SLA', color: '#10B981' },
              { val: '5', label: 'Core Tech Stack', color: '#F59E0B' },
            ].map((s, i) => (
              <div key={i} className="footer-stat-card glass-card">
                <div className="fsc-val" style={{ color: s.color }}>{s.val}</div>
                <div className="fsc-label">{s.label}</div>
                <div className="fsc-bar">
                  <div className="fsc-fill" style={{ background: s.color, width: '100%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="footer-divider">
          <div className="divider-line" />
          <div className="divider-badge">
            <FiCode />
            <span>HASSAN·DEV·PORTFOLIO</span>
            <FiCode />
          </div>
          <div className="divider-line" />
        </div>

        {/* ── ROW 2: Nav + Tech Stack ── */}
        <div className="footer-row-mid">

          {/* Navigation */}
          <div className="footer-nav-block">
            <div className="footer-block-label">// navigation</div>
            <div className="footer-nav-grid">
              {navLinks.map(link => (
                <button key={link.href} className="footer-nav-link" onClick={() => scrollTo(link.href)} data-hover>
                  <span className="fnl-arrow">›</span>
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tech Stack pills */}
          <div className="footer-tech-block">
            <div className="footer-block-label">// tech.stack</div>
            <div className="footer-tech-list">
              {techStack.map((t, i) => (
                <div key={i} className="footer-tech-pill glass-card" style={{ '--tc': t.color }}>
                  <span className="ftp-icon" style={{ color: t.color }}>{t.icon}</span>
                  <span className="ftp-label">{t.label}</span>
                  <span className="ftp-glow" />
                </div>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="footer-cta-block">
            <div className="footer-block-label">// let's.connect</div>
            <div className="footer-cta-card glass-card">
              <div className="cta-pulse-ring" />
              <div className="cta-avatar">
                <img src="/LOGO.png" alt="HA" />
              </div>
              <p className="cta-text">Open to freelance, full-time & collaboration opportunities.</p>
              <a href={`mailto:${developer?.email || 'hasanabdikadir15@gmail.com'}`} className="btn-primary cta-btn" data-hover>
                <FiMail /> Send Message
              </a>
              <div className="cta-status">
                <span className="status-dot">Available for Work</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="footer-bottom-bar">
          <div className="footer-copy">
            <span className="copy-prefix">&lt;</span>
            <span>Built & Designed by </span>
            <span className="footer-author ocean-gradient-text">Hassan Abdikadir</span>
            <span className="copy-prefix">/&gt;</span>
            <span className="copy-year"> · © {year}</span>
          </div>

          <div className="footer-bottom-right">
            <button className="footer-admin-btn" onClick={onOpenAdmin} data-hover title="Admin CMS">
              <FiCode />
            </button>
            <button className="scroll-top-btn" onClick={scrollTop} data-hover title="Back to top">
              <FiArrowUp />
            </button>
          </div>
        </div>

      </div>
    </footer>
  )
}
