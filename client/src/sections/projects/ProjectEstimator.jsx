import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { FiLayers, FiCheckSquare, FiClock, FiSend, FiZap } from 'react-icons/fi'
import './ProjectEstimator.css'

const PROJECT_TYPES = [
  { id: 'fullstack', name: 'FullStack MERN Web App', baseWeeks: 3, baseRate: 1200 },
  { id: 'data', name: 'Data Analytics & Dashboard', baseWeeks: 2, baseRate: 900 },
  { id: 'realtime', name: 'Real-Time WebSocket Engine', baseWeeks: 2, baseRate: 850 },
  { id: 'security', name: 'Cyber Security Hardening', baseWeeks: 1, baseRate: 500 }
]

const ADD_ONS = [
  { id: 'auth', name: 'JWT & Multi-Role Auth Suite', weeks: 0.5, rate: 250 },
  { id: 'ai', name: 'OpenAI GPT Integration', weeks: 0.5, rate: 350 },
  { id: 'payment', name: 'Stripe / Payment Gateway', weeks: 0.5, rate: 300 },
  { id: 'admin', name: 'Custom Admin CMS Panel', weeks: 1, rate: 450 }
]

export default function ProjectEstimator() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [selectedType, setSelectedType] = useState(PROJECT_TYPES[0])
  const [selectedAddons, setSelectedAddons] = useState(['auth', 'admin'])

  const toggleAddon = (id) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter(a => a !== id))
    } else {
      setSelectedAddons([...selectedAddons, id])
    }
  }

  const calculateEstimate = () => {
    let weeks = selectedType.baseWeeks
    let budget = selectedType.baseRate

    ADD_ONS.forEach(a => {
      if (selectedAddons.includes(a.id)) {
        weeks += a.weeks
        budget += a.rate
      }
    })

    return { weeks: Math.ceil(weeks), budget }
  }

  const est = calculateEstimate()

  return (
    <section id="project-estimator" className="section estimator-section">
      <div className="container" ref={ref}>
        <div className={`section-header ${inView ? 'visible' : ''}`}>
          <div className="section-label">client.scope_estimator</div>
          <h2 className="section-title">
            Contract Scope & <span className="gradient-text">Project Estimator</span>
          </h2>
          <p className="section-subtitle">
            Calculate instant estimated timeline & budget scope for your custom engineering requirements.
          </p>
        </div>

        <div className={`estimator-grid ${inView ? 'visible' : ''}`}>
          {/* Options Card */}
          <div className="glass-card estimator-card">
            <h4 className="card-mini-title font-code"><FiLayers /> SELECT PROJECT TYPE</h4>
            <div className="type-options-grid">
              {PROJECT_TYPES.map(t => (
                <button
                  key={t.id}
                  className={`type-btn ${selectedType.id === t.id ? 'active' : ''}`}
                  onClick={() => setSelectedType(t)}
                >
                  <span className="type-name">{t.name}</span>
                  <span className="type-base font-code">Est. {t.baseWeeks}wks</span>
                </button>
              ))}
            </div>

            <h4 className="card-mini-title font-code" style={{ marginTop: '20px' }}>SELECT REQUIRED FEATURES</h4>
            <div className="addons-grid">
              {ADD_ONS.map(a => (
                <button
                  key={a.id}
                  className={`addon-btn ${selectedAddons.includes(a.id) ? 'active' : ''}`}
                  onClick={() => toggleAddon(a.id)}
                >
                  <FiCheckSquare className="check-icon" />
                  <span className="addon-name">{a.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Result Estimate Card */}
          <div className="glass-card estimator-card result-est-card">
            <div className="est-hdr font-code">
              <span className="est-tag"><FiZap className="text-amber" /> INSTANT SCOPE ESTIMATE</span>
            </div>

            <div className="est-metrics-row">
              <div className="est-box">
                <span className="est-lbl font-code"><FiClock /> ESTIMATED TIMELINE</span>
                <span className="est-val gradient-text">{est.weeks} Weeks</span>
              </div>
              <div className="est-box">
                <span className="est-lbl font-code">ESTIMATED SCOPE BUDGET</span>
                <span className="est-val text-emerald">${est.budget}</span>
              </div>
            </div>

            <div className="est-summary-box font-code">
              <div>PROJECT: {selectedType.name}</div>
              <div>FEATURES ({selectedAddons.length}): {selectedAddons.join(', ')}</div>
              <div>DELIVERY: Sprint-Based Milestone Releases</div>
            </div>

            <a href="#contact" className="btn-primary request-prop-btn" data-hover>
              <FiSend /> Request Official Proposal
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
