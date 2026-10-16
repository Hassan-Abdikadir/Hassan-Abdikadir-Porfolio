import { useInView } from 'react-intersection-observer'
import { FiUser, FiMapPin, FiAward, FiCode } from 'react-icons/fi'
import TechSphere from '../hero/TechSphere'
import './About.css'

const pillars = [
  {
    icon: <FiCode />, color: 'blue',
    title: 'Software Engineering',
    desc: 'Designing scalable, maintainable systems using modern architecture patterns, clean code principles, REST APIs, and security best practices.',
    tags: ['System Design', 'Clean Code', 'REST APIs', 'Microservices']
  },
  {
    icon: '🌐', color: 'cyan',
    title: 'FullStack MERN Development',
    desc: 'Building end-to-end web applications from high-performance React frontends to robust Node.js backends with MongoDB persistence.',
    tags: ['React.js', 'Node.js', 'MongoDB', 'Express.js']
  },
  {
    icon: '📊', color: 'emerald',
    title: 'Data Analytics & Intelligence',
    desc: 'Transforming raw data into actionable insights through interactive visualization, statistical telemetry, and predictive modeling.',
    tags: ['Python', 'Data Viz', 'SQL/NoSQL', 'Pandas']
  },
]

export default function About({ developer, t, lang }) {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <section id="about" className="section about-section">
      <div className="grid-bg" />
      <div className="container" ref={ref}>
        <div className={`about-header ${inView ? 'visible' : ''}`}>
          <div className="section-label">{t?.about?.label || 'about.me'}</div>
          <h2 className="section-title">
            {t?.about?.title || 'The Tech Visionary Behind the Code'}
          </h2>
          <p className="section-subtitle">
            {t?.about?.subtitle || 'A multi-disciplinary technologist pushing boundaries across Software Engineering, FullStack MERN Systems, and Data Analytics.'}
          </p>
        </div>

        <div className={`about-grid ${inView ? 'visible' : ''}`}>
          {/* Profile Card */}
          <div className="about-profile glass-card">
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

          {/* Pillars */}
          <div className="about-pillars">
            {pillars.map((p, i) => (
              <div
                key={i}
                className={`pillar-card glass-card glow-border ${inView ? 'visible' : ''}`}
                style={{ transitionDelay: `${i * 0.15}s` }}
              >
                <div className={`pillar-icon pillar-icon-${p.color}`}>
                  {p.icon}
                </div>
                <div className="pillar-body">
                  <h4 className="pillar-title">{p.title}</h4>
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
        </div>
      </div>
    </section>
  )
}
