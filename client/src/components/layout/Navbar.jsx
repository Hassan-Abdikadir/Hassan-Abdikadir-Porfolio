import { useState, useEffect, useRef } from 'react'
import { FiVolume2, FiVolumeX, FiUser, FiLogOut, FiMenu, FiX, FiArrowRight, FiChevronDown, FiZap, FiPlay, FiTerminal, FiTarget } from 'react-icons/fi'
import ThemeToggle from '../common/ThemeToggle'
import RoleSwitcher from '../common/RoleSwitcher'
import LanguageSwitcher from '../common/LanguageSwitcher'
import ThemePaletteSwitcher from '../common/ThemePaletteSwitcher'
import './Navbar.css'

export default function Navbar({ activeSection, theme, toggleTheme, onOpenResume, soundEnabled, toggleSound, activeRole, setRole, lang, switchLang, t, onOpenAuth, onOpenTerminal, onStartTour, user, isLoggedIn, logout }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null) // 'lab' | 'suite' | null
  const hoverTimer = useRef(null)
  const navRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null)
      }
    }
    window.addEventListener('scroll', handleScroll)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const navLinks = [
    { href: '#home', label: t?.nav?.home || 'Home' },
    { href: '#about', label: t?.nav?.about || 'About' },
    { href: '#projects', label: t?.nav?.projects || 'Projects' },
    { href: '#skills', label: t?.nav?.skills || 'Skills' },
    { href: '#experience', label: t?.nav?.experience || 'Experience' },
    { href: '#certifications', label: t?.nav?.certifications || 'Credentials' },
    { href: '#contact', label: t?.nav?.contact || 'Contact' },
  ]

  const labDropdown = [
    { href: '#nexus-arcade', title: '🤖 AI Digital Twin & Arcade', desc: 'Digital twin chat, RPG skills & Web Audio lab' },
    { href: '#code-runner', title: '💻 Live Algorithmic Code Runner', desc: 'Execute Node.js & Python pipelines live' },
    { href: '#api-sandbox', title: '⚡ Interactive API Sandbox', desc: 'Test REST controllers & live payloads' },
    { href: '#terminal', title: '⌨️ Developer CLI Terminal', desc: 'Interactive command-line portfolio shell' },
  ]

  const suiteDropdown = [
    { href: '#recruiter-match', title: '🎯 AI Job-Match Calculator', desc: 'Paste job requirements for instant fit score' },
    { href: '#benchmark-matrix', title: '📊 Candidate ROI Matrix', desc: 'Compare latency, speed & security ROI' },
    { href: '#project-estimator', title: '💰 Project Scope Estimator', desc: 'Instant engineering timeline & quote' },
    { href: '#github-activity', title: '🐙 Live GitHub Telemetry', desc: 'Commit streak & production audit log' },
    { href: '#telemetry', title: '🛰️ Global System HUD', desc: 'Edge node latencies & Web Vitals monitor' },
    { href: '#blog', title: '📝 Engineering Insights', desc: 'Architecture deep-dives & tech papers' },
  ]

  const scrollTo = (href) => {
    setMobileOpen(false)
    setOpenDropdown(null)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const openMenu = (menuKey) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current)
    setOpenDropdown(menuKey)
  }

  const closeMenuDelayed = () => {
    hoverTimer.current = setTimeout(() => setOpenDropdown(null), 140)
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} ref={navRef}>
      {/* Tier 1: Top Utility Bar */}
      <div className="nav-utility-bar">
        <div className="container utility-container">
          <div className="utility-left">
            <span className="status-pill">
              <span className="nav-status-dot" />
              <span className="status-text">
                {lang === 'so' ? 'Diyaar u ah shaqo // FullStack & Data Specialist' : 'Available for Work // FullStack & Data Specialist'}
              </span>
            </span>
          </div>

          <div className="utility-right">
            <RoleSwitcher activeRole={activeRole} setRole={setRole} lang={lang} />
            <LanguageSwitcher lang={lang} switchLang={switchLang} />
            <ThemePaletteSwitcher />
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

            <button
              className="sound-toggle-btn glass-card"
              onClick={toggleSound}
              title={soundEnabled ? "Disable UI Sound FX" : "Enable Cyberpunk UI Sound FX"}
              data-hover
            >
              {soundEnabled ? <FiVolume2 style={{ color: '#10B981' }} /> : <FiVolumeX style={{ color: '#9CA3AF' }} />}
            </button>

            <button
              className="nav-cmd-btn"
              onClick={onOpenTerminal}
              title="Launch Interactive Command Palette (Ctrl+K)"
              data-hover
            >
              <FiTerminal className="ncb-icon" />
              <span>⌘K</span>
            </button>

            <button
              className="nav-tour-btn"
              onClick={onStartTour}
              title="Launch 1-Minute Automated Interactive Showcase Tour"
              data-hover
            >
              <span className="ntb-dot" />
              <FiPlay className="ntb-icon" />
              <span>Auto Tour</span>
            </button>

            {isLoggedIn ? (
              <div className="nav-user-pill glass-card" data-hover>
                <FiUser className="nav-user-icon" />
                <span className="nav-user-name">{user?.name?.split(' ')[0]}</span>
                <button className="nav-logout-btn" onClick={logout} title="Sign Out">
                  <FiLogOut />
                </button>
              </div>
            ) : (
              <button
                className="btn-get-started"
                onClick={() => onOpenAuth('login')}
                data-hover
              >
                <span className="gs-shimmer" />
                <span className="gs-text">
                  {lang === 'so' ? 'Bilow Hadda' : 'Get Started'}
                </span>
                <span className="gs-arrow"><FiArrowRight /></span>
                <span className="gs-particles">
                  <i /><i /><i />
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tier 2: Main Navigation Bar */}
      <div className="nav-main-bar">
        <div className="container nav-container">
          {/* Brand Logo */}
          <div className="nav-logo" onClick={() => scrollTo('#home')} data-hover>
            <div className="logo-icon">
              <div className="logo-ring" />
              <img src="/LOGO.png" alt="Hassan Abdikadir" className="nav-logo-img" />
            </div>
            <div className="logo-text">
              <span className="logo-name ocean-gradient-text">Hassan</span>
              <span className="logo-dot">.dev</span>
            </div>
          </div>

          {/* Center Nav Links */}
          <div className="nav-links">
            {navLinks.map((link) => (
              <button
                key={link.href}
                className={`nav-link ${activeSection === link.href.substring(1) ? 'active' : ''}`}
                onClick={() => scrollTo(link.href)}
                data-hover
              >
                {link.label}
                {activeSection === link.href.substring(1) && (
                  <span className="link-indicator" />
                )}
              </button>
            ))}

            {/* Mega-Dropdown 1: AI & Code Lab */}
            <div
              className="tools-dropdown-wrapper"
              onMouseEnter={() => openMenu('lab')}
              onMouseLeave={closeMenuDelayed}
            >
              <button
                className={`nav-link tools-dropdown-btn ${labDropdown.some(item => activeSection === item.href.substring(1)) ? 'active' : ''}`}
                onClick={() => setOpenDropdown(prev => prev === 'lab' ? null : 'lab')}
                data-hover
              >
                <FiZap style={{ color: '#F59E0B' }} />
                <span>AI &amp; Code Lab</span>
                <FiChevronDown className={`chevron-rot ${openDropdown === 'lab' ? 'open' : ''}`} />
              </button>

              {openDropdown === 'lab' && (
                <div className="nav-tools-menu nav-mega-menu glass-card">
                  <div className="mega-menu-hdr font-code">// INTERACTIVE LAB &amp; SANDBOXES</div>
                  <div className="mega-menu-grid single-col">
                    {labDropdown.map((tool) => (
                      <button
                        key={tool.href}
                        onClick={() => scrollTo(tool.href)}
                        className={`tool-dropdown-item mega-item ${activeSection === tool.href.substring(1) ? 'active' : ''}`}
                      >
                        <span className="mega-item-title">{tool.title}</span>
                        <span className="mega-item-desc">{tool.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Mega-Dropdown 2: Recruiter Suite */}
            <div
              className="tools-dropdown-wrapper"
              onMouseEnter={() => openMenu('suite')}
              onMouseLeave={closeMenuDelayed}
            >
              <button
                className={`nav-link tools-dropdown-btn ${suiteDropdown.some(item => activeSection === item.href.substring(1)) ? 'active' : ''}`}
                onClick={() => setOpenDropdown(prev => prev === 'suite' ? null : 'suite')}
                data-hover
              >
                <FiTarget style={{ color: 'var(--cyan, #06B6D4)' }} />
                <span>Recruiter Suite</span>
                <FiChevronDown className={`chevron-rot ${openDropdown === 'suite' ? 'open' : ''}`} />
              </button>

              {openDropdown === 'suite' && (
                <div className="nav-tools-menu nav-mega-menu nav-mega-wide glass-card">
                  <div className="mega-menu-hdr font-code">// HIRING EVALUATION &amp; TELEMETRY SUITE</div>
                  <div className="mega-menu-grid two-col">
                    {suiteDropdown.map((tool) => (
                      <button
                        key={tool.href}
                        onClick={() => scrollTo(tool.href)}
                        className={`tool-dropdown-item mega-item ${activeSection === tool.href.substring(1) ? 'active' : ''}`}
                      >
                        <span className="mega-item-title">{tool.title}</span>
                        <span className="mega-item-desc">{tool.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Navigation Toggle */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
            data-hover
          >
            {mobileOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="mobile-drawer glass-card">
          <div className="mobile-drawer-section">
            <span className="drawer-label">Core Portfolio</span>
            {navLinks.map((link) => (
              <button
                key={link.href}
                className={`mobile-link ${activeSection === link.href.substring(1) ? 'active' : ''}`}
                onClick={() => scrollTo(link.href)}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="mobile-drawer-section">
            <span className="drawer-label">AI &amp; Code Lab</span>
            {labDropdown.map((tool) => (
              <button
                key={tool.href}
                className={`mobile-link ${activeSection === tool.href.substring(1) ? 'active' : ''}`}
                onClick={() => scrollTo(tool.href)}
              >
                {tool.title}
              </button>
            ))}
          </div>

          <div className="mobile-drawer-section">
            <span className="drawer-label">Recruiter Suite</span>
            {suiteDropdown.map((tool) => (
              <button
                key={tool.href}
                className={`mobile-link ${activeSection === tool.href.substring(1) ? 'active' : ''}`}
                onClick={() => scrollTo(tool.href)}
              >
                {tool.title}
              </button>
            ))}
          </div>

          <div className="mobile-drawer-section">
            <span className="drawer-label">Preferences &amp; Lens</span>
            <RoleSwitcher activeRole={activeRole} setRole={setRole} lang={lang} />
            <div className="mobile-controls-row">
              <ThemePaletteSwitcher />
              <LanguageSwitcher lang={lang} switchLang={switchLang} />
              <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
              <button
                className="sound-toggle-btn glass-card"
                onClick={toggleSound}
                title={soundEnabled ? "Disable UI Sound FX" : "Enable Cyberpunk UI Sound FX"}
              >
                {soundEnabled ? <FiVolume2 style={{ color: '#10B981' }} /> : <FiVolumeX style={{ color: '#9CA3AF' }} />}
              </button>
            </div>
            {!isLoggedIn ? (
              <div className="mobile-auth-row">
                <button
                  className="btn-outline mobile-tour-btn"
                  onClick={() => { setMobileOpen(false); onStartTour(); }}
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px 16px', borderRadius: '14px', width: '100%', marginBottom: '8px', color: '#06B6D4', borderColor: 'rgba(6,182,212,0.4)', background: 'rgba(6,182,212,0.1)' }}
                >
                  <FiPlay />
                  <span>▶ Launch 1-Min Auto Tour</span>
                </button>
                <button
                  className="btn-get-started mobile-gs-btn"
                  onClick={() => { setMobileOpen(false); onOpenAuth('login'); }}
                >
                  <span className="gs-shimmer" />
                  <span className="gs-text">{lang === 'so' ? 'Bilow Hadda' : 'Get Started'}</span>
                  <span className="gs-arrow"><FiArrowRight /></span>
                </button>
              </div>
            ) : (
              <button className="btn-logout mobile-auth-btn" onClick={logout}>
                <FiLogOut /> Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
