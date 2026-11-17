import { useState, useEffect, useRef } from 'react'
import { TypeAnimation } from 'react-type-animation'
import { FiGithub, FiLinkedin, FiMail, FiArrowDown, FiExternalLink, FiFileText, FiPlay, FiAward, FiPlus, FiMinus, FiClock, FiLayers, FiZap } from 'react-icons/fi'
import { SiMongodb, SiReact, SiNodedotjs, SiPython, SiJavascript, SiDocker, SiPostgresql, SiSocketdotio, SiKaggle, SiDevdotto, SiLeetcode, SiStackoverflow, SiMedium, SiDiscord, SiFacebook, SiWhatsapp, SiInstagram, SiTiktok, SiTelegram, SiX, SiYoutube, SiReddit } from 'react-icons/si'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import VoicePitchWidget from '../../components/ui/VoicePitchWidget'
import './Hero.css'

const techOrbitInner = [
  { icon: <SiReact />, color: '#61DAFB', label: 'React.js' },
  { icon: <SiNodedotjs />, color: '#339933', label: 'Node.js' },
  { icon: <SiMongodb />, color: '#47A248', label: 'MongoDB' },
  { icon: <SiPython />, color: '#3776AB', label: 'Python' },
]

const techOrbitOuter = [
  { icon: <SiJavascript />, color: '#F7DF1E', label: 'JavaScript ES6+' },
  { icon: <SiDocker />, color: '#2496ED', label: 'Docker' },
  { icon: <SiPostgresql />, color: '#38BDF8', label: 'PostgreSQL' },
  { icon: <SiSocketdotio />, color: '#FFFFFF', label: 'Socket.io' },
]

export default function Hero({ developer, metrics = [], onOpenResume, onStartTour, t, lang }) {
  const { ref, inView } = useInView({ threshold: 0.01, triggerOnce: true })
  const canvasRef = useRef(null)
  const heroSectionRef = useRef(null)
  const [showAllSocials, setShowAllSocials] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    const section = heroSectionRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

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

    if (section) {
      section.addEventListener('mousemove', handleMouseMove, { passive: true })
      section.addEventListener('mouseleave', handleMouseLeave)
    }

    const particles = []
    for (let i = 0; i < 85; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.6,
        opacity: Math.random() * 0.5 + 0.15,
        color: Math.random() > 0.5 ? '#06B6D4' : '#8B5CF6'
      })
    }

    let animId
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        // Subtle cursor attraction / repulsion physics
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const mDist = Math.hypot(dx, dy)
          if (mDist < 140 && mDist > 1) {
            const force = (140 - mDist) / 140
            if (mDist < 45) {
              // Gentle repulsion right at cursor core
              p.x -= (dx / mDist) * force * 0.8
              p.y -= (dy / mDist) * force * 0.8
            } else {
              // Gentle attraction inside outer magnetic radius
              p.x += (dx / mDist) * force * 0.35
              p.y += (dy / mDist) * force * 0.35
            }
          }
        }

        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.opacity
        ctx.fill()
      })

      ctx.globalAlpha = 1
      particles.forEach((p, i) => {
        // Connect particle to cursor when within 140px
        if (mouse.x !== null && mouse.y !== null) {
          const mDist = Math.hypot(p.x - mouse.x, p.y - mouse.y)
          if (mDist < 140) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.32 * (1 - mDist / 140)})`
            ctx.lineWidth = 0.85
            ctx.stroke()
          }
        }

        // Connect neighboring particles
        particles.slice(i + 1).forEach(p2 => {
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y)
          if (dist < 105) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.09 * (1 - dist / 105)})`
            ctx.lineWidth = 0.55
            ctx.stroke()
          }
        })
      })
      animId = requestAnimationFrame(animate)
    }
    animate()

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      if (section) {
        section.removeEventListener('mousemove', handleMouseMove)
        section.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  const handleVisualMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width - 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: +(ny * -14).toFixed(2), y: +(nx * 14).toFixed(2) })
  }

  const handleVisualMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  const primarySocials = [
    { href: developer.github || 'https://github.com/HassanAbdikadir', icon: <FiGithub />, title: 'GitHub' },
    { href: developer.linkedin || 'https://linkedin.com/in/hassanabdikadir', icon: <FiLinkedin />, title: 'LinkedIn' },
    { href: developer.kaggle || 'https://www.kaggle.com/hassanabdikadir', icon: <SiKaggle />, title: 'Kaggle' },
    { href: developer.leetcode || 'https://leetcode.com/u/hassan_abdikadir/', icon: <SiLeetcode />, title: 'LeetCode' },
    { href: developer.whatsapp || 'https://wa.me/252636364115', icon: <SiWhatsapp />, title: 'WhatsApp' },
    { href: `mailto:${developer.email || 'hasanabdikadir15@gmail.com'}`, icon: <FiMail />, title: 'Email', sameTab: true },
  ]

  const extraSocials = [
    { href: developer.devto || 'https://dev.to/hassan-abdikadir', icon: <SiDevdotto />, title: 'Dev.to' },
    { href: developer.stackoverflow || 'https://stackoverflow.com/users/33181258/hassan-abdikadir', icon: <SiStackoverflow />, title: 'Stack Overflow' },
    { href: developer.medium || 'https://medium.com/@hassan_abdikadir', icon: <SiMedium />, title: 'Medium' },
    { href: developer.discord || 'https://discord.com/users/1362003780568354957', icon: <SiDiscord />, title: 'Discord' },
    { href: developer.telegram || 'https://t.me/HassanAbdikadir', icon: <SiTelegram />, title: 'Telegram' },
    { href: developer.telegramChannel || 'https://t.me/PostFiles', icon: <SiTelegram />, title: 'Telegram Channel (PostFiles)' },
    { href: developer.twitter || 'https://x.com/HasanAbdikadir8', icon: <SiX />, title: 'Twitter / X' },
    { href: developer.youtube || 'https://www.youtube.com/@Hassan-AlBakri', icon: <SiYoutube />, title: 'YouTube' },
    { href: developer.instagram || 'https://www.instagram.com/the_albakri/', icon: <SiInstagram />, title: 'Instagram' },
    { href: developer.facebook || 'https://www.facebook.com/hassan.abdikadir.adam', icon: <SiFacebook />, title: 'Facebook' },
    { href: developer.tiktok || 'https://www.tiktok.com/@hasan_abdikadir', icon: <SiTiktok />, title: 'TikTok' },
    { href: developer.reddit || 'https://www.reddit.com/user/This_Package5648/', icon: <SiReddit />, title: 'Reddit' },
  ]

  return (
    <section id="home" className="hero" ref={heroSectionRef}>
      <canvas ref={canvasRef} className="hero-canvas" />
      <div className="grid-bg" />

      <div className="hero-orb orb-blue" />
      <div className="hero-orb orb-violet" />
      <div className="hero-orb orb-cyan" />

      <div className="container hero-container" ref={ref}>
        {/* Left Content */}
        <div className={`hero-content ${inView ? 'visible' : ''}`}>

          {/* Live Cyber Radar Status Badge */}
          <div className="hero-status-pill glass-card">
            <span className="pulse-dot hero-pulse-dot" />
            <span className="hero-status-text">
              AVAILABLE FOR HIRE • HARGEISA (GMT+3)
            </span>
          </div>

          <h1 className="hero-title">
            <span className="hero-greeting">{lang === 'so' ? 'Kushoodhaw, Waxaan Ahay' : "Hi, I'm"}</span>
            <span className="hero-name ocean-gradient-text">Hassan Abdikadir</span>
          </h1>

          <div className="hero-typing">
            <span className="typing-prefix">❯ </span>
            <TypeAnimation
              sequence={
                lang === 'so'
                  ? [
                      'Software Engineer', 2000,
                      'FullStack MERN Architect', 2000,
                      'Data Analyst & Intelligence', 2000,
                      'Engineer Dhisaha Nidaamyo', 2000,
                    ]
                  : [
                      'Software Engineer', 2000,
                      'FullStack MERN Architect', 2000,
                      'Data Analyst & Intelligence', 2000,
                      'System Innovator', 2000,
                    ]
              }
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="typing-text gradient-text"
            />
            <span className="typing-cursor">_</span>
          </div>

          <p className="hero-desc">
            {t?.hero?.subtitle || `Bridging the gap between scalable Software Architecture and Data-Driven Insights. I build production-grade full-stack platforms that perform, scale, and deliver impact.`}
          </p>

          <div className="hero-badges">
            <span className="tech-badge">React.js</span>
            <span className="tech-badge">Node.js</span>
            <span className="tech-badge violet">Express.js</span>
            <span className="tech-badge violet">MongoDB</span>
            <span className="tech-badge emerald">Python</span>
            <span className="tech-badge emerald">Data Analytics</span>
          </div>

          <div className="hero-actions">
            <button
              className="btn-primary"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              data-hover
            >
              <FiExternalLink /> {t?.hero?.exploreProjects || 'Explore Flagships'}
            </button>
            <button
              className="btn-outline"
              onClick={onOpenResume}
              data-hover
            >
              <FiFileText /> {lang === 'so' ? 'CV & Resume-ka' : 'Interactive CV & Resume'}
            </button>
            <button
              className="btn-auto-tour"
              onClick={onStartTour}
              data-hover
              title="Take an automated 1-minute guided interactive showcase tour of Hassan's portfolio"
            >
              <span className="bat-dot" />
              <FiPlay className="bat-icon" />
              <span>{lang === 'so' ? '1-Min Auto Demo' : '1-Min Auto Demo Tour'}</span>
            </button>
          </div>

          {/* FEATURE 2: AI Voice Twin Executive Pitch */}
          <VoicePitchWidget />

          <div className="hero-socials">
            {primarySocials.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                target={item.sameTab ? undefined : '_blank'}
                rel={item.sameTab ? undefined : 'noreferrer'}
                className="social-link"
                data-hover
                title={item.title}
              >
                {item.icon}
              </a>
            ))}

            {showAllSocials && extraSocials.map((item, idx) => (
              <a
                key={`extra-${idx}`}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="social-link social-link-extra"
                data-hover
                title={item.title}
              >
                {item.icon}
              </a>
            ))}

            <button
              type="button"
              className="social-expand-pill"
              onClick={() => setShowAllSocials(prev => !prev)}
              data-hover
              title={showAllSocials ? 'Collapse extra profiles' : 'Show all 18+ developer & social profiles'}
            >
              {showAllSocials ? <><FiMinus /> Show Less</> : <><FiPlus /> 12 More</>}
            </button>

            <div className="social-divider" />
            <span className="social-label">hassanabdikadir.dev</span>
          </div>
        </div>

        {/* Right Content Visual — 3D Tilt Holographic Core */}
        <div
          className={`hero-visual ${inView ? 'visible' : ''}`}
          onMouseMove={handleVisualMouseMove}
          onMouseLeave={handleVisualMouseLeave}
        >
          <div
            className="hero-tilt-stage"
            style={{
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
            }}
          >
            <div className="orbit-container">
              {/* Outer Counter-Rotating Ring */}
              <div className="orbit-ring ring-2">
                {techOrbitOuter.map((item, i) => (
                  <div
                    key={i}
                    className="orbit-item orbit-item-outer"
                    style={{ color: item.color }}
                    title={item.label}
                  >
                    {item.icon}
                  </div>
                ))}
              </div>

              {/* Inner Rotating Ring */}
              <div className="orbit-ring ring-1">
                {techOrbitInner.map((item, i) => (
                  <div
                    key={i}
                    className="orbit-item"
                    style={{ color: item.color }}
                    title={item.label}
                  >
                    {item.icon}
                  </div>
                ))}
              </div>

              <div className="orbit-center glass-card">
                <div className="center-logo">
                  <img src="/LOGO.png" alt="HA Logo" className="hero-center-logo-img" />
                </div>
                <div className="center-info">
                  <div className="center-name">Hassan Abdikadir</div>
                  <div className="center-role gradient-text-data" style={{ fontSize: '0.7rem', fontFamily: 'var(--font-code)' }}>
                    FullStack • Data • Systems
                  </div>
                </div>
                <div className="center-badge">
                  <span className="status-dot" style={{ fontSize: '0.72rem' }}>Active</span>
                </div>
              </div>
            </div>

            {/* Floating Telemetry Chips */}
            <div className="hero-telemetry-chips">
              <div className="flagship-tag glass-card chip-flagship">
                <div className="flagship-dot" />
                <div>
                  <div className="flagship-label gradient-text-flagship" style={{ fontWeight: 700, fontSize: '0.82rem' }}>
                    FullStack Academy
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem', fontFamily: 'var(--font-code)' }}>
                    Flagship System • Live
                  </div>
                </div>
              </div>

              <div className="flagship-tag glass-card chip-gpa">
                <FiAward style={{ color: '#10B981', fontSize: '1.1rem', flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.8rem', color: '#10B981' }}>
                    Major GPA 3.96 / 4.0
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem', fontFamily: 'var(--font-code)' }}>
                    Very Great Distinction
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="hero-stats">
        <div className="container">
          <div className="stats-grid">
            {metrics.map((stat, i) => {
              const metaList = [
                { icon: <FiClock />, tag: 'EXPERIENCE', sub: 'Production & Consulting', accent: '#06B6D4' },
                { icon: <FiLayers />, tag: 'DELIVERED', sub: 'Full-Stack & Data Apps', accent: '#3B82F6' },
                { icon: <FiAward />, tag: 'ENTERPRISE', sub: 'High-Scale Architectures', accent: '#F59E0B' },
                { icon: <FiZap />, tag: 'COMMITMENT', sub: 'Clean Code & 3.96 GPA', accent: '#10B981' },
              ]
              const metaByKey = {
                years_tech: metaList[0],
                projects_built: metaList[1],
                flagships: metaList[2],
                passion: metaList[3],
              }
              const meta = metaByKey[stat.key] || metaList[i % metaList.length]
              return (
                <div key={i} className="stat-item glass-card" style={{ '--stat-accent': meta.accent }}>
                  <div className="stat-top">
                    <span className="stat-icon-box" style={{ color: meta.accent, borderColor: `${meta.accent}44`, background: `${meta.accent}14` }}>
                      {meta.icon}
                    </span>
                    <span className="stat-tag font-code">
                      <span className="stat-tag-dot" style={{ background: meta.accent }} />
                      {meta.tag}
                    </span>
                  </div>
                  <div className="stat-value gradient-text">
                    {inView && <CountUp end={stat.value} duration={2} delay={i * 0.2} />}
                    <span>{stat.suffix}</span>
                  </div>
                  <div className="stat-label">{stat.label}</div>
                  <div className="stat-sub">{meta.sub}</div>
                  <div className="stat-accent-bar" style={{ background: `linear-gradient(90deg, ${meta.accent}, transparent)` }} />
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
        <FiArrowDown className="scroll-arrow" />
      </div>
    </section>
  )
}
