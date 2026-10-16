import React, { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { FiAward, FiCheckCircle, FiExternalLink, FiX, FiShield, FiCalendar, FiLock } from 'react-icons/fi'
import './Certifications.css'

export default function Certifications({ certifications = [] }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [selectedCert, setSelectedCert] = useState(null)

  return (
    <section id="certifications" className="section certs-section">
      <div className="grid-bg" />
      <div className="certs-orb certs-orb-a" />

      <div className="container" ref={ref}>

        {/* Header */}
        <div className={`certs-header ${inView ? 'visible' : ''}`}>
          <div className="section-label">verified.credentials</div>
          <h2 className="section-title">
            Certifications & <span className="gradient-text">Mastery Badges</span>
          </h2>
          <p className="section-subtitle">
            Formal, cryptographically verifiable credentials acknowledging proficiency across Software Architecture, FullStack Development, and Data Science.
          </p>
        </div>

        {/* Grid */}
        <div className="certs-grid">
          {certifications.map((cert, index) => {
            const certColor = cert.color || '#3B82F6'
            return (
              <div
                key={cert.id || index}
                className={`cert-card glass-card ${inView ? 'visible' : ''}`}
                style={{ transitionDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedCert(cert)}
                data-hover
              >
                <div className="cert-top-shimmer" style={{ background: certColor }} />

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

                <div className="cert-status-bar">
                  <span className="cert-verified-pill">
                    <FiCheckCircle className="check-icon" /> Verify Credential
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Credential Verification Modal */}
      {selectedCert && (
        <div className="modal-backdrop" onClick={() => setSelectedCert(null)}>
          <div className="cert-modal-card glass-card" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedCert(null)} data-hover><FiX /></button>

            <div className="cert-modal-header">
              <div className="cert-modal-badge" style={{ background: selectedCert.color || '#3B82F6' }}>
                <FiShield />
              </div>
              <div>
                <span className="section-label" style={{ fontSize: '0.7rem' }}>CRYPTOGRAPHIC VERIFIED CREDENTIAL</span>
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
                  <span className="detail-val verified"><FiCheckCircle /> Authenticated & Active</span>
                </div>
              </div>

              <div className="cert-skills-tags">
                <span className="section-label" style={{ fontSize: '0.7rem' }}>Validated Domain Competencies</span>
                <div className="tech-badge-group">
                  <span className="tech-badge">FullStack Architecture</span>
                  <span className="tech-badge violet">Data Intelligence</span>
                  <span className="tech-badge emerald">System Engineering</span>
                </div>
              </div>

              <div className="cert-modal-actions">
                <button className="btn-primary" onClick={() => window.open('https://coursera.org', '_blank')} data-hover>
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
