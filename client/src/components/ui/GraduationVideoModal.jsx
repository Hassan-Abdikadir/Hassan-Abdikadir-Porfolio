import React, { useEffect, useRef, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import {
  FiX, FiPlay, FiPause, FiMaximize2, FiMinimize2,
  FiVolume2, FiVolumeX, FiAward, FiStar, FiTrendingUp,
  FiShield, FiCalendar, FiUser
} from 'react-icons/fi'
import './GraduationVideoModal.css'

export default function GraduationVideoModal({ videoUrl, caption, onClose }) {
  const videoRef      = useRef(null)
  const containerRef  = useRef(null)
  const [playing,    setPlaying]    = useState(false)
  const [muted,      setMuted]      = useState(false)
  const [progress,   setProgress]   = useState(0)
  const [duration,   setDuration]   = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [fullscreen, setFullscreen]  = useState(false)
  const [showCtrls,  setShowCtrls]  = useState(true)
  const ctrlsTimer = useRef(null)

  /* ── Lock scroll & navbar ── */
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    document.body.classList.add('cv-viewer-open')
    return () => {
      document.body.style.overflow = ''
      document.body.classList.remove('cv-viewer-open')
    }
  }, [])

  /* ── Escape to close ── */
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  /* ── Video event handlers ── */
  const handleTimeUpdate = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    setProgress((v.currentTime / v.duration) * 100 || 0)
    setCurrentTime(v.currentTime)
  }, [])

  const handleLoadedMetadata = useCallback(() => {
    if (videoRef.current) setDuration(videoRef.current.duration)
  }, [])

  const togglePlay = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) { v.play(); setPlaying(true) }
    else          { v.pause(); setPlaying(false) }
  }, [])

  const toggleMute = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }, [])

  const handleSeek = useCallback((e) => {
    const v = videoRef.current
    if (!v) return
    const rect = e.currentTarget.getBoundingClientRect()
    const pct  = (e.clientX - rect.left) / rect.width
    v.currentTime = pct * v.duration
  }, [])

  const toggleFullscreen = useCallback(() => {
    const el = containerRef.current
    if (!document.fullscreenElement) {
      el?.requestFullscreen?.()
      setFullscreen(true)
    } else {
      document.exitFullscreen?.()
      setFullscreen(false)
    }
  }, [])

  /* ── Auto-hide controls ── */
  const showControls = useCallback(() => {
    setShowCtrls(true)
    clearTimeout(ctrlsTimer.current)
    ctrlsTimer.current = setTimeout(() => {
      if (playing) setShowCtrls(false)
    }, 3000)
  }, [playing])

  /* ── Format time ── */
  const fmt = (s) => {
    if (!s || isNaN(s)) return '0:00'
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  return createPortal(
    <div className="gvm-backdrop" onClick={onClose}>
      <div
        className="gvm-container"
        ref={containerRef}
        onClick={e => e.stopPropagation()}
        onMouseMove={showControls}
      >

        {/* ══ TOP HEADER BAR ══ */}
        <div className="gvm-header">
          <div className="gvm-header-left">
            <div className="gvm-ceremony-pill">
              <span className="gvm-ceremony-dot" />
              <span>LIVE CEREMONY RECORDING</span>
            </div>
            <span className="gvm-header-title">Admas University — Graduation 2026</span>
          </div>
          <button className="gvm-close-btn" onClick={onClose} aria-label="Close">
            <FiX />
          </button>
        </div>

        {/* ══ MAIN CONTENT ══ */}
        <div className="gvm-main">

          {/* ── LEFT: Video Player ── */}
          <div className="gvm-player-wrap">
            {/* Scanner top accent */}
            <div className="gvm-scanner-line" />

            {/* Video element */}
            <video
              ref={videoRef}
              src={videoUrl}
              className="gvm-video"
              onClick={togglePlay}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
              playsInline
            />

            {/* Cinematic letterbox bars */}
            <div className="gvm-letterbox-top" />
            <div className="gvm-letterbox-bottom" />

            {/* Centre Play Button (shown when paused) */}
            {!playing && (
              <div className="gvm-center-play" onClick={togglePlay}>
                <div className="gvm-play-ring">
                  <FiPlay className="gvm-play-icon" />
                </div>
                <span className="gvm-play-label">PLAY CEREMONY</span>
              </div>
            )}

            {/* Video Controls overlay */}
            <div className={`gvm-controls ${showCtrls ? 'visible' : ''}`}>
              {/* Progress bar */}
              <div className="gvm-progress-wrap">
                <div
                  className="gvm-progress-track"
                  onClick={handleSeek}
                >
                  <div className="gvm-progress-fill" style={{ width: `${progress}%` }} />
                  <div className="gvm-progress-thumb" style={{ left: `${progress}%` }} />
                </div>
                <div className="gvm-time-display">
                  <span>{fmt(currentTime)}</span>
                  <span className="gvm-time-sep">/</span>
                  <span>{fmt(duration)}</span>
                </div>
              </div>

              {/* Control buttons */}
              <div className="gvm-ctrl-row">
                <div className="gvm-ctrl-left">
                  <button className="gvm-ctrl-btn" onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'}>
                    {playing ? <FiPause /> : <FiPlay />}
                  </button>
                  <button className="gvm-ctrl-btn" onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'}>
                    {muted ? <FiVolumeX /> : <FiVolume2 />}
                  </button>
                  <span className="gvm-ctrl-label">Hassan Abdikadir Adam</span>
                </div>
                <div className="gvm-ctrl-right">
                  <button className="gvm-ctrl-btn" onClick={toggleFullscreen} aria-label="Fullscreen">
                    {fullscreen ? <FiMinimize2 /> : <FiMaximize2 />}
                  </button>
                </div>
              </div>
            </div>

            {/* Caption bar */}
            {caption && (
              <div className="gvm-caption">
                <span className="gvm-caption-icon">🎓</span>
                <span>{caption}</span>
              </div>
            )}
          </div>

          {/* ── RIGHT: Credentials Info Panel ── */}
          <div className="gvm-info-panel">

            {/* Glow orbs */}
            <div className="gvm-orb gvm-orb-a" />
            <div className="gvm-orb gvm-orb-b" />

            {/* Panel header */}
            <div className="gvm-panel-header">
              <div className="gvm-panel-tag">
                <FiShield />
                <span>VERIFIED ACHIEVEMENT</span>
              </div>
              <h2 className="gvm-panel-title">
                Stage <span className="gvm-gold-text">Moment</span>
              </h2>
              <p className="gvm-panel-sub">Presidential Merit Award Ceremony</p>
            </div>

            {/* GPA / Distinction hero stat */}
            <div className="gvm-hero-stat">
              <div className="gvm-gpa-badge">
                <FiTrendingUp />
                <div className="gvm-gpa-inner">
                  <span className="gvm-gpa-val">3.96</span>
                  <span className="gvm-gpa-unit">/ 4.0</span>
                </div>
                <span className="gvm-gpa-label">MAJOR GPA</span>
              </div>
              <div className="gvm-distinction-badge">
                <FiStar className="gvm-star" />
                <span>Very Great Distinction</span>
              </div>
            </div>

            {/* Detail cards */}
            <div className="gvm-detail-list">
              <div className="gvm-detail-row">
                <div className="gvm-detail-icon gvm-icon-gold">
                  <FiAward />
                </div>
                <div className="gvm-detail-text">
                  <span className="gvm-detail-label">Award</span>
                  <span className="gvm-detail-val">Merit Certificate — Presidential Honor</span>
                </div>
              </div>

              <div className="gvm-detail-row">
                <div className="gvm-detail-icon gvm-icon-emerald">
                  <FiUser />
                </div>
                <div className="gvm-detail-text">
                  <span className="gvm-detail-label">Graduate</span>
                  <span className="gvm-detail-val">Hassan Abdikadir Adam</span>
                </div>
              </div>

              <div className="gvm-detail-row">
                <div className="gvm-detail-icon gvm-icon-cyan">
                  <FiShield />
                </div>
                <div className="gvm-detail-text">
                  <span className="gvm-detail-label">Degree</span>
                  <span className="gvm-detail-val">B.Sc. Software Engineering</span>
                </div>
              </div>

              <div className="gvm-detail-row">
                <div className="gvm-detail-icon gvm-icon-violet">
                  <FiCalendar />
                </div>
                <div className="gvm-detail-text">
                  <span className="gvm-detail-label">Institution</span>
                  <span className="gvm-detail-val">Admas University — Hargeisa, Somaliland</span>
                </div>
              </div>

              <div className="gvm-detail-row">
                <div className="gvm-detail-icon gvm-icon-gold">
                  <FiStar />
                </div>
                <div className="gvm-detail-text">
                  <span className="gvm-detail-label">Signed By</span>
                  <span className="gvm-detail-val">Molla Tsegay (PhD) — University President</span>
                </div>
              </div>

              <div className="gvm-detail-row">
                <div className="gvm-detail-icon gvm-icon-emerald">
                  <FiCalendar />
                </div>
                <div className="gvm-detail-text">
                  <span className="gvm-detail-label">Ceremony Year</span>
                  <span className="gvm-detail-val">2026 Graduation Class</span>
                </div>
              </div>
            </div>

            {/* Bottom quote */}
            <div className="gvm-quote-block">
              <div className="gvm-quote-line" />
              <p className="gvm-quote">
                "Awarded for outstanding academic achievement — top percentile of the 2026 graduating class."
              </p>
              <div className="gvm-quote-line" />
            </div>

            {/* Cumulative stats */}
            <div className="gvm-cum-stats">
              <div className="gvm-cum-item">
                <span className="gvm-cum-val" style={{ color: '#10B981' }}>3.96</span>
                <span className="gvm-cum-label">Major GPA</span>
              </div>
              <div className="gvm-cum-divider" />
              <div className="gvm-cum-item">
                <span className="gvm-cum-val" style={{ color: '#06B6D4' }}>3.93</span>
                <span className="gvm-cum-label">Cumulative GPA</span>
              </div>
              <div className="gvm-cum-divider" />
              <div className="gvm-cum-item">
                <span className="gvm-cum-val" style={{ color: '#F59E0B' }}>2026</span>
                <span className="gvm-cum-label">Class Year</span>
              </div>
            </div>

          </div>{/* end gvm-info-panel */}
        </div>{/* end gvm-main */}

        {/* Bottom scanner line */}
        <div className="gvm-bottom-scanner" />
      </div>
    </div>,
    document.body
  )
}
