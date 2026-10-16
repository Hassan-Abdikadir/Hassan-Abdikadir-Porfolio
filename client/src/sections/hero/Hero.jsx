import { useEffect, useRef } from 'react'
import { TypeAnimation } from 'react-type-animation'
import { FiGithub, FiLinkedin, FiMail, FiArrowDown, FiExternalLink, FiFileText } from 'react-icons/fi'
import { SiMongodb, SiReact, SiNodedotjs, SiPython, SiKaggle, SiDevdotto, SiLeetcode, SiStackoverflow, SiMedium, SiDiscord, SiFacebook, SiWhatsapp, SiInstagram, SiTiktok, SiTelegram, SiX, SiYoutube, SiReddit } from 'react-icons/si'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import VoicePitchWidget from '../../components/ui/VoicePitchWidget'
import './Hero.css'

const techOrbitItems = [
  { icon: <SiReact />, color: '#61DAFB', label: 'React' },
  { icon: <SiNodedotjs />, color: '#339933', label: 'Node.js' },
  { icon: <SiMongodb />, color: '#47A248', label: 'MongoDB' },
  { icon: <SiPython />, color: '#3776AB', label: 'Python' },
]

export default function Hero({ developer, metrics = [], onOpenResume, t, lang }) {
  const { ref, inView } = useInView({ threshold: 0.01, triggerOnce: true })
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = []
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        color: Math.random() > 0.5 ? '#3B82F6' : '#8B5CF6'
      })
    }

    let animId
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
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
        particles.slice(i + 1).forEach(p2 => {
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y)
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(59,130,246,${0.08 * (1 - dist / 100)})`
            ctx.lineWidth = 0.5
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
    }
  }, [])

  return (
    <section id="home" className="hero">
      <canvas ref={canvasRef} className="hero-canvas" />
      <div className="grid-bg" />

      <div className="hero-orb orb-blue" />
      <div className="hero-orb orb-violet" />
      <div className="hero-orb orb-cyan" />

      <div className="container hero-container" ref={ref}>
        {/* Left Content */}
        <div className={`hero-content ${inView ? 'visible' : ''}`}>


          {/* Live Cyber Radar Status Badge */}
          <div className="hero-status-pill glass-card" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '30px', border: '1px solid rgba(0,240,255,0.3)', marginBottom: '20px', background: 'rgba(5,10,25,0.7)', backdropFilter: 'blur(12px)' }}>
            <span className="pulse-dot" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00ff88', boxShadow: '0 0 10px #00ff88' }} />
            <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-code)', color: '#00f0ff', fontWeight: 600 }}>
              AVAILABLE FOR HIRE • HARGEISA (GMT+3)
            </span>
          </div>

          <h1 className="hero-title">
            <span className="hero-greeting">{lang === 'so' ? 'Kushoodhaw, Waxaan Ahay' : "Hi, I'm"}</span>
            <span className="hero-name ocean-gradient-text">Hassan-Abdikadir</span>
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
              <FiFileText /> {t?.hero?.viewResume || 'View Interactive CV'}
            </button>
            <a
              href="/Hassan_Abdikadir_Resume.pdf"
              download="Hassan_Abdikadir_Resume.pdf"
              className="btn-outline"
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              data-hover
            >
              <FiFileText /> {lang === 'so' ? 'Soo Degso PDF CV' : 'Download PDF CV'}
            </a>
          </div>

          {/* FEATURE 2: AI Voice Twin Executive Pitch */}
          <VoicePitchWidget />

          <div className="hero-socials">
            <a href={developer.github || "https://github.com/HassanAbdikadir"} target="_blank" rel="noreferrer" className="social-link" data-hover title="GitHub">
              <FiGithub />
            </a>
            <a href={developer.linkedin || "https://linkedin.com/in/hassanabdikadir"} target="_blank" rel="noreferrer" className="social-link" data-hover title="LinkedIn">
              <FiLinkedin />
            </a>
            <a href={developer.kaggle || "https://www.kaggle.com/hassanabdikadir"} target="_blank" rel="noreferrer" className="social-link" data-hover title="Kaggle">
              <SiKaggle />
            </a>
            <a href={developer.devto || "https://dev.to/hassan-abdikadir"} target="_blank" rel="noreferrer" className="social-link" data-hover title="Dev.to">
              <SiDevdotto />
            </a>
            <a href={developer.leetcode || "https://leetcode.com/u/hassan_abdikadir/"} target="_blank" rel="noreferrer" className="social-link" data-hover title="LeetCode">
              <SiLeetcode />
            </a>
            <a href={developer.stackoverflow || "https://stackoverflow.com/users/33181258/hassan-abdikadir"} target="_blank" rel="noreferrer" className="social-link" data-hover title="Stack Overflow">
              <SiStackoverflow />
            </a>
            <a href={developer.medium || "https://medium.com/@hassan_abdikadir"} target="_blank" rel="noreferrer" className="social-link" data-hover title="Medium">
              <SiMedium />
            </a>
            <a href={developer.discord || "https://discord.com/users/1362003780568354957"} target="_blank" rel="noreferrer" className="social-link" data-hover title="Discord">
              <SiDiscord />
            </a>
            <a href={developer.telegram || "https://t.me/HassanAbdikadir"} target="_blank" rel="noreferrer" className="social-link" data-hover title="Telegram">
              <SiTelegram />
            </a>
            <a href={developer.telegramChannel || "https://t.me/PostFiles"} target="_blank" rel="noreferrer" className="social-link" data-hover title="Telegram Channel (PostFiles)">
              <SiTelegram />
            </a>
            <a href={developer.whatsapp || "https://wa.me/252636364115"} target="_blank" rel="noreferrer" className="social-link" data-hover title="WhatsApp">
              <SiWhatsapp />
            </a>
            <a href={developer.twitter || "https://x.com/HasanAbdikadir8"} target="_blank" rel="noreferrer" className="social-link" data-hover title="Twitter / X">
              <SiX />
            </a>
            <a href={developer.youtube || "https://www.youtube.com/@Hassan-AlBakri"} target="_blank" rel="noreferrer" className="social-link" data-hover title="YouTube">
              <SiYoutube />
            </a>
            <a href={developer.instagram || "https://www.instagram.com/the_albakri/"} target="_blank" rel="noreferrer" className="social-link" data-hover title="Instagram">
              <SiInstagram />
            </a>
            <a href={developer.facebook || "https://www.facebook.com/hassan.abdikadir.adam"} target="_blank" rel="noreferrer" className="social-link" data-hover title="Facebook">
              <SiFacebook />
            </a>
            <a href={developer.tiktok || "https://www.tiktok.com/@hasan_abdikadir"} target="_blank" rel="noreferrer" className="social-link" data-hover title="TikTok">
              <SiTiktok />
            </a>
            <a href={developer.reddit || "https://www.reddit.com/user/This_Package5648/"} target="_blank" rel="noreferrer" className="social-link" data-hover title="Reddit">
              <SiReddit />
            </a>
            <a href={`mailto:${developer.email || 'hasanabdikadir15@gmail.com'}`} className="social-link" data-hover title="Email">
              <FiMail />
            </a>
            <div className="social-divider" />
            <span className="social-label">hassanabdikadir.dev</span>
          </div>
        </div>

        {/* Right Content Visual */}
        <div className={`hero-visual ${inView ? 'visible' : ''}`}>
          <div className="orbit-container">
            <div className="orbit-ring ring-1">
              {techOrbitItems.map((item, i) => (
                <div
                  key={i}
                  className="orbit-item"
                  style={{ animationDelay: `${i * -2}s`, color: item.color }}
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

          <div className="flagship-tag glass-card">
            <div className="flagship-dot" />
            <div>
              <div className="flagship-label gradient-text-flagship" style={{ fontWeight: 700, fontSize: '0.85rem' }}>
                FullStack Academy
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem', fontFamily: 'var(--font-code)' }}>
                Flagship System • Live
              </div>
            </div>
          </div>

          <div className="hero-stats-mini glass-card">
            <div style={{ fontFamily: 'var(--font-code)', color: 'var(--text-muted)', fontSize: '0.65rem', marginBottom: '8px' }}>
              $ system.metrics
            </div>
            <div className="mini-metric">
              <span style={{ color: 'var(--emerald)' }}>API</span>
              <span className="mini-bar">
                <span className="mini-fill" style={{ width: '95%', background: 'var(--emerald)' }} />
              </span>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>99.9%</span>
            </div>
            <div className="mini-metric">
              <span style={{ color: 'var(--cyan)' }}>DB</span>
              <span className="mini-bar">
                <span className="mini-fill" style={{ width: '88%', background: 'var(--cyan)' }} />
              </span>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>88%</span>
            </div>
            <div className="mini-metric">
              <span style={{ color: 'var(--violet)' }}>AI</span>
              <span className="mini-bar">
                <span className="mini-fill" style={{ width: '82%', background: 'var(--violet)' }} />
              </span>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>82%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="hero-stats">
        <div className="container">
          <div className="stats-grid">
            {metrics.map((stat, i) => (
              <div key={i} className="stat-item glass-card">
                <div className="stat-value gradient-text">
                  {inView && <CountUp end={stat.value} duration={2} delay={i * 0.2} />}
                  <span>{stat.suffix}</span>
                </div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
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
