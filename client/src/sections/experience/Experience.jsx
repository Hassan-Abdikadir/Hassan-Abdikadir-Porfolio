import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { FiBriefcase, FiBookOpen, FiMapPin, FiCalendar, FiAward, FiChevronDown } from 'react-icons/fi'
import './Experience.css'

export default function Experience({ experiences = [] }) {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true })
  const [expanded, setExpanded] = useState(null)

  return (
    <section id="experience" className="section experience-section">
      <div className="grid-bg" />
      <div className="exp-orb exp-orb-a" />
      <div className="exp-orb exp-orb-b" />

      <div className="container" ref={ref}>

        {/* Header */}
        <div className={`exp-header ${inView ? 'visible' : ''}`}>
          <div className="section-label">career.timeline</div>
          <h2 className="section-title">
            Professional <span className="gradient-text">Journey</span>
          </h2>
          <p className="section-subtitle">
            A chronicle of engineering roles, academic milestones, and impactful projects
            that shaped a multi-disciplinary technologist.
          </p>
        </div>

        {/* Timeline */}
        <div className="exp-timeline">
          {/* Vertical line */}
          <div className="exp-line">
            <div className={`exp-line-fill ${inView ? 'filled' : ''}`} />
          </div>

          {experiences.map((exp, index) => {
            const isRight = index % 2 === 0
            const isOpen = expanded === index
            return (
              <div
                key={exp.id || index}
                className={`exp-item ${isRight ? 'right' : 'left'} ${inView ? 'visible' : ''}`}
                style={{ transitionDelay: `${index * 0.12}s` }}
              >
                {/* Node */}
                <div
                  className="exp-node"
                  style={{ background: exp.gradient || 'linear-gradient(135deg, #3B82F6, #8B5CF6)' }}
                >
                  {exp.type === 'education' ? <FiBookOpen /> : <FiBriefcase />}
                  <div className="exp-node-ring" />
                </div>

                {/* Card */}
                <div
                  className={`exp-card glass-card ${isOpen ? 'open' : ''}`}
                  onClick={() => setExpanded(isOpen ? null : index)}
                >
                  {/* Card top accent line */}
                  <div
                    className="exp-card-accent"
                    style={{ background: exp.gradient || 'linear-gradient(90deg, #3B82F6, #8B5CF6)' }}
                  />

                  <div className="exp-card-header">
                    <div className="exp-card-left">
                      <div className="exp-type-badge" style={{
                        background: exp.type === 'education'
                          ? 'rgba(16,185,129,0.1)' : 'rgba(59,130,246,0.1)',
                        color: exp.type === 'education' ? '#10B981' : '#60A5FA',
                        border: `1px solid ${exp.type === 'education' ? 'rgba(16,185,129,0.3)' : 'rgba(59,130,246,0.3)'}`
                      }}>
                        {exp.type === 'education' ? <FiBookOpen /> : <FiBriefcase />}
                        {exp.type === 'education' ? 'Education' : 'Professional'}
                      </div>
                      <h3 className="exp-title">{exp.title}</h3>
                      <div className="exp-org">{exp.org}</div>
                    </div>

                    <div className="exp-card-right">
                      <div className="exp-period">
                        <FiCalendar />
                        {exp.period}
                      </div>
                      {exp.location && (
                        <div className="exp-location">
                          <FiMapPin />
                          {exp.location}
                        </div>
                      )}
                      <button className="exp-expand-btn" data-hover>
                        <FiChevronDown className={isOpen ? 'rotate' : ''} />
                      </button>
                    </div>
                  </div>

                  <div className={`exp-body ${isOpen ? 'open' : ''}`}>
                    <p className="exp-desc">{exp.desc}</p>
                    {exp.achievements && (
                      <ul className="exp-achievements">
                        {exp.achievements.map((a, ai) => (
                          <li key={ai}>
                            <FiAward className="ach-icon" />
                            {a}
                          </li>
                        ))}
                      </ul>
                    )}
                    {exp.tags && (
                      <div className="exp-tags">
                        {exp.tags.map(tag => (
                          <span key={tag} className="tech-badge">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
