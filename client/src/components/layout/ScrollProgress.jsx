import { useEffect, useState } from 'react'
import './ScrollProgress.css'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0
      setProgress(pct)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActiveSection(e.target.id)
        })
      },
      { threshold: 0.4 }
    )
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Top Progress Bar */}
      <div className="scroll-progress-bar">
        <div
          className="scroll-progress-fill"
          style={{ width: `${progress}%` }}
        />
        <span className="scroll-pct-badge">{progress}%</span>
      </div>

      {/* Side Section Indicator */}
      <div className="side-section-indicator">
        {['home', 'about', 'skills', 'projects', 'experience', 'api-sandbox', 'telemetry', 'code-runner', 'blog', 'terminal', 'contact'].map(id => (
          <div
            key={id}
            className={`side-dot ${activeSection === id ? 'active' : ''}`}
            title={id}
            onClick={() => {
              const el = document.getElementById(id)
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
          />
        ))}
      </div>
    </>
  )
}
