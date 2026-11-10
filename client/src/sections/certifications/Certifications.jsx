import React, { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useInView } from 'react-intersection-observer'
import {
  FiAward, FiCheckCircle, FiX, FiShield, FiCalendar,
  FiZap, FiLayers, FiBookOpen, FiCode, FiStar,
  FiChevronLeft, FiChevronRight, FiHash, FiMapPin,
  FiUser, FiTrendingUp, FiEye, FiMaximize2, FiArrowUpRight, FiCheck,
  FiPlay, FiVideo
} from 'react-icons/fi'
import './Certifications.css'
import GraduationVideoModal from '../../components/ui/GraduationVideoModal'

const certCategories = [
  { label: 'All',       icon: <FiLayers /> },
  { label: 'Academic',  icon: <FiBookOpen /> },
  { label: 'Technical', icon: <FiCode /> },
  { label: 'Training',  icon: <FiAward /> },
]

/* ── Hex to RGB helper for CSS dynamic glows ── */
const hexToRgb = (hex) => {
  if (!hex) return '59, 130, 246'
  const c = hex.replace('#', '')
  if (c.length === 6) {
    return `${parseInt(c.slice(0, 2), 16)}, ${parseInt(c.slice(2, 4), 16)}, ${parseInt(c.slice(4, 6), 16)}`
  }
  return '59, 130, 246'
}

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
  const [videoModal, setVideoModal]         = useState(null) // { videoUrl, caption }

  const filtered = certifications.filter(c =>
    activeCategory === 'All' || c.category === activeCategory
  )

  const academicCount  = certifications.filter(c => c.category === 'Academic').length
  const technicalCount = certifications.filter(c => c.category === 'Technical').length
  const trainingCount  = certifications.filter(c => c.category === 'Training').length
  const meritCert      = certifications.find(c => c.videoUrl || c.id === 3)

  /* ── Open fullscreen viewer ── */
  const openViewer = useCallback((cert, idx) => {
    setViewerCert(cert)
    setViewerIndex(idx)
    document.body.style.overflow = 'hidden'
    document.body.classList.add('cv-viewer-open')
  }, [])

  /* ── Close viewer ── */
  const closeViewer = useCallback(() => {
    setViewerCert(null)
    document.body.style.overflow = ''
    document.body.classList.remove('cv-viewer-open')
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

  /* ── Cleanup on unmount ── */
  useEffect(() => {
    return () => {
      document.body.style.overflow = ''
      document.body.classList.remove('cv-viewer-open')
    }
  }, [])

  return (
    <>
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
          <div className="certs-label-wrap">
            <span className="certs-badge-pill">
              <span className="certs-pulse-dot" />
              <span>// VERIFIED.ACADEMIC.CREDENTIALS</span>
            </span>
          </div>

          <h2 className="section-title">
            Certifications &amp; <span className="gradient-text">Mastery Badges</span>
          </h2>

          <p className="certs-subtitle">
            Authenticated academic milestones from Somaliland National Examination Board to{' '}
            <strong className="c-hl-blue">Admas University (Class of 2026)</strong> —{' '}
            <strong className="c-hl-cyan">B.Sc. Software Engineering</strong> graduate honored with{' '}
            <strong className="c-hl-gold">Very Great Distinction</strong>, a top-tier{' '}
            <strong className="c-hl-emerald">Major GPA of 3.96 / 4.0</strong>, 
            and official Presidential Merit Recognition.
          </p>

          {/* Quick Honors Micro-Badges */}
          <div className="certs-header-pills">
            <span className="ch-pill ch-pill-gold">
              <FiAward className="ch-icon" /> Merit Award Winner
            </span>
            <span className="ch-pill ch-pill-emerald">
              <FiStar className="ch-icon" /> Very Great Distinction (3.96 GPA)
            </span>
            <span className="ch-pill ch-pill-cyan">
              <FiShield className="ch-icon" /> B.Sc. Software Engineering
            </span>
            <span className="ch-pill ch-pill-violet">
              <FiCheckCircle className="ch-icon" /> 100% Verified Scans
            </span>
          </div>
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

        {/* ── GRADUATION CEREMONY VIDEO SPOTLIGHT (PREMIUM) ── */}
        <div className={`cert-graduation-spotlight ${inView ? 'visible' : ''}`}>
          <div className="cgs-ambient-glow" />
          
          {/* Left: Video Showcase Player */}
          <div className="cgs-video-col">
            <div className="cgs-player-frame">
              <video
                src="/graduation_moment.mp4"
                className="cgs-video-element"
                controls
                playsInline
                preload="metadata"
              />
              <button
                type="button"
                className="cgs-expand-btn"
                onClick={() => setVideoModal({
                  videoUrl: '/graduation_moment.mp4',
                  caption: 'Hassan Abdikadir Adam receiving the Merit Certificate on stage — Admas University Graduation Ceremony 2026'
                })}
                title="Expand to Fullscreen Cinema Mode"
              >
                <FiMaximize2 />
                <span>Cinema Mode</span>
              </button>
            </div>
            <div className="cgs-video-tagline">
              <span className="cgs-red-pulse" />
              <span>OFFICIAL CEREMONY ARCHIVE • ADMAS UNIVERSITY 2026</span>
            </div>
          </div>

          {/* Right: Milestone Honors & Story */}
          <div className="cgs-info-col">
            <div className="cgs-honor-pills">
              <span className="cgs-pill-gold">
                <FiAward /> Merit Award
              </span>
              <span className="cgs-pill-emerald">
                <FiStar /> Very Great Distinction
              </span>
              <span className="cgs-pill-year">
                Class of 2026
              </span>
            </div>

            <h3 className="cgs-heading">
              Graduation Ceremony &amp; <span className="gradient-text">Stage Moment</span>
            </h3>

            <p className="cgs-description">
              Live footage of <strong>Hassan Abdikadir Adam</strong> receiving the prestigious 
              <strong> Presidential Merit Award</strong> from University President Dr. Molla Tsegay on stage at Admas University — 
              honoring academic brilliance with a <strong>Major GPA of 3.96 / 4.0</strong> in <strong>B.Sc. Software Engineering</strong>.
            </p>

            <div className="cgs-stat-grid">
              <div className="cgs-stat-box">
                <span className="cgs-stat-num" style={{ color: '#10B981' }}>3.96</span>
                <span className="cgs-stat-lbl">Major GPA</span>
              </div>
              <div className="cgs-stat-box">
                <span className="cgs-stat-num" style={{ color: '#06B6D4' }}>3.93</span>
                <span className="cgs-stat-lbl">Cumulative GPA</span>
              </div>
              <div className="cgs-stat-box">
                <span className="cgs-stat-num" style={{ color: '#F59E0B' }}>Top 1%</span>
                <span className="cgs-stat-lbl">Presidential Honor</span>
              </div>
            </div>

            <div className="cgs-cta-group">
              <button
                type="button"
                className="cgs-cinema-cta"
                onClick={() => setVideoModal({
                  videoUrl: '/graduation_moment.mp4',
                  caption: 'Hassan Abdikadir Adam receiving the Merit Certificate on stage — Admas University Graduation Ceremony 2026'
                })}
              >
                <FiPlay className="cgs-play-icon" />
                <span>Watch Full Cinematic Theater</span>
              </button>

              {meritCert && (
                <button
                  type="button"
                  className="cgs-cert-cta"
                  onClick={() => openViewer(meritCert, filtered.indexOf(meritCert) >= 0 ? filtered.indexOf(meritCert) : 0)}
                >
                  <FiAward />
                  <span>Inspect Merit Certificate</span>
                </button>
              )}
            </div>
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
            const certRgb   = hexToRgb(certColor)
            const hasImage  = !!cert.image
            const theme     = categoryTheme(cert.category)

            return (
              <div
                key={cert.id || index}
                className={`cert-card ${inView ? 'visible' : ''} ${hasImage ? 'cert-card-visual' : ''}`}
                style={{
                  '--card-accent': certColor,
                  '--card-accent-rgb': certRgb,
                  transitionDelay: `${(index % 6) * 0.08}s`
                }}
                onClick={() => openViewer(cert, index)}
                data-hover
              >
                {/* Corner ambient glow */}
                <div className="cert-bg-glow" style={{ background: certColor }} />

                {/* Certificate Showcase Media */}
                {hasImage ? (
                  <div className="cert-thumb-wrap">
                    <img
                      src={cert.image}
                      alt={cert.name}
                      className="cert-thumb"
                      loading="lazy"
                      decoding="async"
                    />

                    {/* Holographic scanner sheen on hover */}
                    <div className="cert-thumb-overlay">
                      {cert.videoUrl ? (
                        <div className="cert-thumb-actions">
                          <button
                            type="button"
                            className="cert-inspect-pill cert-video-pill"
                            onClick={(e) => {
                              e.stopPropagation()
                              setVideoModal({ videoUrl: cert.videoUrl, caption: cert.videoCaption })
                            }}
                          >
                            <FiPlay className="cert-expand-icon" />
                            <span>Play Video</span>
                          </button>
                          <div className="cert-inspect-pill">
                            <FiMaximize2 className="cert-expand-icon" />
                            <span>Inspect</span>
                          </div>
                        </div>
                      ) : (
                        <div className="cert-inspect-pill">
                          <FiMaximize2 className="cert-expand-icon" />
                          <span>Inspect Credential</span>
                        </div>
                      )}
                    </div>

                    {/* Floating Luxury Badges */}
                    <div className="cert-floating-badges">
                      <span className="cert-badge-type" style={{ background: `rgba(${certRgb}, 0.85)`, borderColor: certColor }}>
                        <FiShield className="cb-icon" /> {cert.badge || cert.category}
                      </span>
                      <span className="cert-badge-year">
                        <span className="cert-live-dot" />
                        {cert.year}
                      </span>
                      {/* Graduation video badge */}
                      {cert.videoUrl && (
                        <span className="cert-badge-video">
                          <FiPlay className="cb-icon" /> Ceremony
                        </span>
                      )}
                    </div>

                    {/* Bottom Vignette */}
                    <div className="cert-thumb-vignette" />
                  </div>
                ) : (
                  <div className="cert-icon-wrapper" style={{ color: certColor, borderColor: `${certColor}55`, background: `${certColor}15` }}>
                    <FiAward className="cert-icon-svg" />
                    <div className="cert-icon-glow" style={{ background: certColor }} />
                    <div className="cert-floating-badges">
                      <span className="cert-badge-type" style={{ background: `rgba(${certRgb}, 0.85)`, borderColor: certColor }}>
                        <FiShield className="cb-icon" /> {cert.badge || cert.category}
                      </span>
                    </div>
                  </div>
                )}

                {/* Card Main Info */}
                <div className="cert-content">
                  {/* Category Chip & Serial Chip */}
                  <div className="cert-meta-chips">
                    <span className="cert-cat-pill" style={{ background: theme.badge, color: theme.text, borderColor: `${theme.text}44` }}>
                      {cert.category}
                    </span>
                    {cert.serialNo && (
                      <span className="cert-serial-chip" title={cert.serialNo}>
                        <FiHash /> {cert.serialNo.length > 22 ? cert.serialNo.substring(0, 20) + '...' : cert.serialNo}
                      </span>
                    )}
                  </div>

                  {/* Distinction Cyber Banner */}
                  {cert.distinction && (
                    <div
                      className="cert-distinction-banner"
                      style={{
                        background: `linear-gradient(90deg, rgba(${certRgb}, 0.16) 0%, rgba(${certRgb}, 0.04) 100%)`,
                        borderColor: `rgba(${certRgb}, 0.45)`,
                        color: certColor
                      }}
                    >
                      <FiZap className="distinction-bolt" />
                      <span className="distinction-text">{cert.distinction}</span>
                    </div>
                  )}

                  {/* Certificate Title */}
                  <h3 className="cert-name">{cert.name}</h3>

                  {/* Issuer */}
                  <div className="cert-issuer">
                    <FiMapPin className="issuer-pin" />
                    <span>{cert.issuer}</span>
                  </div>
                </div>

                {/* Interactive Action Footer */}
                <div className="cert-card-footer">
                  <div className="cert-status-indicator">
                    <span className="cs-pulse-dot" />
                    <span className="cs-text">Official Credential</span>
                  </div>
                  <div className="cert-footer-actions">
                    {cert.videoUrl && (
                      <button
                        type="button"
                        className="cert-card-video-cta"
                        onClick={(e) => {
                          e.stopPropagation()
                          setVideoModal({ videoUrl: cert.videoUrl, caption: cert.videoCaption })
                        }}
                        title="Watch Graduation Ceremony Video"
                      >
                        <FiPlay />
                        <span>Video</span>
                      </button>
                    )}
                    <div className="cert-cta-btn" style={{ borderColor: `rgba(${certRgb}, 0.45)`, color: certColor }}>
                      <span>Inspect</span>
                      <FiArrowUpRight className="cta-arrow" />
                    </div>
                  </div>
                </div>

                {/* Bottom Laser Scanner Accent */}
                <div className="cert-bottom-scanner" style={{ background: `linear-gradient(90deg, transparent, ${certColor}, transparent)` }} />
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
      {viewerCert && createPortal(
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

                {/* Graduation video CTA — only for Merit Certificate */}
                {viewerCert.videoUrl && (
                  <button
                    className="cv-watch-graduation-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      setVideoModal({ videoUrl: viewerCert.videoUrl, caption: viewerCert.videoCaption })
                    }}
                  >
                    <span className="cv-watch-pulse-dot" />
                    <FiPlay className="cv-watch-icon" />
                    <span className="cv-watch-text">
                      <span className="cv-watch-label">Watch Graduation Ceremony</span>
                      <span className="cv-watch-sub">Stage Moment — Merit Award Presentation</span>
                    </span>
                    <FiVideo className="cv-watch-cam" />
                  </button>
                )}

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
        </div>,
        document.body
      )}

      {/* ── Graduation Video Modal ── */}
      {videoModal && (
        <GraduationVideoModal
          videoUrl={videoModal.videoUrl}
          caption={videoModal.caption}
          onClose={() => setVideoModal(null)}
        />
      )}
    </section>
    </>
  )
}
