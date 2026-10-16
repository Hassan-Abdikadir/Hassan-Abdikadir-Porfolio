import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { FiSearch, FiZap, FiLayers, FiDatabase, FiCpu, FiActivity } from 'react-icons/fi'
import './Skills.css'

const categories = [
  { label: 'All', icon: <FiLayers /> },
  { label: 'Frontend', icon: <FiZap /> },
  { label: 'Backend', icon: <FiCpu /> },
  { label: 'Data & Analytics', icon: <FiDatabase /> },
  { label: 'DevOps & Tools', icon: <FiActivity /> },
]

const levelLabels = {
  90: 'Expert',
  75: 'Advanced',
  60: 'Proficient',
  0: 'Familiar',
}

function getLevelLabel(level) {
  if (level >= 90) return 'Expert'
  if (level >= 75) return 'Advanced'
  if (level >= 60) return 'Proficient'
  return 'Familiar'
}

function getLevelColor(level) {
  if (level >= 90) return '#10B981'
  if (level >= 75) return '#3B82F6'
  if (level >= 60) return '#8B5CF6'
  return '#F59E0B'
}

export default function Skills({ skills = [], t, lang }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true })

  const filteredSkills = skills.filter(s => {
    const matchesCat = activeCategory === 'All' || s.category === activeCategory
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCat && matchesSearch
  })

  const avgLevel = filteredSkills.length
    ? Math.round(filteredSkills.reduce((a, s) => a + s.level, 0) / filteredSkills.length)
    : 0

  return (
    <section id="skills" className="section skills-section">
      <div className="grid-bg" />

      {/* Ambient orbs */}
      <div className="skills-orb orb-a" />
      <div className="skills-orb orb-b" />

      <div className="container" ref={ref}>

        {/* Header */}
        <div className={`skills-header ${inView ? 'visible' : ''}`}>
          <div className="section-label">{t?.skills?.label || 'technical.matrix'}</div>
          <h2 className="section-title">
            {t?.skills?.title || 'Skills & Tech Arsenal'}
          </h2>
          <p className="section-subtitle">
            {t?.skills?.subtitle || 'A living system of mastered technologies — from pixel-perfect frontends to distributed backends and data intelligence pipelines.'}
          </p>
        </div>

        {/* Meta Bar */}
        <div className={`skills-meta-bar ${inView ? 'visible' : ''}`}>
          <div className="smb-item">
            <span className="smb-val gradient-text">{skills.length}</span>
            <span className="smb-label">Total Skills</span>
          </div>
          <div className="smb-divider" />
          <div className="smb-item">
            <span className="smb-val" style={{ color: '#10B981' }}>{avgLevel}%</span>
            <span className="smb-label">Avg. Mastery</span>
          </div>
          <div className="smb-divider" />
          <div className="smb-item">
            <span className="smb-val" style={{ color: '#8B5CF6' }}>{filteredSkills.length}</span>
            <span className="smb-label">Showing</span>
          </div>
          <div className="smb-divider" />
          <div className="smb-item">
            <span className="smb-val" style={{ color: '#F59E0B' }}>{categories.length - 1}</span>
            <span className="smb-label">Categories</span>
          </div>
        </div>

        {/* Controls */}
        <div className={`skills-controls ${inView ? 'visible' : ''}`}>
          <div className="skills-filter">
            {categories.map(cat => (
              <button
                key={cat.label}
                className={`filter-btn ${activeCategory === cat.label ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.label)}
                data-hover
              >
                <span className="filter-icon">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>

          <div className="skills-search glass-card">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search (e.g. React, Python...)"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="search-input"
              maxLength={50}
            />
          </div>
        </div>

        {/* Grid */}
        <div className="skills-grid">
          {filteredSkills.map((skill, index) => {
            const lvlColor = skill.color || getLevelColor(skill.level)
            const lvlLabel = getLevelLabel(skill.level)
            const isHovered = hoveredSkill === index
            return (
              <div
                key={skill.name + index}
                className={`skill-card glass-card ${inView ? 'visible' : ''}`}
                style={{ transitionDelay: `${(index % 10) * 0.04}s` }}
                onMouseEnter={() => setHoveredSkill(index)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                {/* Glow layer */}
                <div className="sc-glow" style={{ background: lvlColor }} />

                <div className="sc-top">
                  <div className="sc-name-row">
                    <span className="sc-name">{skill.name}</span>
                    <span className="sc-badge" style={{ color: lvlColor, borderColor: `${lvlColor}44`, background: `${lvlColor}11` }}>
                      {lvlLabel}
                    </span>
                  </div>
                  <span className="sc-pct" style={{ color: lvlColor }}>{skill.level}%</span>
                </div>

                {/* Progress track */}
                <div className="sc-track">
                  <div
                    className="sc-fill"
                    style={{
                      width: inView ? `${skill.level}%` : '0%',
                      background: `linear-gradient(90deg, ${lvlColor}aa, ${lvlColor})`,
                      transitionDelay: `${(index % 10) * 0.04 + 0.3}s`
                    }}
                  >
                    <div className="sc-shimmer" />
                  </div>
                  {/* Milestone marks */}
                  {[25, 50, 75].map(m => (
                    <div key={m} className="sc-mark" style={{ left: `${m}%` }} />
                  ))}
                </div>

                <div className="sc-bottom">
                  <span className="sc-cat">{skill.category}</span>
                  <div className="sc-dots">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className="sc-dot"
                        style={{
                          background: i < Math.round(skill.level / 20) ? lvlColor : 'rgba(255,255,255,0.1)'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )
          })}

          {filteredSkills.length === 0 && (
            <div className="skills-empty">
              <FiSearch className="empty-icon" />
              <p>No skills match your filter.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
