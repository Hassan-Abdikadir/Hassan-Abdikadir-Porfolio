import { useState, useEffect, useRef } from 'react'
import { FiEye, FiCheck } from 'react-icons/fi'
import './ThemePaletteSwitcher.css'

const PALETTES = [
  { id: 'cyan', name: 'Cyber Cyan', primary: '#06B6D4', rgb: '6, 182, 212', glow: 'rgba(6, 182, 212, 0.4)', grad: 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)' },
  { id: 'emerald', name: 'Matrix Emerald', primary: '#10B981', rgb: '16, 185, 129', glow: 'rgba(16, 185, 129, 0.4)', grad: 'linear-gradient(135deg, #10B981 0%, #06B6D4 100%)' },
  { id: 'violet', name: 'Neon Violet', primary: '#8B5CF6', rgb: '139, 92, 246', glow: 'rgba(139, 92, 246, 0.4)', grad: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)' },
  { id: 'amber', name: 'Sunset Amber', primary: '#F59E0B', rgb: '245, 158, 11', glow: 'rgba(245, 158, 11, 0.4)', grad: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)' },
  { id: 'crimson', name: 'Crimson Red', primary: '#EF4444', rgb: '239, 68, 68', glow: 'rgba(239, 68, 68, 0.4)', grad: 'linear-gradient(135deg, #EF4444 0%, #8B5CF6 100%)' }
]

const applyPaletteVars = (p) => {
  if (!p) return
  const root = document.documentElement.style
  root.setProperty('--cyan', p.primary)
  root.setProperty('--cyan-rgb', p.rgb)
  root.setProperty('--blue', p.primary)
  root.setProperty('--border-glow', p.glow)
  root.setProperty('--shadow-blue', `0 0 25px ${p.glow}`)
  root.setProperty('--grad-hero', p.grad)
  root.setProperty('--grad-btn', p.grad)
}

export default function ThemePaletteSwitcher() {
  const [activePalette, setActivePalette] = useState(() => {
    return localStorage.getItem('hassan_portfolio_palette') || 'cyan'
  })
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef(null)

  useEffect(() => {
    const saved = PALETTES.find(p => p.id === activePalette) || PALETTES[0]
    applyPaletteVars(saved)
  }, [activePalette])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const applyPalette = (p) => {
    setActivePalette(p.id)
    applyPaletteVars(p)
    localStorage.setItem('hassan_portfolio_palette', p.id)
  }

  return (
    <div className="palette-switcher-wrapper" ref={wrapperRef}>
      <button
        className="palette-toggle-btn glass-card"
        onClick={() => setOpen(!open)}
        title="Customize Accent Glow Color Matrix"
        data-hover
      >
        <FiEye style={{ color: PALETTES.find(p => p.id === activePalette)?.primary || '#06B6D4' }} />
      </button>

      {open && (
        <div className="palette-dropdown-menu glass-card">
          <div className="palette-title font-code">// ACCENT MATRIX GLOW</div>
          <div className="palette-options-list">
            {PALETTES.map(p => (
              <button
                key={p.id}
                className={`palette-opt-btn ${activePalette === p.id ? 'active' : ''}`}
                onClick={() => { applyPalette(p); setOpen(false); }}
              >
                <span className="palette-color-swatch" style={{ background: p.primary, boxShadow: `0 0 8px ${p.primary}` }} />
                <span className="palette-opt-name">{p.name}</span>
                {activePalette === p.id && <FiCheck className="check-icon" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
