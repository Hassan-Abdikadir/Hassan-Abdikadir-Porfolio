import React, { useState, useEffect, useRef, useCallback } from 'react'
import {
  FiPlay, FiPause, FiChevronRight, FiChevronLeft,
  FiX, FiAward, FiCode, FiActivity, FiZap,
  FiCheckCircle, FiVolume2, FiMaximize2
} from 'react-icons/fi'
import './AutoDemoTour.css'

const TOUR_STEPS = [
  {
    id: 'home',
    sectionId: 'home',
    tag: '01 / 07 • VISION & ARCHITECTURE',
    title: 'Hassan Abdikadir Adam — Software Engineer & Data Specialist',
    desc: 'Admas University B.Sc. Software Engineering graduate with Very Great Distinction (Major GPA 3.96 / 4.0). Specializing in MERN architectures, distributed systems, and telemetry.',
    duration: 8,
  },
  {
    id: 'code-runner',
    sectionId: 'code-runner',
    tag: '02 / 07 • ALGORITHMIC EXECUTION',
    title: 'Live Server-Side Algorithmic Code Runner',
    desc: 'Execute Hassan’s actual production logic live in the browser — testing Node.js Socket.io real-time broadcast and Python data aggregation.',
    duration: 9,
    action: () => {
      // Auto-trigger Run Code button after 1s
      setTimeout(() => {
        const btn = document.querySelector('.cpr-btn-run, .run-code-btn')
        if (btn) btn.click()
      }, 1200)
    }
  },
  {
    id: 'benchmark-matrix',
    sectionId: 'benchmark-matrix',
    tag: '03 / 07 • ENGINEERING ROI',
    title: 'Candidate vs. Industry Benchmark Matrix',
    desc: 'Transparent engineering telemetry: 18ms latency vs 350ms average, under 3-day production onboarding speed, and 100% cyber-hardened security architecture.',
    duration: 8,
  },
  {
    id: 'project-estimator',
    sectionId: 'project-estimator',
    tag: '04 / 07 • SCOPE & BUDGET',
    title: 'Instant Scope & Project Budget Estimator',
    desc: 'Interactive scope calculator giving clients instant timeline estimation, milestone breakdown, and official proposal requests on demand.',
    duration: 8,
  },
  {
    id: 'certifications',
    sectionId: 'certifications',
    tag: '05 / 07 • ACADEMIC HONORS & STAGE CEREMONY',
    title: 'Admas University Graduation & Presidential Merit Award',
    desc: 'Watch the live stage moment as University President Dr. Molla Tsegay confers the Presidential Merit Award for graduating with Very Great Distinction (GPA 3.96 / 4.0).',
    duration: 10,
  },
  {
    id: 'github-activity',
    sectionId: 'github-activity',
    tag: '06 / 07 • VERIFIED CODE TELEMETRY',
    title: '142-Day Commit Streak & Open Source Activity',
    desc: 'Over 1,840 verified commits across 24 public repositories with 99.4% build success rate, reflecting disciplined continuous shipping.',
    duration: 8,
  },
  {
    id: 'contact',
    sectionId: 'contact',
    tag: '07 / 07 • FINALE — WORK TOGETHER',
    title: 'Ready for High-Impact Engineering Roles',
    desc: 'Open for global software engineering opportunities, enterprise fullstack development, and data architecture contracts.',
    duration: 8,
  }
]

export default function AutoDemoTour({ onClose }) {
  const [stepIndex, setStepIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress]   = useState(0)
  const timerRef                  = useRef(null)
  const tickRef                   = useRef(null)
  const stepStartTimeRef          = useRef(Date.now())

  const currentStep = TOUR_STEPS[stepIndex]

  /* ── Scroll smoothly to the current section ── */
  const scrollToStep = useCallback((idx) => {
    const step = TOUR_STEPS[idx]
    if (!step) return

    const el = document.getElementById(step.sectionId)
    if (el) {
      const navOffset = 90
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = el.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - navOffset

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      })

      // Add temporary spotlight class
      document.querySelectorAll('.tour-highlight-aura').forEach(e => e.classList.remove('tour-highlight-aura'))
      el.classList.add('tour-highlight-aura')
    }

    // Run custom step action if defined
    if (typeof step.action === 'function') {
      try { step.action() } catch (e) { /* ignore */ }
    }
  }, [])

  /* ── Go to step ── */
  const goToStep = useCallback((idx) => {
    const newIdx = Math.max(0, Math.min(idx, TOUR_STEPS.length - 1))
    setStepIndex(newIdx)
    setProgress(0)
    stepStartTimeRef.current = Date.now()
    scrollToStep(newIdx)
  }, [scrollToStep])

  const nextStep = useCallback(() => {
    if (stepIndex < TOUR_STEPS.length - 1) {
      goToStep(stepIndex + 1)
    } else {
      // Tour completed
      onClose()
    }
  }, [stepIndex, goToStep, onClose])

  const prevStep = useCallback(() => {
    if (stepIndex > 0) {
      goToStep(stepIndex - 1)
    }
  }, [stepIndex, goToStep])

  /* ── Timer tick for progress bar ── */
  useEffect(() => {
    if (!isPlaying) return

    stepStartTimeRef.current = Date.now() - (progress / 100) * (currentStep.duration * 1000)

    tickRef.current = setInterval(() => {
      const elapsed = Date.now() - stepStartTimeRef.current
      const total = currentStep.duration * 1000
      const pct = Math.min(100, (elapsed / total) * 100)
      setProgress(pct)

      if (pct >= 100) {
        clearInterval(tickRef.current)
        nextStep()
      }
    }, 50)

    return () => clearInterval(tickRef.current)
  }, [stepIndex, isPlaying, currentStep.duration, nextStep])

  /* ── Initial scroll on mount ── */
  useEffect(() => {
    scrollToStep(0)
    return () => {
      document.querySelectorAll('.tour-highlight-aura').forEach(e => e.classList.remove('tour-highlight-aura'))
    }
  }, [scrollToStep])

  /* ── Keyboard shortcuts ── */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === ' ') {
        e.preventDefault()
        setIsPlaying(p => !p)
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        nextStep()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prevStep()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [nextStep, prevStep, onClose])

  return (
    <div className="adt-hud-wrapper">
      {/* Dim ambient backdrop aura */}
      <div className="adt-backdrop-tint" />

      {/* Main Director Control HUD */}
      <div className="adt-hud-card">
        {/* Top telemetry scanner */}
        <div className="adt-scanner-track">
          <div
            className="adt-scanner-progress"
            style={{ width: `${((stepIndex + (progress / 100)) / TOUR_STEPS.length) * 100}%` }}
          />
        </div>

        {/* Header Bar */}
        <div className="adt-hud-header">
          <div className="adt-hud-left">
            <span className="adt-rec-badge">
              <span className="adt-rec-dot" />
              <span>LIVE SHOWCASE TOUR</span>
            </span>
            <span className="adt-step-counter">
              STEP {stepIndex + 1} OF {TOUR_STEPS.length}
            </span>
          </div>

          <div className="adt-hud-actions">
            <button
              className="adt-btn-toggle"
              onClick={() => setIsPlaying(p => !p)}
              title={isPlaying ? "Pause Tour (Space)" : "Resume Tour (Space)"}
            >
              {isPlaying ? <FiPause /> : <FiPlay />}
              <span>{isPlaying ? 'PAUSE' : 'RESUME'}</span>
            </button>
            <button
              className="adt-btn-close"
              onClick={onClose}
              title="Exit Tour (Esc)"
            >
              <FiX />
              <span>EXIT TOUR</span>
            </button>
          </div>
        </div>

        {/* Narrative Content */}
        <div className="adt-hud-body">
          <div className="adt-tag-row">
            <span className="adt-tag-pill">{currentStep.tag}</span>
            <span className="adt-step-timer">
              {Math.ceil(currentStep.duration * (1 - progress / 100))}s remaining
            </span>
          </div>

          <h3 className="adt-step-title">{currentStep.title}</h3>
          <p className="adt-step-desc">{currentStep.desc}</p>
        </div>

        {/* Bottom Nav Controller */}
        <div className="adt-hud-footer">
          <button
            className="adt-nav-btn"
            onClick={prevStep}
            disabled={stepIndex === 0}
            title="Previous Step (Left Arrow)"
          >
            <FiChevronLeft /> <span>PREV</span>
          </button>

          {/* Dots Indicator */}
          <div className="adt-dots-row">
            {TOUR_STEPS.map((step, idx) => (
              <button
                key={step.id}
                className={`adt-dot ${idx === stepIndex ? 'active' : ''} ${idx < stepIndex ? 'completed' : ''}`}
                onClick={() => goToStep(idx)}
                title={`Jump to: ${step.title}`}
              >
                {idx === stepIndex && (
                  <span
                    className="adt-dot-progress"
                    style={{ width: `${progress}%` }}
                  />
                )}
              </button>
            ))}
          </div>

          <button
            className="adt-nav-btn adt-nav-btn-next"
            onClick={nextStep}
            title="Next Step (Right Arrow)"
          >
            <span>{stepIndex === TOUR_STEPS.length - 1 ? 'FINISH' : 'NEXT'}</span>
            <FiChevronRight />
          </button>
        </div>
      </div>
    </div>
  )
}
