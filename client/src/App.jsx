import { useState, useEffect, useRef } from 'react'
import Navbar from './components/layout/Navbar'
import Hero from './sections/hero/Hero'
import About from './sections/about/About'
import Skills from './sections/skills/Skills'
import Projects from './sections/projects/Projects'
import Experience from './sections/experience/Experience'
import Certifications from './sections/certifications/Certifications'
import Testimonials from './sections/testimonials/Testimonials'
import NexusArcadeSection from './sections/nexus/NexusArcadeSection'
import RecruiterMatch from './sections/dev-suite/RecruiterMatch'
import BenchmarkMatrix from './sections/dev-suite/BenchmarkMatrix'
import GitHubActivityWidget from './sections/dev-suite/GitHubActivityWidget'
import ProjectEstimator from './sections/projects/ProjectEstimator'
import APIPlayground from './sections/dev-suite/APIPlayground'
import SystemTelemetry from './sections/dev-suite/SystemTelemetry'
import CodePlayground from './sections/dev-suite/CodePlayground'
import Blog from './sections/blog/Blog'
import Terminal from './sections/terminal/Terminal'
import Contact from './sections/contact/Contact'
import Footer from './components/layout/Footer'

import ResumeModal from './components/ui/ResumeModal'
import AIChatbot from './components/ui/AIChatbot'
import AuthModal from './features/auth/AuthModal'
import AdminModal from './features/auth/AdminModal'
import TerminalOverlay from './sections/terminal/TerminalOverlay'
import ScrollProgress from './components/layout/ScrollProgress'
import { useAuth } from './features/auth/useAuth'

import { usePortfolioData } from './hooks/usePortfolioData'
import { useTheme } from './hooks/useTheme'
import { useSoundFX } from './hooks/useSoundFX'
import { useLanguage } from './hooks/useLanguage'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './styles/globals.css'
import './styles/app.css'

function App() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)
  const [activeSection, setActiveSection] = useState('home')
  const [resumeOpen, setResumeOpen] = useState(false)
  const [adminOpen, setAdminOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const [terminalOverlayOpen, setTerminalOverlayOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [activeRole, setActiveRole] = useState('all')

  const { user, logout, isLoggedIn } = useAuth()

  const { theme, toggleTheme } = useTheme()
  const { soundEnabled, toggleSound, playHoverSound, playClickSound } = useSoundFX()
  const { lang, switchLang, t } = useLanguage()
  const { developer, projects, skills, experiences, certifications, testimonials, metrics, articles } = usePortfolioData()

  // Filter skills and projects based on Active Recruiter Role Mode
  const filteredProjects = projects.filter(p => {
    if (activeRole === 'fullstack') return p.category === 'FullStack App' || p.flagship
    if (activeRole === 'data') return p.category === 'Data & AI'
    if (activeRole === 'architect') return p.category === 'System' || p.flagship
    return true
  })

  const filteredSkills = skills.filter(s => {
    if (activeRole === 'fullstack') return s.category === 'Frontend' || s.category === 'Backend'
    if (activeRole === 'data') return s.category === 'Data & Analytics'
    if (activeRole === 'architect') return s.category === 'Backend' || s.category === 'DevOps & Tools'
    return true
  })

  useEffect(() => {
    window.scrollTo(0, 0)
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setTerminalOverlayOpen(prev => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    if (!cursor || !follower) return

    let mouseX = -100, mouseY = -100
    let followerX = -100, followerY = -100
    let animId = null

    const moveCursor = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`
    }

    const animateFollower = () => {
      followerX += (mouseX - followerX) * 0.22
      followerY += (mouseY - followerY) * 0.22
      follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) translate(-50%, -50%)`
      animId = requestAnimationFrame(animateFollower)
    }

    const handleOver = (e) => {
      if (e.target.closest && e.target.closest('a, button, [data-hover], input, textarea, select')) {
        cursor.classList.add('active')
        follower.classList.add('active')
        playHoverSound()
      }
    }

    const handleOut = (e) => {
      if (e.target.closest && e.target.closest('a, button, [data-hover], input, textarea, select')) {
        cursor.classList.remove('active')
        follower.classList.remove('active')
      }
    }

    const handleClick = (e) => {
      if (e.target.closest && e.target.closest('a, button, [data-hover]')) {
        playClickSound()
      }
    }

    window.addEventListener('mousemove', moveCursor, { passive: true })
    document.addEventListener('mouseover', handleOver, { passive: true })
    document.addEventListener('mouseout', handleOut, { passive: true })
    document.addEventListener('click', handleClick, { passive: true })
    animId = requestAnimationFrame(animateFollower)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseover', handleOver)
      document.removeEventListener('mouseout', handleOut)
      document.removeEventListener('click', handleClick)
      if (animId) cancelAnimationFrame(animId)
    }
  }, [playHoverSound, playClickSound])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.2 }
    )
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <ScrollProgress />
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-follower" ref={followerRef} />
      <div className="scan-line" />

      <Navbar
        activeSection={activeSection}
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenResume={() => setResumeOpen(true)}
        soundEnabled={soundEnabled}
        toggleSound={toggleSound}
        activeRole={activeRole}
        setRole={setActiveRole}
        lang={lang}
        switchLang={switchLang}
        t={t}
        onOpenAuth={(mode) => { setAuthMode(mode || 'login'); setAuthOpen(true); }}
        onOpenTerminal={() => setTerminalOverlayOpen(true)}
        user={user}
        isLoggedIn={isLoggedIn}
        logout={logout}
      />

      <main>
        <Hero
          developer={developer}
          metrics={metrics}
          onOpenResume={() => setResumeOpen(true)}
          t={t}
          lang={lang}
        />
        <About developer={developer} t={t} lang={lang} />
        <NexusArcadeSection />
        <Skills skills={filteredSkills} t={t} lang={lang} />
        <Projects projects={filteredProjects} t={t} lang={lang} />
        <RecruiterMatch t={t} lang={lang} />
        <BenchmarkMatrix />
        <GitHubActivityWidget />
        <ProjectEstimator />
        <Experience experiences={experiences} t={t} lang={lang} />
        <Certifications certifications={certifications} t={t} lang={lang} />
        <Testimonials testimonials={testimonials} t={t} lang={lang} />
        <APIPlayground t={t} lang={lang} />
        <SystemTelemetry t={t} lang={lang} />
        <CodePlayground t={t} lang={lang} />
        <Blog articles={articles} t={t} lang={lang} />
        <Terminal developer={developer} t={t} lang={lang} />
        <Contact developer={developer} t={t} lang={lang} />
      </main>

      <Footer developer={developer} onOpenAdmin={() => setAdminOpen(true)} />

      <TerminalOverlay isOpen={terminalOverlayOpen} onClose={() => setTerminalOverlayOpen(false)} />
      <AIChatbot developer={developer} />

      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
        developer={developer}
        activeRole={activeRole}
      />

      <AdminModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
      />

      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        initialMode={authMode}
      />

      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        theme="dark"
        toastStyle={{
          background: 'rgba(17,24,39,0.95)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(59,130,246,0.3)',
          color: '#F9FAFB',
          fontFamily: 'Plus Jakarta Sans, sans-serif'
        }}
      />
    </>
  )
}

export default App
