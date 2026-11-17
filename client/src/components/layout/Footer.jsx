import { useEffect, useRef, useState } from 'react'
import {
  FiGithub, FiLinkedin, FiMail, FiPhone, FiArrowUp, FiArrowRight,
  FiCode, FiTerminal, FiCopy, FiCheck, FiFileText, FiPlay,
  FiClock, FiGlobe, FiSend, FiPlus, FiMinus, FiActivity, FiZap
} from 'react-icons/fi'
import {
  SiKaggle, SiDevdotto, SiLeetcode, SiStackoverflow, SiMedium,
  SiDiscord, SiFacebook, SiWhatsapp, SiInstagram, SiTiktok,
  SiTelegram, SiX, SiYoutube, SiReddit
} from 'react-icons/si'
import './Footer.css'

const CORE_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Flagship Projects' },
  { href: '#skills', label: 'Skills Matrix' },
  { href: '#experience', label: 'Experience' },
  { href: '#certifications', label: 'Credentials' },
  { href: '#contact', label: 'Contact' },
]

const SUITE_LINKS = [
  { href: '#nexus-arcade', label: 'AI Twin & Arcade' },
  { href: '#recruiter-match', label: 'AI Job Matcher' },
  { href: '#benchmark-matrix', label: 'ROI Benchmark Matrix' },
  { href: '#project-estimator', label: 'Project Scope Estimator' },
  { href: '#code-runner', label: 'Live Code Runner' },
  { href: '#api-sandbox', label: 'Interactive API Sandbox' },
  { href: '#blog', label: 'Engineering Insights' },
]

const CORE_STACK = ['React.js', 'Node.js', 'MongoDB', 'Python', 'Docker']

export default function Footer({
  developer,
  onOpenAdmin,
  onOpenResume,
  onOpenTerminal,
  onStartTour,
}) {
  const canvasRef = useRef(null)
  const footerRef = useRef(null)
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [showAllSocials, setShowAllSocials] = useState(false)
  const [localTime, setLocalTime] = useState('')
  const year = new Date().getFullYear()

  const email = developer?.email || 'hasanabdikadir15@gmail.com'

  // Live Hargeisa (GMT+3) Clock
  useEffect(() => {
    const updateClock = () => {
      try {
        const formatted = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Africa/Mogadishu',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }).format(new Date())
        setLocalTime(formatted)
      } catch {
        setLocalTime(new Date().toLocaleTimeString())
      }
    }
    updateClock()
    const timer = setInterval(updateClock, 1000)
    return () => clearInterval(timer)
  }, [])

  // Mouse-Reactive Background Particle Canvas
  useEffect(() => {
    const canvas = canvasRef.current
    const footerEl = footerRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W = (canvas.width = canvas.offsetWidth)
    let H = (canvas.height = canvas.offsetHeight)

    const mouse = { x: null, y: null }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    const handleMouseLeave = () => {
      mouse.x = null
      mouse.y = null
    }

    if (footerEl) {
      footerEl.addEventListener('mousemove', handleMouseMove, { passive: true })
      footerEl.addEventListener('mouseleave', handleMouseLeave)
    }

    const pts = Array.from({ length: 50 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.32,
      vy: (Math.random() - 0.5) * 0.32,
      r: Math.random() * 1.3 + 0.4,
      op: Math.random() * 0.35 + 0.1,
      color: Math.random() > 0.5 ? '#06B6D4' : '#8B5CF6',
    }))

    let id
    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      pts.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = W
        if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H
        if (p.y > H) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.op
        ctx.fill()
      })

      ctx.globalAlpha = 1
      pts.forEach((p, i) => {
        if (mouse.x !== null && mouse.y !== null) {
          const md = Math.hypot(p.x - mouse.x, p.y - mouse.y)
          if (md < 120) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.22 * (1 - md / 120)})`
            ctx.lineWidth = 0.75
            ctx.stroke()
          }
        }

        pts.slice(i + 1).forEach(q => {
          const d = Math.hypot(p.x - q.x, p.y - q.y)
          if (d < 85) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.06 * (1 - d / 85)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })
      id = requestAnimationFrame(draw)
    }
    draw()

    const resize = () => {
      W = canvas.width = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(id)
      window.removeEventListener('resize', resize)
      if (footerEl) {
        footerEl.removeEventListener('mousemove', handleMouseMove)
        footerEl.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(email).catch(() => {})
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2400)
  }

  const primarySocials = [
    { href: developer?.github || 'https://github.com/HassanAbdikadir', icon: <FiGithub />, title: 'GitHub' },
    { href: developer?.linkedin || 'https://linkedin.com/in/hassanabdikadir', icon: <FiLinkedin />, title: 'LinkedIn' },
    { href: developer?.kaggle || 'https://www.kaggle.com/hassanabdikadir', icon: <SiKaggle />, title: 'Kaggle' },
    { href: developer?.leetcode || 'https://leetcode.com/u/hassan_abdikadir/', icon: <SiLeetcode />, title: 'LeetCode' },
    { href: developer?.whatsapp || 'https://wa.me/252636364115', icon: <SiWhatsapp />, title: 'WhatsApp' },
    { href: `mailto:${email}`, icon: <FiMail />, title: 'Email', sameTab: true },
  ]

  const extraSocials = [
    { href: developer?.devto || 'https://dev.to/hassan-abdikadir', icon: <SiDevdotto />, title: 'Dev.to' },
    { href: developer?.stackoverflow || 'https://stackoverflow.com/users/33181258/hassan-abdikadir', icon: <SiStackoverflow />, title: 'Stack Overflow' },
    { href: developer?.medium || 'https://medium.com/@hassan_abdikadir', icon: <SiMedium />, title: 'Medium' },
    { href: developer?.discord || 'https://discord.com/users/1362003780568354957', icon: <SiDiscord />, title: 'Discord' },
    { href: developer?.telegram || 'https://t.me/HassanAbdikadir', icon: <SiTelegram />, title: 'Telegram' },
    { href: developer?.telegramChannel || 'https://t.me/PostFiles', icon: <SiTelegram />, title: 'Telegram Channel (PostFiles)' },
    { href: developer?.twitter || 'https://x.com/HasanAbdikadir8', icon: <SiX />, title: 'Twitter / X' },
    { href: developer?.youtube || 'https://www.youtube.com/@Hassan-AlBakri', icon: <SiYoutube />, title: 'YouTube' },
    { href: developer?.instagram || 'https://www.instagram.com/the_albakri/', icon: <SiInstagram />, title: 'Instagram' },
    { href: developer?.facebook || 'https://www.facebook.com/hassan.abdikadir.adam', icon: <SiFacebook />, title: 'Facebook' },
    { href: developer?.tiktok || 'https://www.tiktok.com/@hasan_abdikadir', icon: <SiTiktok />, title: 'TikTok' },
    { href: developer?.reddit || 'https://www.reddit.com/user/This_Package5648/', icon: <SiReddit />, title: 'Reddit' },
    { href: `tel:${developer?.phone || '+252636364115'}`, icon: <FiPhone />, title: 'Call Phone', sameTab: true },
  ]

  return (
    <footer className="footer" ref={footerRef}>
      <canvas ref={canvasRef} className="footer-canvas" />
      <div className="footer-grid-bg" />
      <div className="footer-top-glow" />

      <div className="container footer-inner">

        {/* Section 1: Clean Top CTA Row */}
        <div className="footer-cta-row">
          <div className="footer-cta-left">
            <span className="footer-status-badge font-code">
              <span className="status-beacon" />
              <span>Available for Full-Time &amp; High-Impact Contracts</span>
            </span>
            <h2 className="footer-cta-heading">
              Ready to architect your next{' '}
              <span className="gradient-text">flagship system?</span>
            </h2>
          </div>

          <div className="footer-cta-actions">
            <button
              type="button"
              className={`footer-email-btn ${copiedEmail ? 'copied' : ''}`}
              onClick={handleCopyEmail}
              data-hover
              title="Click to copy email address"
            >
              <FiMail className="feb-icon" />
              <span className="feb-address font-code">{email}</span>
              <span className="feb-copy-badge font-code">
                {copiedEmail ? <><FiCheck /> Copied ✓</> : <><FiCopy /> Copy</>}
              </span>
            </button>

            <button
              type="button"
              className="btn-primary footer-hire-btn"
              onClick={() => scrollTo('#contact')}
              data-hover
            >
              <FiSend />
              <span>Start a Conversation</span>
              <FiArrowRight />
            </button>
          </div>
        </div>

        {/* Section 2: Open 4-Column Architectural Directory */}
        <div className="footer-main-grid">

          {/* Col 1: Brand & Bio */}
          <div className="footer-col-brand">
            <div className="footer-brand-head" onClick={scrollTop} data-hover>
              <div className="footer-logo-wrap">
                <img src="/LOGO.png" alt="Hassan Abdikadir" className="footer-logo-img" />
              </div>
              <div className="footer-brand-title">
                <span className="footer-brand-name ocean-gradient-text">Hassan Abdikadir</span>
                <span className="footer-brand-dot font-code">.dev</span>
              </div>
            </div>

            <p className="footer-bio">
              Software Engineer, FullStack MERN Architect &amp; Data Analyst based in Hargeisa, Somaliland (GMT+3). B.Sc. in Software Engineering — Admas University (3.96 GPA • Very Great Distinction).
            </p>

            <div className="footer-socials">
              {primarySocials.map((s, idx) => (
                <a
                  key={idx}
                  href={s.href}
                  target={s.sameTab ? undefined : '_blank'}
                  rel={s.sameTab ? undefined : 'noreferrer'}
                  className="footer-social-btn"
                  data-hover
                  title={s.title}
                >
                  {s.icon}
                </a>
              ))}

              {showAllSocials && extraSocials.map((s, idx) => (
                <a
                  key={`extra-${idx}`}
                  href={s.href}
                  target={s.sameTab ? undefined : '_blank'}
                  rel={s.sameTab ? undefined : 'noreferrer'}
                  className="footer-social-btn footer-social-extra"
                  data-hover
                  title={s.title}
                >
                  {s.icon}
                </a>
              ))}

              <button
                type="button"
                className="footer-social-expand font-code"
                onClick={() => setShowAllSocials(prev => !prev)}
                data-hover
                title={showAllSocials ? 'Collapse extra profiles' : 'Show all 19 profiles'}
              >
                {showAllSocials ? <><FiMinus /> Less</> : <><FiPlus /> {extraSocials.length} More</>}
              </button>
            </div>
          </div>

          {/* Col 2: Core Navigation */}
          <div className="footer-col-links">
            <div className="footer-col-heading font-code">NAVIGATION</div>
            <ul className="footer-link-list">
              {CORE_LINKS.map(link => (
                <li key={link.href}>
                  <button
                    type="button"
                    className="footer-nav-link"
                    onClick={() => scrollTo(link.href)}
                    data-hover
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Interactive Engineering Suite */}
          <div className="footer-col-links">
            <div className="footer-col-heading font-code">INTERACTIVE SUITE</div>
            <ul className="footer-link-list">
              {SUITE_LINKS.map(link => (
                <li key={link.href}>
                  <button
                    type="button"
                    className="footer-nav-link"
                    onClick={() => scrollTo(link.href)}
                    data-hover
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Live Telemetry & Shortcuts */}
          <div className="footer-col-status">
            <div className="footer-col-heading font-code">TELEMETRY &amp; SHORTCUTS</div>

            <div className="footer-telemetry-box">
              <div className="ftb-row">
                <span className="ftb-label font-code">
                  <FiGlobe className="ftb-ico" /> Hargeisa (GMT+3)
                </span>
                <span className="ftb-clock font-code">
                  <FiClock className="ftb-clock-ico" />
                  {localTime || '12:00:00 PM'}
                </span>
              </div>
              <div className="ftb-divider" />
              <div className="ftb-metrics font-code">
                <span className="ftb-metric"><FiActivity className="text-emerald" /> 99.98% Uptime</span>
                <span className="ftb-sep">·</span>
                <span className="ftb-metric"><FiZap className="text-cyan" /> ~18ms API Ping</span>
              </div>
            </div>

            <div className="footer-shortcuts">
              <button
                type="button"
                className="footer-shortcut-btn"
                onClick={() => onOpenResume?.()}
                data-hover
              >
                <FiFileText className="fsb-ico" />
                <span>Interactive CV &amp; Resume</span>
              </button>
              <button
                type="button"
                className="footer-shortcut-btn"
                onClick={() => onOpenTerminal?.()}
                data-hover
              >
                <FiTerminal className="fsb-ico" />
                <span>Command Palette (⌘K)</span>
              </button>
              <button
                type="button"
                className="footer-shortcut-btn"
                onClick={() => onStartTour?.()}
                data-hover
              >
                <FiPlay className="fsb-ico" />
                <span>Launch 1-Min Auto Tour</span>
              </button>
            </div>
          </div>

        </div>

        {/* Section 3: Clean Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-copy">
            © {year} <span className="footer-copy-author">Hassan Abdikadir</span>. Engineered with React, Node.js &amp; MongoDB.
          </div>

          <div className="footer-stack-row font-code">
            {CORE_STACK.map(tech => (
              <span key={tech} className="footer-stack-chip">
                {tech}
              </span>
            ))}
          </div>

          <div className="footer-bottom-right">
            <button
              type="button"
              className="footer-admin-btn"
              onClick={onOpenAdmin}
              data-hover
              title="Admin CMS"
            >
              <FiCode />
            </button>
            <button
              type="button"
              className="scroll-top-btn font-code"
              onClick={scrollTop}
              data-hover
              title="Back to top"
            >
              <span>Back to Top</span>
              <FiArrowUp />
            </button>
          </div>
        </div>

      </div>
    </footer>
  )
}
