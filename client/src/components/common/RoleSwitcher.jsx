import React, { useState, useRef, useEffect } from 'react'
import { FiLayers, FiCode, FiBarChart2, FiCpu, FiChevronDown, FiCheck } from 'react-icons/fi'
import { toast } from 'react-toastify'
import './RoleSwitcher.css'

export default function RoleSwitcher({ activeRole, setRole, lang }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const roles = [
    {
      id: 'all',
      label: lang === 'so' ? 'Dhammaan (All-Rounder)' : 'All-Rounder',
      icon: <FiLayers />,
      desc: lang === 'so' ? 'Muuqaalka guud ee injineernimada & data-da' : 'Full engineering & analytics view'
    },
    {
      id: 'fullstack',
      label: 'FullStack Mode',
      icon: <FiCode />,
      desc: lang === 'so' ? 'Muujinta MERN, Next.js & Web Apps' : 'Highlight MERN, Next.js & Web Apps'
    },
    {
      id: 'data',
      label: 'Data Analyst Mode',
      icon: <FiBarChart2 />,
      desc: lang === 'so' ? 'Xoogga saar Data Analytics & AI' : 'Focus on Data Analytics & AI'
    },
    {
      id: 'architect',
      label: 'Architect Mode',
      icon: <FiCpu />,
      desc: lang === 'so' ? 'Dhismaha Nidaamyada (System Design & Infra)' : 'Prioritize System Design & Infrastructure'
    },
  ]

  const currentRole = roles.find(r => r.id === activeRole) || roles[0]

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelectRole = (roleObj) => {
    setRole(roleObj.id)
    setIsOpen(false)
    const msg = lang === 'so'
      ? `Eegmada HR-ka: Nooca ${roleObj.label} waa la shiday!`
      : `Recruiter Lens: ${roleObj.label} activated!`
    toast.info(msg, { icon: '🔍' })
  }

  return (
    <div className="role-switcher-container" ref={dropdownRef}>
      <button
        className={`role-switcher-trigger ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title={lang === 'so' ? "Baddel Muuqaalka HR-ka" : "Switch Recruiter View Mode"}
        data-hover
      >
        <span className="role-trigger-prefix">
          {lang === 'so' ? 'Muuqaalka HR-ka:' : 'Recruiter View:'}
        </span>
        <span className="role-trigger-value">
          <span className="role-icon">{currentRole.icon}</span>
          <span className="role-label">{currentRole.label}</span>
        </span>
        <FiChevronDown className={`role-trigger-arrow ${isOpen ? 'open' : ''}`} />
      </button>

      {isOpen && (
        <div className="role-dropdown-menu glass-card">
          <div className="role-dropdown-header">
            <span>{lang === 'so' ? 'DOORO NOOCA AQOONTA (LENS)' : 'SELECT RECRUITER LENS'}</span>
          </div>
          <div className="role-dropdown-list">
            {roles.map(r => (
              <button
                key={r.id}
                className={`role-dropdown-item ${activeRole === r.id ? 'selected' : ''}`}
                onClick={() => handleSelectRole(r)}
                data-hover
              >
                <div className="role-item-icon">{r.icon}</div>
                <div className="role-item-info">
                  <div className="role-item-title">{r.label}</div>
                  <div className="role-item-desc">{r.desc}</div>
                </div>
                {activeRole === r.id && <FiCheck className="role-item-check" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

