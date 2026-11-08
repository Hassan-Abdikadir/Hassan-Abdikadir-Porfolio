import React, { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { FiAward, FiCheckCircle, FiExternalLink, FiX, FiShield, FiCalendar, FiZap, FiLayers, FiCpu, FiDatabase, FiActivity } from 'react-icons/fi'
import './Certifications.css'

const certCategories = [
  { label: 'All',        icon: <FiLayers /> },
  { label: 'FullStack',  icon: <FiZap /> },
  { label: 'Backend',    icon: <FiCpu /> },
  { label: 'Data & AI',  icon: <FiDatabase /> },
  { label: 'DevOps',     icon: <FiActivity /> },
]

export default function Certifications({ certifications = [], t }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [selectedCert, setSelectedCert]   = useState(null)
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = certifications.filter(c =>
    activeCategory === 'All' || (c.category || 'FullStack') === activeCategory
  )

  return (
    <section id="certifications" className="section certs-section">
      <div className="grid-bg" />
      <div className="certs-orb certs-orb-a" />

      <div className="container" ref={ref}>

        {/* ── Header ──────────────────────────────────────────── */}
        <div className={`certs-header ${inView ? 'visible' : ''}`}>
          <div className="section-label">verified.credentials</div>
          <h2 className="section-title">
            Certifications &amp; <span className="gradient-text">Mastery Badges</span>
          </h2>
          <p className="section-subtitle">
            Formal credentials acknowledging proficiency across Software Architecture,
            FullStack Development, and Data Science.
          </p>
        </div>

        {/* ── Meta Bar (like Skills) ───────────────────────────── */}
        <div className={`certs-meta-bar ${inView ? 'visible' : ''}`}>
          <div className="cmb-item">
            <span className="cmb-val gradient-text">{certifications.length}</span>
            <span className="cmb-label">Total Certs</span>
          </div>
          <div className="cmb-divider" />
          <div className="cmb-item">
            <span className="cmb-val" style={{ color: '#10B981' }}>{filtered.length}</span>
            <span className="cmb-label">Showing</span>
          </div>
          <div className="cmb-divider" />
          <div className="cmb-item">
            <span className="cmb-val" style={{ color: '#8B5CF6' }}>{certCategories.length - 1}</span>
            <span className="cmb-label">Categories</span>
          </div>
          <div className="cmb-divider" />
          <div className="cmb-item">
            <span className="cmb-val" style={{ color: '#10B981' }}>✓</span>
            <span className="cmb-label">All Verified</span>
          </div>
        </div>

        {/* ── Category Filter (like Skills) ────────────────────── */}
        <div className={`certs-controls ${inView ? 'visible' : ''}`}>
          <div className="certs-filter">
            {certCategories.map(cat => (
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
        </div>

        {/* ── Cards Grid ─────────────────────────────────────── */}
        <div className="certs-grid">
          {filtered.map((cert, index) => {
            const certColor = cert.color || '#3B82F6'
            return (
              <div
                key={cert.id || index}
                className={`cert-card glass-card ${inView ? 'visible' : ''}`}
                style={{ transitionDelay: `${(index % 8) * 0.07}s` }}
                onClick={() => setSelectedCert(cert)}
                data-hover
              >
                <div className="cert-top-shimmer" style={{ background: certColor }} />

                {/* Subtle glow like skill card */}
                <div className="cert-bg-glow" style={{ background: certColor }} />

                <div className="cert-icon-wrapper" style={{ color: certColor, borderColor: `${certColor}55`, background: `${certColor}15` }}>
                  <FiAward className="cert-icon-svg" />
                  <div className="cert-icon-glow" style={{ background: certColor }} />
                </div>

                <div className="cert-content">
                  <div className="cert-year-tag">
                    <FiCalendar /> {cert.year}
                  </div>
                  <h3 className="cert-name">{cert.name}</h3>
                  <div className="cert-issuer">{cert.issuer}</div>
                </div>

                {/* Progress-style verified bar */}
                <div className="cert-progress-wrap">
                  <div className="cert-progress-track">
                    <div
                      className="cert-progress-fill"
                      style={{
                        width: inView ? '100%' : '0%',
                        background: `linear-gradient(90deg, ${certColor}88, ${certColor})`,
                        transitionDelay: `${(index % 8) * 0.07 + 0.3}s`
                      }}
                    >
                      <div className="cert-shimmer" />
                    </div>
                  </div>
                  <span className="cert-verified-pill">
                    <FiCheckCircle className="check-icon" /> Verified
                  </span>
                </div>
              </div>
            )
          })}

          {filtered.length === 0 && (
            <div className="certs-empty">
              <FiAward className="empty-icon" />
              <p>No certificates in this category.</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Detail Modal ──────────────────────────────────────── */}
      {selectedCert && (
        <div className="modal-backdrop" onClick={() => setSelectedCert(null)}>
          <div className="cert-modal-card glass-card" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedCert(null)} data-hover><FiX /></button>

            <div className="cert-modal-header">
              <div className="cert-modal-badge" style={{ background: selectedCert.color || '#3B82F6' }}>
                <FiShield />
              </div>
              <div>
                <span className="section-label" style={{ fontSize: '0.7rem' }}>VERIFIED CREDENTIAL</span>
                <h3 className="cert-modal-title">{selectedCert.name}</h3>
                <p className="cert-modal-issuer">{selectedCert.issuer}</p>
              </div>
            </div>

            <div className="cert-modal-body">
              <div className="cert-detail-grid">
                <div className="cert-detail-item">
                  <span className="detail-label">Credential Token</span>
                  <span className="detail-val font-code">CERT-HA-{selectedCert.year}-8891</span>
                </div>
                <div className="cert-detail-item">
                  <span className="detail-label">Issue Date</span>
                  <span className="detail-val"><FiCalendar /> {selectedCert.year}</span>
                </div>
                <div className="cert-detail-item">
                  <span className="detail-label">Status</span>
                  <span className="detail-val verified"><FiCheckCircle /> Active</span>
                </div>
                <div className="cert-detail-item">
                  <span className="detail-label">Category</span>
                  <span className="detail-val">{selectedCert.category || 'FullStack'}</span>
                </div>
              </div>

              <div className="cert-skills-tags">
                <span className="section-label" style={{ fontSize: '0.7rem' }}>Domain Competencies</span>
                <div className="tech-badge-group">
                  <span className="tech-badge">FullStack Architecture</span>
                  <span className="tech-badge violet">Data Intelligence</span>
                  <span className="tech-badge emerald">System Engineering</span>
                </div>
              </div>

              <div className="cert-modal-actions">
                <button
                  className="btn-primary"
                  onClick={() => selectedCert.url ? window.open(selectedCert.url, '_blank') : null}
                  data-hover
                >
                  <FiExternalLink /> Verify On Portal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
