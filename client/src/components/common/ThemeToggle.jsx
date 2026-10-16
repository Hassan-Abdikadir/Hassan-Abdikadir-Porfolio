import React from 'react'
import { FiSun, FiMoon, FiZap } from 'react-icons/fi'
import './ThemeToggle.css'

export default function ThemeToggle({ theme, toggleTheme }) {
  return (
    <div className="theme-toggle-container glass-card">
      <button
        className={`theme-btn ${theme === 'dark-cyber' ? 'active' : ''}`}
        onClick={() => toggleTheme('dark-cyber')}
        title="Dark Cyber Theme"
        data-hover
      >
        <FiMoon /> Cyber
      </button>
      <button
        className={`theme-btn ${theme === 'neon-glow' ? 'active' : ''}`}
        onClick={() => toggleTheme('neon-glow')}
        title="Neon Glow Theme"
        data-hover
      >
        <FiZap /> Neon
      </button>
      <button
        className={`theme-btn ${theme === 'midnight-glass' ? 'active' : ''}`}
        onClick={() => toggleTheme('midnight-glass')}
        title="Midnight Glass Theme"
        data-hover
      >
        <FiSun /> Midnight
      </button>
    </div>
  )
}
