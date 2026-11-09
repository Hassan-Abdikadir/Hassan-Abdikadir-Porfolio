import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import {
  FiLayers, FiClock, FiSend, FiZap,
  FiShield, FiBarChart2, FiRadio, FiCpu,
  FiCheck, FiTerminal, FiAward,
  FiBox, FiCode
} from 'react-icons/fi'
import './ProjectEstimator.css'

const PROJECT_TYPES = [
  {
    id: 'fullstack',
    name: 'FullStack MERN Web App',
    desc: 'React.js, Node.js, Express, MongoDB & scalable REST API architecture',
    icon: <FiLayers />,
    baseWeeks: 3,
    baseRate: 1200,
    tag: 'FLAGSHIP'
  },
  {
    id: 'data',
    name: 'Data Analytics & Dashboard',
    desc: 'Python automated ETL pipelines, Pandas analytics & live BI telemetry HUD',
    icon: <FiBarChart2 />,
    baseWeeks: 2,
    baseRate: 900,
    tag: 'ANALYTICS'
  },
  {
    id: 'realtime',
    name: 'Real-Time WebSocket Engine',
    desc: 'Bi-directional Socket.io event broker, Redis pub/sub & <25ms sync',
    icon: <FiRadio />,
    baseWeeks: 2,
    baseRate: 850,
    tag: 'REAL-TIME'
  },
  {
    id: 'ai',
    name: 'AI Agent & LLM Integration',
    desc: 'Gemini/OpenAI API integration, vector RAG, function calling & live chat',
    icon: <FiCpu />,
    baseWeeks: 2,
    baseRate: 950,
    tag: 'AI/LLM'
  },
  {
    id: 'security',
    name: 'Cyber Security Hardening',
    desc: 'OWASP top-10 defense, JWT/RBAC auth, Helmet, rate-limit & audit testing',
    icon: <FiShield />,
    baseWeeks: 1,
    baseRate: 500,
    tag: 'SECURITY'
  }
]

const FEATURE_ADDONS = [
  {
    id: 'auth',
    name: 'JWT & Multi-Role Auth Suite',
    desc: 'Secure sessions, bcrypt, refresh tokens & role guards',
    weeks: 0.5,
    rate: 250,
    icon: <FiShield />
  },
  {
    id: 'ai_copilot',
    name: 'Smart AI Copilot / Chatbot',
    desc: 'Context-aware AI assistance with streaming responses',
    weeks: 0.5,
    rate: 350,
    icon: <FiCpu />
  },
  {
    id: 'payment',
    name: 'Stripe & Payment Gateway',
    desc: 'Checkout sessions, webhooks, subscription tiers & billing',
    weeks: 0.5,
    rate: 300,
    icon: <FiZap />
  },
  {
    id: 'admin',
    name: 'Custom Admin Analytics CMS',
    desc: 'CRUD data management, user controls & activity metrics',
    weeks: 1,
    rate: 450,
    icon: <FiBarChart2 />
  },
  {
    id: 'realtime_hub',
    name: 'Live Notification & Event Hub',
    desc: 'Instant push notifications & presence tracking',
    weeks: 0.5,
    rate: 280,
    icon: <FiRadio />
  },
  {
    id: 'devops',
    name: 'Docker & CI/CD Pipeline',
    desc: 'Multi-stage Dockerfile, GitHub Actions & cloud deploy',
    weeks: 0.5,
    rate: 220,
    icon: <FiBox />
  }
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

    FEATURE_ADDONS.forEach(a => {
      if (selectedAddons.includes(a.id)) {
        weeks += a.weeks
        budget += a.rate
      }
    })

    return { weeks: Math.ceil(weeks), budget }
  }

  const est = calculateEstimate()

  // Generate mailto link with pre-populated project scope
  const selectedAddonNames = FEATURE_ADDONS
    .filter(a => selectedAddons.includes(a.id))
    .map(a => a.name)
    .join(', ')

  const proposalSubject = encodeURIComponent(`Project Proposal: ${selectedType.name}`)
  const proposalBody = encodeURIComponent(
    `Hi Hassan,\n\nI used your Contract Scope & Project Estimator:\n\n` +
    `• Project Architecture: ${selectedType.name}\n` +
    `• Selected Modules (${selectedAddons.length}): ${selectedAddonNames || 'None'}\n` +
    `• Estimated Timeline: ${est.weeks} Weeks\n` +
    `• Estimated Scope Budget: $${est.budget}\n\n` +
    `Let's discuss starting this project.\n`
  )
  const mailtoLink = `mailto:hassanabdikadir.dev@gmail.com?subject=${proposalSubject}&body=${proposalBody}`

  return (
    <section id="project-estimator" className="section estimator-section">
      <div className="container" ref={ref}>

        {/* ── Section Header ── */}
        <div className={`section-header ${inView ? 'visible' : ''}`}>
          <div className="section-label">client.scope_calculator</div>
          <h2 className="section-title">
            Contract Scope &amp; <span className="gradient-text">Project Estimator</span>
          </h2>
          <p className="section-subtitle">
            Calculate instant estimated engineering timeline &amp; transparent budget scope for your custom software deliverables.
          </p>
        </div>

        {/* ── Main Estimator Chassis ── */}
        <div className={`estimator-chassis glass-card ${inView ? 'visible' : ''}`}>

          {/* Top HUD Terminal Bar */}
          <div className="est-hud-top font-code">
            <div className="est-hud-left">
              <span className="est-beacon-dot" />
              <span className="est-hud-title">
                <FiTerminal className="text-cyan" /> SCOPE_ESTIMATOR_v3.4 // ARCHITECTURE CALCULATOR
              </span>
            </div>
            <div className="est-hud-right">
              <span className="est-badge-guarantee">
                <FiAward className="text-amber" /> 100% FIXED SCOPE GUARANTEE
              </span>
            </div>
          </div>

          <div className="estimator-content-grid">

            {/* ── Left Column: Configuration ── */}
            <div className="estimator-config-col">

              {/* Step 1: Project Architecture */}
              <div className="config-block">
                <div className="config-header font-code">
                  <span className="step-num">01</span>
                  <span className="step-label">SELECT ARCHITECTURE TYPE</span>
                </div>

                <div className="project-types-grid">
                  {PROJECT_TYPES.map(t => {
                    const isSelected = selectedType.id === t.id
                    return (
                      <div
                        key={t.id}
                        className={`type-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => setSelectedType(t)}
                        data-hover
                      >
                        <div className="type-card-top">
                          <div className="type-card-icon">
                            {t.icon}
                          </div>
                          <span className="type-tag font-code">{t.tag}</span>
                        </div>

                        <div className="type-card-body">
                          <h4 className="type-title">{t.name}</h4>
                          <p className="type-desc">{t.desc}</p>
                        </div>

                        <div className="type-card-footer font-code">
                          <span className="type-time">
                            <FiClock className="time-icon" /> Est. {t.baseWeeks} wks
                          </span>
                          <span className="type-price">
                            From ${t.baseRate}
                          </span>
                        </div>

                        {isSelected && (
                          <div className="type-active-indicator">
                            <FiCheck />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Step 2: Add-on Modules */}
              <div className="config-block" style={{ marginTop: '28px' }}>
                <div className="config-header font-code">
                  <span className="step-num">02</span>
                  <span className="step-label">SELECT REQUIRED MODULES &amp; CAPABILITIES</span>
                </div>

                <div className="addons-grid">
                  {FEATURE_ADDONS.map(a => {
                    const isChecked = selectedAddons.includes(a.id)
                    return (
                      <div
                        key={a.id}
                        className={`addon-chip ${isChecked ? 'active' : ''}`}
                        onClick={() => toggleAddon(a.id)}
                        data-hover
                      >
                        <div className="addon-checkbox">
                          {isChecked ? <FiCheck className="chk-icon" /> : null}
                        </div>

                        <div className="addon-info">
                          <div className="addon-title-row">
                            <span className="addon-title">{a.name}</span>
                            <span className="addon-cost font-code">+${a.rate}</span>
                          </div>
                          <p className="addon-sub">{a.desc}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

            </div>

            {/* ── Right Column: Quotation Summary HUD ── */}
            <div className="estimator-quotation-col">
              <div className="quotation-card">

                <div className="quotation-header font-code">
                  <span className="quotation-badge">
                    <FiZap className="text-amber" /> INSTANT EXECUTIVE QUOTE
                  </span>
                  <span className="quotation-live-tag">LIVE SYNC</span>
                </div>

                {/* Primary Metrics: Timeline & Budget */}
                <div className="quotation-metrics-grid">
                  <div className="qm-box qm-timeline">
                    <div className="qm-label font-code">
                      <FiClock /> ESTIMATED TIMELINE
                    </div>
                    <div className="qm-value font-code">
                      <span className="qm-num gradient-text">{est.weeks}</span>
                      <span className="qm-unit">Weeks</span>
                    </div>
                    <div className="qm-sub font-code">Sprint-based delivery</div>
                  </div>

                  <div className="qm-box qm-budget">
                    <div className="qm-label font-code">
                      <FiZap /> ESTIMATED SCOPE
                    </div>
                    <div className="qm-value font-code">
                      <span className="qm-dollar text-emerald">$</span>
                      <span className="qm-num text-emerald">{est.budget}</span>
                    </div>
                    <div className="qm-sub font-code">Fixed milestone billing</div>
                  </div>
                </div>

                {/* Deliverables Breakdown Console */}
                <div className="quotation-console font-code">
                  <div className="qc-title">// DELIVERABLE ARCHITECTURE SPEC</div>

                  <div className="qc-row">
                    <span className="qc-key">BASE:</span>
                    <span className="qc-val text-cyan">{selectedType.name}</span>
                  </div>

                  <div className="qc-row">
                    <span className="qc-key">MODULES ({selectedAddons.length}):</span>
                    <span className="qc-val text-emerald">
                      {selectedAddons.length > 0 ? selectedAddons.join(', ') : 'Base architecture only'}
                    </span>
                  </div>

                  <div className="qc-row">
                    <span className="qc-key">DEV CYCLE:</span>
                    <span className="qc-val">{est.weeks} Bi-weekly Sprints</span>
                  </div>

                  <div className="qc-divider" />

                  <div className="qc-perks">
                    <div className="qc-perk-item">
                      <FiCheck className="text-emerald" /> 100% Full Source IP Transfer
                    </div>
                    <div className="qc-perk-item">
                      <FiCheck className="text-emerald" /> GitHub Repo &amp; CI/CD Pipelines
                    </div>
                    <div className="qc-perk-item">
                      <FiCheck className="text-emerald" /> 30-Day Post-Launch SLA Warranty
                    </div>
                  </div>
                </div>

                {/* CTA Action */}
                <div className="quotation-actions">
                  <a
                    href={mailtoLink}
                    className="proposal-cta-btn font-code"
                    data-hover
                  >
                    <FiSend className="btn-send-icon" />
                    <span>Request Official Proposal</span>
                  </a>

                  <a
                    href="#contact"
                    className="proposal-discuss-btn font-code"
                  >
                    <FiCode />
                    <span>Or Book Architecture Call</span>
                  </a>
                </div>

                <div className="quotation-guarantee font-code">
                  <FiShield className="text-emerald" />
                  <span>Transparent milestone payments · No hidden costs</span>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
