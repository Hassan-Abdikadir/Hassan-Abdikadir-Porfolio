import React, { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import {
  FiAward, FiCheckCircle, FiX, FiShield, FiCalendar,
  FiZap, FiLayers, FiBookOpen, FiCode, FiMaximize2, FiStar
} from 'react-icons/fi'
import './Certifications.css'

const certCategories = [
  { label: 'All',       icon: <FiLayers /> },
  { label: 'Academic',  icon: <FiBookOpen /> },
  { label: 'Technical', icon: <FiCode /> },
  { label: 'Training',  icon: <FiAward /> },
]

export default function Certifications({ certifications = [] }) {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true })
  const [selectedCert, setSelectedCert] = useState(null)
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxImg, setLightboxImg] = useState(null)

  const filtered = certifications.filter(c =>
    activeCategory === 'All' || c.category === activeCategory
  )

  const academicCount  = certifications.filter(c => c.category === 'Academic').length
  const technicalCount = certifications.filter(c => c.category === 'Technical').length
  const trainingCount  = certifications.filter(c => c.category === 'Training').length

  return (
    <section id="certifications" className="section certs-section">
      <div className="grid-bg" />
      <div className="certs-orb certs-orb-a" />
      <div className="certs-orb certs-orb-b" />

      {/* Floating particle dots */}
      <div className="cert-particles">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`cert-particle cert-particle-${i + 1}`} />
        ))}
      </div>

      <div className="container" ref={ref}>

        {/* ── Header ── */}
        <div className={`certs-header ${inView ? 'visible' : ''}`}>
          <div className="section-label">verified.credentials</div>
          <h2 className="section-title">
            Certifications &amp; <span className="gradient-text">Mastery Badges</span>
          </h2>
          <p className="section-subtitle">
            Formal academic credentials from Somaliland National Board to Admas University —
            Software Engineering graduate with <strong style={{ color: '#F59E0B' }}>Very Great Distinction</strong>,
            along with verified technical and leadership competencies.
          </p>
        </div>

        {/* ── Meta Bar ── */}
        <div className={`certs-meta-bar ${inView ? 'visible' : ''}`}>
          <div className="cmb-item">
            <span className="cmb-val gradient-text">{certifications.length}</span>
            <span className="cmb-label">Total Certs</span>
          </div>
          <div className="cmb-divider" />
          <div className="cmb-item">
            <span className="cmb-val" style={{ color: '#F59E0B' }}>{academicCount}</span>
            <span className="cmb-label">Academic</span>
          </div>
          <div className="cmb-divider" />
          <div className="cmb-item">
            <span className="cmb-val" style={{ color: '#8B5CF6' }}>{technicalCount}</span>
            <span className="cmb-label">Technical</span>
          </div>
          <div className="cmb-divider" />
          <div className="cmb-item">
            <span className="cmb-val" style={{ color: '#38BDF8' }}>{trainingCount}</span>
            <span className="cmb-label">Training</span>
          </div>
          <div className="cmb-divider" />
          <div className="cmb-item">
            <span className="cmb-val" style={{ color: '#10B981' }}>
              <FiStar style={{ display: 'inline', fontSize: '1.4rem' }} />
            </span>
            <span className="cmb-label">Distinction</span>
          </div>
        </div>

        {/* ── Category Filter ── */}
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

        {/* ── Cards Grid ── */}
        <div className="certs-grid">
          {filtered.map((cert, index) => {
            const certColor = cert.color || '#3B82F6'
            const hasImage = !!cert.image

            return (
              <div
                key={cert.id || index}
                className={`cert-card glass-card ${inView ? 'visible' : ''} ${hasImage ? 'cert-card-visual' : ''}`}
                style={{ transitionDelay: `${(index % 6) * 0.08}s` }}
                onClick={() => setSelectedCert(cert)}
                data-hover
              >
                {/* Top color shimmer line */}
                <div className="cert-top-shimmer" style={{ background: `linear-gradient(90deg, ${certColor}, ${certColor}66)` }} />

                {/* Corner glow */}
                <div className="cert-bg-glow" style={{ background: certColor }} />

                {/* If has real image — show thumbnail */}
                {hasImage ? (
                  <div className="cert-thumb-wrap" style={{ borderColor: `${certColor}44` }}>
                    <img
                      src={cert.image}
                      alt={cert.name}
                      className="cert-thumb"
                      loading="lazy"
                    />
                    <div className="cert-thumb-overlay" style={{ background: `${certColor}22` }}>
                      <FiMaximize2 className="cert-expand-icon" />
                    </div>
                    {/* Verified badge over image */}
                    <div className="cert-thumb-badge" style={{ background: certColor }}>
                      <FiCheckCircle /> Verified
                    </div>
                  </div>
                ) : (
                  /* No image — show icon */
                  <div className="cert-icon-wrapper" style={{ color: certColor, borderColor: `${certColor}55`, background: `${certColor}15` }}>
                    <FiAward className="cert-icon-svg" />
                    <div className="cert-icon-glow" style={{ background: certColor }} />
                  </div>
                )}

                {/* Info */}
                <div className="cert-content">
                  <div className="cert-year-tag">
                    <FiCalendar /> {cert.year}
                    {cert.distinction && (
                      <span className="cert-distinction-tag" style={{ color: certColor, borderColor: `${certColor}44`, background: `${certColor}11` }}>
                        {cert.distinction}
                      </span>
                    )}
                  </div>
                  <h3 className="cert-name">{cert.name}</h3>
                  <div className="cert-issuer">{cert.issuer}</div>
                </div>

                {/* Progress verified bar */}
                <div className="cert-progress-wrap">
                  <div className="cert-progress-track">
                    <div
                      className="cert-progress-fill"
                      style={{
                        width: inView ? '100%' : '0%',
                        background: `linear-gradient(90deg, ${certColor}66, ${certColor})`,
                        transitionDelay: `${(index % 6) * 0.08 + 0.35}s`
                      }}
                    >
                      <div className="cert-shimmer" />
                    </div>
                  </div>
                  <span className="cert-verified-pill">
                    <FiCheckCircle className="check-icon" />
                    {hasImage ? 'View Certificate' : 'Verified'}
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

      {/* ── Certificate Detail Modal ── */}
      {selectedCert && (
        <div className="modal-backdrop" onClick={() => setSelectedCert(null)}>
          <div className="cert-modal-card glass-card cert-modal-premium" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedCert(null)} data-hover><FiX /></button>

            {/* Modal top accent */}
            <div className="cert-modal-accent" style={{ background: `linear-gradient(90deg, ${selectedCert.color || '#3B82F6'}, transparent)` }} />

            <div className="cert-modal-header">
              <div className="cert-modal-badge" style={{ background: selectedCert.color || '#3B82F6' }}>
                <FiShield />
              </div>
              <div>
                <span className="section-label" style={{ fontSize: '0.68rem' }}>VERIFIED CREDENTIAL</span>
                <h3 className="cert-modal-title">{selectedCert.name}</h3>
                <p className="cert-modal-issuer">{selectedCert.issuer}</p>
                {selectedCert.distinction && (
                  <span className="cert-modal-distinction" style={{ background: `${selectedCert.color}22`, color: selectedCert.color, borderColor: `${selectedCert.color}44` }}>
                    <FiZap /> {selectedCert.distinction}
                  </span>
                )}
              </div>
            </div>

            {/* Real certificate image viewer */}
            {selectedCert.image && (
              <div className="cert-modal-img-wrap" onClick={() => setLightboxImg(selectedCert.image)}>
                <img
                  src={selectedCert.image}
                  alt={selectedCert.name}
                  className="cert-modal-img"
                />
                <div className="cert-modal-img-overlay">
                  <FiMaximize2 /> Click to fullscreen
                </div>
              </div>
            )}

            <div className="cert-modal-body">
              <div className="cert-detail-grid">
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
                  <span className="detail-val">{selectedCert.category}</span>
                </div>
                {selectedCert.serialNo && (
                  <div className="cert-detail-item">
                    <span className="detail-label">Serial No.</span>
                    <span className="detail-val font-code">{selectedCert.serialNo}</span>
                  </div>
                )}
              </div>

              <div className="cert-modal-actions">
                <button className="cert-modal-close-btn" onClick={() => setSelectedCert(null)} data-hover>
                  <FiX /> Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Lightbox fullscreen ── */}
      {lightboxImg && (
        <div className="cert-lightbox" onClick={() => setLightboxImg(null)}>
          <button className="lightbox-close" onClick={() => setLightboxImg(null)} data-hover><FiX /></button>
          <img src={lightboxImg} alt="Certificate" className="lightbox-img" onClick={e => e.stopPropagation()} />
          <p className="lightbox-hint">Click outside to close</p>
        </div>
      )}
    </section>
  )
}
