import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { FiCpu, FiCheckCircle, FiZap, FiBriefcase, FiSend, FiAward, FiPieChart, FiStar, FiRefreshCw } from 'react-icons/fi'
import './RecruiterMatch.css'

const SAMPLE_JDS = [
  {
    title: 'Senior FullStack MERN Engineer',
    desc: 'We are seeking a FullStack MERN Developer proficient in React.js, Node.js, Express, MongoDB, RESTful APIs, JWT Auth, Redux, and Git to build scalable web applications.'
  },
  {
    title: 'Data Analyst & Visualization Specialist',
    desc: 'Looking for a Data Analyst with strong Python, Pandas, SQL, Chart.js, and interactive dashboard engineering skills to generate real-time business telemetry.'
  },
  {
    title: 'Lead System Architect & Real-Time Engineer',
    desc: 'Seeking an Engineer with expertise in WebSocket (Socket.io), System Architecture, Redis, Security Hardening, Rate Limiting, and Cloud APIs.'
  }
]

export default function RecruiterMatch({ t, lang }) {
  const [jobTitle, setJobTitle] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [matchResult, setMatchResult] = useState(null)
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  const runSkillMatcher = (titleInput, descInput) => {
    const text = (titleInput + ' ' + descInput).toLowerCase()
    
    const candidateSkills = [
      { name: 'React.js', category: 'Frontend', weight: 15 },
      { name: 'Node.js', category: 'Backend', weight: 15 },
      { name: 'MongoDB / Mongoose', category: 'Database', weight: 12 },
      { name: 'Express.js', category: 'Backend', weight: 12 },
      { name: 'JavaScript (ES6+)', category: 'Frontend', weight: 10 },
      { name: 'Python & Pandas', category: 'Data & AI', weight: 10 },
      { name: 'RESTful API Architecture', category: 'Backend', weight: 8 },
      { name: 'Socket.io / WebSockets', category: 'Real-Time', weight: 8 },
      { name: 'TailwindCSS / Glassmorphism', category: 'UI/UX', weight: 5 },
      { name: 'JWT & Security Hardening', category: 'Security', weight: 5 },
      { name: 'SQL & PostgreSQL', category: 'Data', weight: 5 }
    ]

    let matched = []
    let totalMatchedWeight = 0
    
    // Check keyword matches
    candidateSkills.forEach(skill => {
      const keywords = skill.name.toLowerCase().split(/[\s\/]+/)
      const isMatched = keywords.some(kw => kw.length > 2 && text.includes(kw)) || text.length === 0
      
      if (isMatched) {
        matched.push(skill)
        totalMatchedWeight += skill.weight
      }
    })

    // Calculate score
    let baseScore = text.trim().length > 0 ? Math.min(99, Math.max(78, totalMatchedWeight + 25)) : 96
    
    // Bonus highlights based on text content
    const bonusFeatures = []
    if (text.includes('real-time') || text.includes('socket') || text.includes('chat')) {
      bonusFeatures.push('Socket.io Real-Time Engine Expert')
    }
    if (text.includes('data') || text.includes('python') || text.includes('analytics') || text.includes('dashboard')) {
      bonusFeatures.push('Python Telemetry & Data Visualization Master')
    }
    if (text.includes('security') || text.includes('auth') || text.includes('jwt')) {
      bonusFeatures.push('Cyber-Security Hardening & JWT Specialist')
    }
    if (bonusFeatures.length === 0) {
      bonusFeatures.push('FullStack MERN Architecture Specialist', 'Cyber-Premium UI/UX Engineer')
    }

    return {
      score: baseScore,
      matchedSkills: matched,
      bonusFeatures,
      estimatedOnboarding: 'Instant (< 3 Days)',
      riskLevel: 'Zero Risk (Strong Production Portfolio)',
      recommendation: baseScore >= 85 ? 'Strong Match — Exceptional Technical Candidate' : 'Solid Match — High Versatility'
    }
  }

  const handleAnalyze = (e) => {
    if (e) e.preventDefault()
    setAnalyzing(true)
    setMatchResult(null)

    setTimeout(() => {
      const result = runSkillMatcher(jobTitle, jobDescription)
      setMatchResult(result)
      setAnalyzing(false)
    }, 900)
  }

  const handleSelectSample = (sample) => {
    setJobTitle(sample.title)
    setJobDescription(sample.desc)
    setAnalyzing(true)
    setTimeout(() => {
      const result = runSkillMatcher(sample.title, sample.desc)
      setMatchResult(result)
      setAnalyzing(false)
    }, 700)
  }

  return (
    <section id="recruiter-match" className="section recruiter-match-section">
      <div className="grid-bg" />
      <div className="container" ref={ref}>
        <div className={`section-header ${inView ? 'visible' : ''}`}>
          <div className="section-label">// AI RECRUITER ROI & JOB-MATCH CALCULATOR</div>
          <h2 className="section-title">
            Paste Your Job Requirements — <span className="gradient-text">Instant Fit Score</span>
          </h2>
          <p className="section-subtitle">
            Evaluate how Hassan Abdikadir&apos;s technical skill set aligns with your team&apos;s open engineering roles in real-time.
          </p>
        </div>

        {/* Preset Sample Buttons */}
        <div className={`sample-jd-bar ${inView ? 'visible' : ''}`}>
          <span className="sample-label font-code"><FiStar /> Quick Preset Roles:</span>
          {SAMPLE_JDS.map((s, idx) => (
            <button
              key={idx}
              className="sample-badge-btn"
              onClick={() => handleSelectSample(s)}
              data-hover
            >
              <FiBriefcase /> {s.title}
            </button>
          ))}
        </div>

        <div className="match-grid">
          {/* Input Form */}
          <div className={`glass-card match-card input-card ${inView ? 'visible' : ''}`}>
            <div className="card-header-bar">
              <span className="card-tag font-code"><FiCpu /> RECRUITER_INPUT_PARSER</span>
              <span className="live-status"><span className="pulse-dot" /> AI Parser Ready</span>
            </div>

            <form onSubmit={handleAnalyze} className="match-form">
              <div className="form-group">
                <label className="input-label">Job Title / Target Role</label>
                <input
                  type="text"
                  placeholder="e.g. Senior FullStack Developer / Data Engineer"
                  value={jobTitle}
                  onChange={e => setJobTitle(e.target.value)}
                  className="cyber-input"
                />
              </div>

              <div className="form-group">
                <label className="input-label">Job Description / Required Tech Stack</label>
                <textarea
                  rows="4"
                  placeholder="Paste job description keywords (e.g. React, Node.js, MongoDB, Python, Express, REST APIs, Security)..."
                  value={jobDescription}
                  onChange={e => setJobDescription(e.target.value)}
                  className="cyber-textarea"
                />
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  disabled={analyzing}
                  className="btn-primary calculate-btn"
                  data-hover
                >
                  {analyzing ? (
                    <>
                      <FiRefreshCw className="spin-icon" /> Analyzing Requirements...
                    </>
                  ) : (
                    <>
                      <FiZap /> Run Match Analysis
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Match Score Display */}
          <div className={`glass-card match-card result-card ${inView ? 'visible' : ''}`}>
            {analyzing ? (
              <div className="analyzing-state">
                <div className="pulse-circle">
                  <FiCpu className="spin-icon text-cyan" />
                </div>
                <h4 className="font-code">Matching Engineering Competencies...</h4>
                <p>Comparing stack compatibility, architecture experience, and domain history.</p>
              </div>
            ) : matchResult ? (
              <div className="result-content">
                <div className="score-top">
                  <div className="score-badge">
                    <div className="score-number gradient-text">{matchResult.score}%</div>
                    <div className="score-label font-code">CANDIDATE FIT MATCH</div>
                  </div>
                  <div className="score-meta font-code">
                    <div className="rec-text"><FiAward className="text-amber" /> {matchResult.recommendation}</div>
                    <div className="onboard-text"><FiZap className="text-cyan" /> Onboarding: {matchResult.estimatedOnboarding}</div>
                  </div>
                </div>

                <div className="matched-skills-section">
                  <h4 className="section-mini-title font-code">// MATCHED CORE COMPETENCIES ({matchResult.matchedSkills.length})</h4>
                  <div className="matched-chips">
                    {matchResult.matchedSkills.map(s => (
                      <span key={s.name} className="matched-chip">
                        <FiCheckCircle className="check-icon" /> {s.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bonus-highlights-section">
                  <h4 className="section-mini-title font-code">// VALUE-ADD HIGHLIGHTS</h4>
                  <ul className="bonus-list">
                    {matchResult.bonusFeatures.map((b, i) => (
                      <li key={i}><FiPieChart className="text-blue" /> {b}</li>
                    ))}
                  </ul>
                </div>

                <div className="result-cta-row">
                  <a href="#contact" className="btn-primary hire-cta-btn" data-hover>
                    <FiSend /> Contact Hassan Immediately
                  </a>
                </div>
              </div>
            ) : (
              <div className="empty-state">
                <FiStar className="empty-icon text-blue" />
                <h4>Ready for Evaluation</h4>
                <p>Click any quick role above or paste a Job Description to calculate technical compatibility and candidate ROI.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
