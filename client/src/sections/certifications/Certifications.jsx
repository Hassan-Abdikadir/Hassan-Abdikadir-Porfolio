import React, { useState, useEffect, useCallback } from 'react'
import { useInView } from 'react-intersection-observer'
import {
  FiAward, FiCheckCircle, FiX, FiShield, FiCalendar,
  FiZap, FiLayers, FiBookOpen, FiCode, FiStar,
  FiChevronLeft, FiChevronRight, FiHash, FiMapPin,
  FiUser, FiTrendingUp, FiEye
} from 'react-icons/fi'
import './Certifications.css'

const certCategories = [
  { label: 'All',       icon: <FiLayers /> },
  { label: 'Academic',  icon: <FiBookOpen /> },
  { label: 'Technical', icon: <FiCode /> },
  { label: 'Training',  icon: <FiAward /> },
]

/* ── Category color theme helper ── */
const categoryTheme = (cat) => {
  if (cat === 'Academic')  return { badge: 'rgba(245,158,11,0.15)', text: '#F59E0B' }
  if (cat === 'Technical') return { badge: 'rgba(139,92,246,0.15)', text: '#8B5CF6' }
  if (cat === 'Training')  return { badge: 'rgba(56,189,248,0.15)',  text: '#38BDF8' }
  return { badge: 'rgba(59,130,246,0.15)', text: '#3B82F6' }
}

export default function Certifications({ certifications = [] }) {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true })
  const [activeCategory, setActiveCategory] = useState('All')
  const [viewerCert, setViewerCert]         = useState(null)
  const [viewerIndex, setViewerIndex]       = useState(0)

  const filtered = certifications.filter(c =>
    activeCategory === 'All' || c.category === activeCategory
  )

  const academicCount  = certifications.filter(c => c.category === 'Academic').length
  const technicalCount = certifications.filter(c => c.category === 'Technical').length
  const trainingCount  = certifications.filter(c => c.category === 'Training').length

  /* ── Open fullscreen viewer ── */
  const openViewer = useCallback((cert, idx) => {
    setViewerCert(cert)
    setViewerIndex(idx)
    document.body.style.overflow = 'hidden'
  }, [])

  /* ── Close viewer ── */
  const closeViewer = useCallback(() => {
    setViewerCert(null)
    document.body.style.overflow = ''
  }, [])

  /* ── Navigate prev/next ── */
  const navigate = useCallback((dir) => {
    setViewerIndex(prev => {
      const next = (prev + dir + filtered.length) % filtered.length
      setViewerCert(filtered[next])
      return next
    })
  }, [filtered])

  /* ── Keyboard navigation ── */
  useEffect(() => {
    if (!viewerCert) return
    const handler = (e) => {
      if (e.key === 'Escape')     closeViewer()
      if (e.key === 'ArrowLeft')  navigate(-1)
      if (e.key === 'ArrowRight') navigate(1)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [viewerCert, closeViewer, navigate])

  /* ── Close viewer when category changes ── */
  useEffect(() => { closeViewer() }, [activeCategory, closeViewer])

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
            const hasImage  = !!cert.image
            const theme     = categoryTheme(cert.category)

            return (
              <div
                key={cert.id || index}
                className={`cert-card ${inView ? 'visible' : ''} ${hasImage ? 'cert-card-visual' : ''}`}
                style={{ transitionDelay: `${(index % 6) * 0.08}s` }}
                onClick={() => openViewer(cert, index)}
                data-hover
              >
                {/* Top color shimmer line */}
                <div className="cert-top-shimmer" style={{ background: `linear-gradient(90deg, ${certColor}, ${certColor}66)` }} />

                {/* Corner glow */}
                <div className="cert-bg-glow" style={{ background: certColor }} />

                {/* Certificate Thumbnail or Icon */}
                {hasImage ? (
                  <div className="cert-thumb-wrap" style={{ borderColor: `${certColor}44` }}>
                    <img
                      src={cert.image}
                      alt={cert.name}
                      className="cert-thumb"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="cert-thumb-overlay">
                      <div className="cert-thumb-overlay-inner">
                        <FiEye className="cert-expand-icon" />
                        <span>View Certificate</span>
                      </div>
                    </div>
                    <div className="cert-thumb-badge" style={{ background: certColor }}>
                      <FiCheckCircle /> {cert.badge || cert.category}
                    </div>
                  </div>
                ) : (
                  <div className="cert-icon-wrapper" style={{ color: certColor, borderColor: `${certColor}55`, background: `${certColor}15` }}>
                    <FiAward className="cert-icon-svg" />
                    <div className="cert-icon-glow" style={{ background: certColor }} />
                  </div>
                )}

                {/* Info */}
                <div className="cert-content">
                  <div className="cert-year-row">
                    <span className="cert-year-tag">
                      <FiCalendar /> {cert.year}
                    </span>
                    <span className="cert-cat-pill" style={{ background: theme.badge, color: theme.text }}>
                      {cert.category}
                    </span>
                  </div>
                  {cert.distinction && (
                    <div className="cert-distinction-tag" style={{ color: certColor, borderColor: `${certColor}44`, background: `${certColor}11` }}>
                      <FiZap style={{ fontSize: '0.7rem' }} /> {cert.distinction}
                    </div>
                  )}
                  <h3 className="cert-name">{cert.name}</h3>
                  <div className="cert-issuer">
                    <FiMapPin style={{ fontSize: '0.75rem', flexShrink: 0 }} />
                    {cert.issuer}
                  </div>
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

      {/* ════════════════════════════════════════════════════
          PREMIUM FULLSCREEN CERTIFICATE VIEWER
      ════════════════════════════════════════════════════ */}
      {viewerCert && (
        <div className="cv-backdrop" onClick={closeViewer}>
          <div className="cv-panel" onClick={e => e.stopPropagation()}>

            {/* ── LEFT: Image Side ── */}
            <div className="cv-image-side">
              {/* Ambient glow behind image */}
              <div className="cv-img-glow" style={{ background: viewerCert.color || '#3B82F6' }} />

              {/* Category ribbon top-left */}
              <div className="cv-ribbon" style={{ background: viewerCert.color || '#3B82F6' }}>
                <FiShield />
                <span>{viewerCert.badge || viewerCert.category}</span>
              </div>

              {/* Counter top-right */}
              <div className="cv-counter">
                {viewerIndex + 1} <span>/</span> {filtered.length}
              </div>

              {/* Main Certificate Image */}
              {viewerCert.image ? (
                <div className="cv-img-frame">
                  <img
                    key={viewerCert.id}
                    src={viewerCert.image}
                    alt={viewerCert.name}
                    className="cv-img"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              ) : (
                <div className="cv-no-img">
                  <FiAward className="cv-no-img-icon" />
                  <p>Digital Certificate</p>
                  <span>No physical scan available</span>
                </div>
              )}

              {/* Prev / Next navigation arrows */}
              {filtered.length > 1 && (
                <>
                  <button className="cv-nav cv-nav-prev" onClick={e => { e.stopPropagation(); navigate(-1) }} aria-label="Previous">
                    <FiChevronLeft />
                  </button>
                  <button className="cv-nav cv-nav-next" onClick={e => { e.stopPropagation(); navigate(1) }} aria-label="Next">
                    <FiChevronRight />
                  </button>
                </>
              )}

              {/* Keyboard hint */}
              <div className="cv-key-hint">
                <span>← → Navigate</span>
                <span className="cv-hint-sep">·</span>
                <span>Esc Close</span>
              </div>
            </div>

            {/* ── RIGHT: Info Side ── */}
            <div className="cv-info-side">
              {/* Accent bar */}
              <div className="cv-accent-bar" style={{ background: `linear-gradient(90deg, ${viewerCert.color || '#3B82F6'}, transparent)` }} />

              {/* Close button */}
              <button className="cv-close" onClick={closeViewer} aria-label="Close">
                <FiX />
              </button>

              {/* Scrollable info */}
              <div className="cv-info-scroll">

                {/* Verified tag */}
                <div className="cv-verified-tag" style={{ color: viewerCert.color, borderColor: `${viewerCert.color}40`, background: `${viewerCert.color}10` }}>
                  <FiCheckCircle />
                  <span>VERIFIED CREDENTIAL</span>
                </div>

                {/* Title */}
                <h2 className="cv-title">{viewerCert.name}</h2>

                {/* Issuer */}
                <p className="cv-issuer">
                  <FiMapPin />
                  {viewerCert.issuer}
                </p>

                {/* Distinction badge */}
                {viewerCert.distinction && (
                  <div className="cv-distinction" style={{ background: `${viewerCert.color}1A`, color: viewerCert.color, borderColor: `${viewerCert.color}40` }}>
                    <FiTrendingUp />
                    <span>{viewerCert.distinction}</span>
                  </div>
                )}

                {/* Divider */}
                <div className="cv-divider" />

                {/* Detail grid */}
                <div className="cv-detail-grid">
                  <div className="cv-detail-card">
                    <div className="cv-detail-icon" style={{ background: `${viewerCert.color}20`, color: viewerCert.color }}>
                      <FiCalendar />
                    </div>
                    <div className="cv-detail-text">
                      <span className="cv-detail-label">Issue Date</span>
                      <span className="cv-detail-val">{viewerCert.year}</span>
                    </div>
                  </div>

                  <div className="cv-detail-card">
                    <div className="cv-detail-icon" style={{ background: 'rgba(16,185,129,0.15)', color: '#10B981' }}>
                      <FiCheckCircle />
                    </div>
                    <div className="cv-detail-text">
                      <span className="cv-detail-label">Status</span>
                      <span className="cv-detail-val cv-status-active">
                        <span className="cv-status-dot" />
                        Active
                      </span>
                    </div>
                  </div>

                  <div className="cv-detail-card">
                    <div className="cv-detail-icon" style={{ background: `${viewerCert.color}20`, color: viewerCert.color }}>
                      <FiLayers />
                    </div>
                    <div className="cv-detail-text">
                      <span className="cv-detail-label">Category</span>
                      <span className="cv-detail-val">{viewerCert.category}</span>
                    </div>
                  </div>

                  <div className="cv-detail-card">
                    <div className="cv-detail-icon" style={{ background: `${viewerCert.color}20`, color: viewerCert.color }}>
                      <FiAward />
                    </div>
                    <div className="cv-detail-text">
                      <span className="cv-detail-label">Type</span>
                      <span className="cv-detail-val">{viewerCert.badge || viewerCert.category}</span>
                    </div>
                  </div>

                  {viewerCert.serialNo && (
                    <div className="cv-detail-card cv-detail-full">
                      <div className="cv-detail-icon" style={{ background: `${viewerCert.color}20`, color: viewerCert.color }}>
                        <FiHash />
                      </div>
                      <div className="cv-detail-text">
                        <span className="cv-detail-label">Serial / Reference No.</span>
                        <span className="cv-detail-val cv-mono">{viewerCert.serialNo}</span>
                      </div>
                    </div>
                  )}

                  <div className="cv-detail-card cv-detail-full">
                    <div className="cv-detail-icon" style={{ background: `${viewerCert.color}20`, color: viewerCert.color }}>
                      <FiUser />
                    </div>
                    <div className="cv-detail-text">
                      <span className="cv-detail-label">Certificate Holder</span>
                      <span className="cv-detail-val">Hassan Abdikadir Adam</span>
                    </div>
                  </div>
                </div>

                {/* Dot navigator */}
                {filtered.length > 1 && (
                  <div className="cv-dot-nav">
                    <span className="cv-dot-label">All Certificates</span>
                    <div className="cv-dots">
                      {filtered.map((_, i) => (
                        <button
                          key={i}
                          className={`cv-dot ${i === viewerIndex ? 'active' : ''}`}
                          style={i === viewerIndex ? { background: viewerCert.color, transform: 'scale(1.4)' } : {}}
                          onClick={() => { setViewerIndex(i); setViewerCert(filtered[i]) }}
                          aria-label={`Certificate ${i + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Action buttons */}
                <div className="cv-actions">
                  {filtered.length > 1 && (
                    <>
                      <button className="cv-btn cv-btn-nav" onClick={() => navigate(-1)}>
                        <FiChevronLeft /> Prev
                      </button>
                      <button className="cv-btn cv-btn-nav" onClick={() => navigate(1)}>
                        Next <FiChevronRight />
                      </button>
                    </>
                  )}
                  <button className="cv-btn cv-btn-close" onClick={closeViewer}>
                    <FiX /> Close
                  </button>
                </div>

              </div>{/* end cv-info-scroll */}
            </div>{/* end cv-info-side */}

          </div>{/* end cv-panel */}
        </div>
      )}
    </section>
  )
}
