import { useState } from 'react'
import { FiX, FiDownload, FiCheckCircle, FiBriefcase, FiAward, FiCode, FiMail, FiMapPin, FiPhone, FiLayers } from 'react-icons/fi'
import { toast } from 'react-toastify'
import './ResumeModal.css'

export default function ResumeModal({ isOpen, onClose, developer, activeRole: initialRole = 'all' }) {
  const [selectedRole, setSelectedRole] = useState(initialRole === 'all' ? 'fullstack' : initialRole)

  if (!isOpen) return null

  const handlePrint = () => {
    window.print()
  }

  const roleTitles = {
    fullstack: 'FullStack MERN Engineer CV',
    data: 'Data Analyst & Visualization Specialist CV',
    architect: 'System Architect & Real-Time Engineer CV',
    all: 'Principal Software & Solutions Engineer CV'
  }

  const summaries = {
    fullstack: 'FullStack MERN Engineer with 3+ years of experience crafting enterprise-grade React, Node.js, Express, and MongoDB systems with high performance and cyber-security hardening.',
    data: 'Data Analyst & Visualization Specialist proficient in Python (Pandas/NumPy), SQL, Chart.js, and MongoDB aggregation pipelines for automated real-time business telemetry.',
    architect: 'System Architect & Real-Time Engineer specializing in WebSocket microservices (Socket.io), Redis caching, load balancing, rate limiting, and robust cloud API design.'
  }

  const roleCompetencies = {
    fullstack: [
      'React.js (ES6+ / Hooks / Redux Toolkit)',
      'Node.js & Express RESTful API Architecture',
      'MongoDB Document Modeling & Mongoose Schema',
      'TailwindCSS & Luxury UI/UX Design Systems',
      'JWT Authentication & Security Hardening',
      'Git & CI/CD Deployment Pipelines'
    ],
    data: [
      'Python Data Telemetry & ETL Pipelines (Pandas/NumPy)',
      'Data Visualization Dashboards (Chart.js / Canvas)',
      'SQL & PostgreSQL Database Query Optimization',
      'MongoDB Aggregation Framework & Indexing',
      'Statistical Modeling & Anomaly Detection',
      'Automated Report & Metric Exporters'
    ],
    architect: [
      'Socket.io WebSocket Low-Latency Systems',
      'Redis Caching & Distributed Pub/Sub Messaging',
      'Express Rate Limiting, Helmet CSP & Security Hardening',
      'Microservices Communication & WebRTC Integration',
      'Docker Containerization & Linux Server Ops',
      'REST & GraphQL API Gateway Design'
    ]
  }

  const activeSummary = summaries[selectedRole] || summaries.fullstack
  const activeSkills = roleCompetencies[selectedRole] || roleCompetencies.fullstack
  const activeTitle = roleTitles[selectedRole] || roleTitles.fullstack

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="resume-modal-card glass-card" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} data-hover>
          <FiX />
        </button>

        {/* Role Selector Header Bar */}
        <div className="resume-role-selector-bar">
          <span className="role-selector-label font-code"><FiLayers /> SELECT TAILORED RESUME LENS:</span>
          <div className="role-btns-group">
            <button
              className={`role-tab-btn ${selectedRole === 'fullstack' ? 'active' : ''}`}
              onClick={() => setSelectedRole('fullstack')}
            >
              FullStack CV
            </button>
            <button
              className={`role-tab-btn ${selectedRole === 'data' ? 'active' : ''}`}
              onClick={() => setSelectedRole('data')}
            >
              Data Analyst CV
            </button>
            <button
              className={`role-tab-btn ${selectedRole === 'architect' ? 'active' : ''}`}
              onClick={() => setSelectedRole('architect')}
            >
              System Architect CV
            </button>
          </div>
        </div>

        <div className="resume-header">
          <div className="resume-header-top">
            <div>
              <h2 className="resume-title gradient-text">{developer.name}</h2>
              <p className="resume-subtitle">{activeTitle}</p>
              <div className="resume-meta">
                <span><FiMapPin /> {developer.location}</span>
                <span><FiMail /> {developer.email}</span>
                <span><FiPhone /> {developer.phone || '+252 63 6364115'}</span>
              </div>
            </div>
            <div className="resume-actions-group" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <a
                href="/Hassan_Abdikadir_Resume.pdf"
                download="Hassan_Abdikadir_Resume.pdf"
                className="btn-primary resume-export-btn"
                onClick={() => {
                  toast.success('Downloading Hassan Abdikadir Resume (PDF)...')
                }}
                data-hover
                style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <FiDownload /> Download Official PDF CV
              </a>
              <button
                className="btn-outline resume-print-btn"
                onClick={() => {
                  toast.info(`Preparing print/save view for ${activeTitle}...`)
                  handlePrint()
                }}
                data-hover
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <FiFileText /> Print / Save PDF
              </button>
            </div>
          </div>
        </div>

        <div className="resume-body">
          {/* Executive Summary */}
          <div className="resume-section">
            <h3 className="resume-sec-title"><FiCode /> Role-Tailored Executive Summary</h3>
            <p className="resume-text">{activeSummary}</p>
          </div>

          {/* Core Competencies */}
          <div className="resume-section">
            <h3 className="resume-sec-title"><FiAward /> Key Technical Competencies</h3>
            <div className="resume-skills-grid">
              {activeSkills.map((sk, idx) => (
                <span key={idx} className="res-skill"><FiCheckCircle /> {sk}</span>
              ))}
            </div>
          </div>

          {/* Featured Highlights */}
          <div className="resume-section">
            <h3 className="resume-sec-title"><FiBriefcase /> Key Projects & Achievements</h3>
            {selectedRole === 'data' ? (
              <>
                <div className="resume-exp-item">
                  <div className="exp-hdr">
                    <span className="exp-role">Data Analytics & Telemetry Dashboard</span>
                    <span className="exp-date">2023 - 2024</span>
                  </div>
                  <p className="exp-desc">
                    Built Python data pipelines and dynamic Chart.js dashboards processing 2,400+ queries/sec with 97.4% accuracy.
                  </p>
                </div>
                <div className="resume-exp-item">
                  <div className="exp-hdr">
                    <span className="exp-role">AI Technical Mock Interviewer</span>
                    <span className="exp-date">2024</span>
                  </div>
                  <p className="exp-desc">
                    Engineered GPT-4 evaluation metrics and token analytics algorithms for candidate performance scoring.
                  </p>
                </div>
              </>
            ) : selectedRole === 'architect' ? (
              <>
                <div className="resume-exp-item">
                  <div className="exp-hdr">
                    <span className="exp-role">Real-Time WebSocket Messaging Infrastructure</span>
                    <span className="exp-date">2024</span>
                  </div>
                  <p className="exp-desc">
                    Architected sub-25ms Socket.io event broker with Redis pub/sub adapters and end-to-end security suite.
                  </p>
                </div>
                <div className="resume-exp-item">
                  <div className="exp-hdr">
                    <span className="exp-role">FullStack Academy Distributed Platform</span>
                    <span className="exp-date">2024</span>
                  </div>
                  <p className="exp-desc">
                    Designed microservices architecture with MongoDB cluster indexing, rate limiting, and 99.9% uptime.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="resume-exp-item">
                  <div className="exp-hdr">
                    <span className="exp-role">FullStack Academy Digital Education Platform</span>
                    <span className="exp-date">2024</span>
                  </div>
                  <p className="exp-desc">
                    Architected flagship digital education system with AI Mock Interviewer, Socket.io messaging, and JWT authentication suite.
                  </p>
                </div>
                <div className="resume-exp-item">
                  <div className="exp-hdr">
                    <span className="exp-role">E-Commerce MERN Enterprise Store</span>
                    <span className="exp-date">2023</span>
                  </div>
                  <p className="exp-desc">
                    Production MERN store with Stripe checkout integration, inventory management, and Redux Toolkit state management.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

