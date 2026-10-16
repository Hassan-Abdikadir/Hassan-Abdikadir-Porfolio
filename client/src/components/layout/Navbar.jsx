import { useState, useEffect } from 'react'
import { FiVolume2, FiVolumeX, FiUser, FiLogOut, FiMenu, FiX, FiArrowRight, FiChevronDown, FiZap } from 'react-icons/fi'
import ThemeToggle from '../common/ThemeToggle'
import RoleSwitcher from '../common/RoleSwitcher'
import LanguageSwitcher from '../common/LanguageSwitcher'
import ThemePaletteSwitcher from '../common/ThemePaletteSwitcher'
import './Navbar.css'

export default function Navbar({ activeSection, theme, toggleTheme, onOpenResume, soundEnabled, toggleSound, activeRole, setRole, lang, switchLang, t, onOpenAuth, user, isLoggedIn, logout }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#home', label: t?.nav?.home || 'Home' },
    { href: '#about', label: t?.nav?.about || 'About' },
    { href: '#nexus-arcade', label: 'AI & Twin' },
    { href: '#skills', label: t?.nav?.skills || 'Skills' },
    { href: '#projects', label: t?.nav?.projects || 'Projects' },
    { href: '#recruiter-match', label: 'Recruiter AI' },
    { href: '#benchmark-matrix', label: 'ROI Matrix' },
    { href: '#github-activity', label: 'GitHub Activity' },
    { href: '#experience', label: t?.nav?.experience || 'Experience' },
    { href: '#telemetry', label: t?.nav?.telemetry || 'Telemetry' },
    { href: '#blog', label: t?.nav?.insights || 'Insights' },
    { href: '#contact', label: t?.nav?.contact || 'Contact' },
  ]

  const dropdownTools = [
    { href: '#project-estimator', label: '💰 Scope Estimator' },
    { href: '#api-sandbox', label: '⚡ API Sandbox' },
  ]

  const scrollTo = (href) => {
    setMobileOpen(false)
    setToolsDropdownOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
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

            {/* Tools Dropdown for Estimator & API Sandbox */}
            <div
              className="tools-dropdown-wrapper"
              onMouseEnter={() => setToolsDropdownOpen(true)}
              onMouseLeave={() => setToolsDropdownOpen(false)}
            >
              <button
                className={`nav-link tools-dropdown-btn ${dropdownTools.some(t => activeSection === t.href.substring(1)) ? 'active' : ''}`}
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                data-hover
                style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#60A5FA' }}
              >
                <FiZap style={{ color: '#F59E0B' }} /> Tools <FiChevronDown style={{ transition: 'transform 0.2s ease', transform: toolsDropdownOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
              </button>

              {toolsDropdownOpen && (
                <div className="nav-tools-menu glass-card">
                  {dropdownTools.map((tool) => (
                    <button
                      key={tool.href}
                      onClick={() => scrollTo(tool.href)}
                      className={`tool-dropdown-item ${activeSection === tool.href.substring(1) ? 'active' : ''}`}
                    >
                      {tool.label}
                    </button>
                  ))}
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
            <span className="drawer-label">Navigation</span>
            {navLinks.map((link) => (
              <button
                key={link.href}
                className={`mobile-link ${activeSection === link.href.substring(1) ? 'active' : ''}`}
                onClick={() => scrollTo(link.href)}
              >
                {link.label}
              </button>
            ))}
            {dropdownTools.map((tool) => (
              <button
                key={tool.href}
                className={`mobile-link ${activeSection === tool.href.substring(1) ? 'active' : ''}`}
                onClick={() => scrollTo(tool.href)}
              >
                {tool.label}
              </button>
            ))}
          </div>

          <div className="mobile-drawer-section">
            <span className="drawer-label">Preferences & Lens</span>
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
