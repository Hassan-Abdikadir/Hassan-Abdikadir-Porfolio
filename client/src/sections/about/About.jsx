import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { FiUser, FiMapPin, FiAward, FiCode, FiShield, FiGlobe, FiArrowRight, FiClock, FiLayers, FiBarChart2, FiTarget } from 'react-icons/fi'
import TechSphere from '../hero/TechSphere'
import './About.css'

const pillars = [
  {
    icon: <FiCode />, color: 'blue',
    title: 'Software Engineering',
    metric: '99.9% Uptime Architecture',
    desc: 'Designing scalable, maintainable systems using modern architecture patterns, clean code principles, REST APIs, and security best practices.',
    tags: ['System Design', 'Clean Code', 'REST APIs', 'Microservices']
  },
  {
    icon: <FiLayers />, color: 'cyan',
    title: 'FullStack MERN Development',
    metric: '20+ Production Systems',
    desc: 'Building end-to-end web applications from high-performance React frontends to robust Node.js backends with MongoDB persistence.',
    tags: ['React.js', 'Node.js', 'MongoDB', 'Express.js']
  },
  {
    icon: <FiBarChart2 />, color: 'emerald',
    title: 'Data Analytics & Intelligence',
    metric: 'Real-Time Python & BI Telemetry',
    desc: 'Transforming raw data into actionable insights through interactive visualization, statistical telemetry, and predictive modeling.',
    tags: ['Python', 'Data Viz', 'SQL/NoSQL', 'Pandas']
  },
]

export default function About({ developer, t, lang }) {
  const { ref, inView } = useInView({ threshold: 0.12, triggerOnce: true })
  const [hargeisaTime, setHargeisaTime] = useState('')

  useEffect(() => {
    const updateClock = () => {
      try {
        const formatted = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Africa/Mogadishu',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }).format(new Date())
        setHargeisaTime(formatted)
      } catch {
        setHargeisaTime('GMT+3')
      }
    }
    updateClock()
    const timer = setInterval(updateClock, 30000)
    return () => clearInterval(timer)
  }, [])

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="about" className="section about-section">
      <div className="grid-bg" />
      <div className="container" ref={ref}>
        <div className={`about-header ${inView ? 'visible' : ''}`}>
          <div className="section-label">{t?.about?.label || 'about.me'}</div>
          <h2 className="section-title">
            The Tech Visionary <span className="gradient-text">Behind the Code</span>
          </h2>
          <p className="section-subtitle">
            {t?.about?.subtitle || 'A multi-disciplinary technologist pushing boundaries across Software Engineering, FullStack MERN Systems, and Data Analytics.'}
          </p>
        </div>

        <div className={`about-grid ${inView ? 'visible' : ''}`}>
          {/* Left Bento Card: Executive Profile */}
          <div className="about-profile glass-card">
            <div className="profile-verified-chip">
              <FiShield />
              <span>VERIFIED ENGINEER • CLASS OF 2026</span>
            </div>

            <div className="profile-avatar">
              <div className="avatar-ring" />
              <div className="avatar-core">
                <img src="/LOGO.png" alt="Hassan Abdikadir" className="avatar-logo-img" />
              </div>
              <div className="avatar-status">
                <span className="status-dot">{developer.status || 'Available'}</span>
              </div>
            </div>

            <div className="profile-info">
              <h3 className="profile-name">{developer.name || 'Hassan Abdikadir'}</h3>
              <p className="profile-role gradient-text-data">
                {developer.title || 'Software Engineer & Data Analyst'}
              </p>

              {/* Admas University Honors Callout */}
              <div className="honors-callout">
                <div className="honors-icon">
                  <FiAward />
                </div>
                <div className="honors-text">
                  <span className="honors-degree">Admas University • B.Sc. Software Eng.</span>
                  <span className="honors-gpa">3.96 GPA • Presidential Merit Winner</span>
                </div>
              </div>

              <div className="profile-meta">
                <div className="meta-item">
                  <FiMapPin />
                  <span>{developer.location || 'Hargeisa • Somaliland'}</span>
                </div>
                <div className="meta-item">
                  <FiAward />
                  <span>{developer.experienceYears || 3}+ Years in Tech</span>
                </div>
                <div className="meta-item">
                  <FiUser />
                  <span>{developer.projectsCompleted || 20}+ Projects Delivered</span>
                </div>
              </div>
            </div>

            <div className="profile-quick-stats">
              <div className="quick-stat">
                <span className="qs-value gradient-text">MERN</span>
                <span className="qs-label">Stack Mastery</span>
              </div>
              <div className="qs-divider" />
              <div className="quick-stat">
                <span className="qs-value gradient-text-flagship">Data</span>
                <span className="qs-label">Analytics Pro</span>
              </div>
              <div className="qs-divider" />
              <div className="quick-stat">
                <span className="qs-value gradient-text-data">SWE</span>
                <span className="qs-label">Engineering</span>
              </div>
            </div>

            {/* 3D Tech Sphere Universe */}
            <div className="profile-sphere-box glass-card">
              <div className="section-label" style={{ fontSize: '0.68rem', marginBottom: '4px' }}>3d.tech.universe</div>
              <TechSphere />
            </div>
          </div>

          {/* Right Bento Column: Pillars + Collaboration Hub */}
          <div className="about-bento-right">
            <div className="about-pillars">
              {pillars.map((p, i) => (
                <div
                  key={i}
                  className={`pillar-card glass-card glow-border ${inView ? 'visible' : ''}`}
                  style={{ transitionDelay: `${i * 0.12}s` }}
                >
                  <div className={`pillar-icon pillar-icon-${p.color}`}>
                    {p.icon}
                  </div>
                  <div className="pillar-body">
                    <div className="pillar-top-row">
                      <h4 className="pillar-title">{p.title}</h4>
                      <span className={`pillar-metric-badge metric-${p.color}`}>{p.metric}</span>
                    </div>
                    <p className="pillar-desc">{p.desc}</p>
                    <div className="pillar-tags">
                      {p.tags.map((t, j) => (
                        <span key={j} className={`tech-badge ${p.color === 'emerald' ? 'emerald' : p.color === 'cyan' ? 'violet' : ''}`}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 4th Bento Card: Global Engineering & Collaboration Hub */}
            <div className={`bento-collab-hub glass-card glow-border ${inView ? 'visible' : ''}`}>
              <div className="bento-collab-top">
                <div className="bento-collab-title-wrap">
                  <div className="bento-collab-icon">
                    <FiGlobe />
                  </div>
                  <div>
                    <h4 className="bento-collab-title">Global Engineering &amp; Collaboration Hub</h4>
                    <span className="bento-collab-sub font-code">REMOTE-FIRST ARCHITECTURE • US / EU / MENA SYNC</span>
                  </div>
                </div>
                <div className="bento-live-clock font-code">
                  <span className="bento-clock-dot" />
                  <FiClock />
                  <span>Hargeisa (GMT+3) • {hargeisaTime || 'LIVE'}</span>
                </div>
              </div>

              <p className="bento-philosophy">
                &ldquo;Build with purpose, architect for scale, and turn complex data into crystal-clear digital impact.&rdquo;
              </p>

              <div className="bento-collab-actions">
                <button
                  type="button"
                  className="bento-jump-btn primary"
                  onClick={() => scrollToSection('projects')}
                  data-hover
                >
                  <span>Explore Flagship Systems</span>
                  <FiArrowRight />
                </button>
                <button
                  type="button"
                  className="bento-jump-btn secondary"
                  onClick={() => scrollToSection('recruiter-match')}
                  data-hover
                >
                  <FiTarget />
                  <span>Test AI Recruiter Fit Score</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
