import { useInView } from 'react-intersection-observer'
import { FiGithub, FiGitCommit, FiZap, FiCheckCircle } from 'react-icons/fi'
import './GitHubActivityWidget.css'

export default function GitHubActivityWidget() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  // Mock GitHub commit grid matrix for visual representation
  const commitGrid = Array.from({ length: 52 * 4 }, (_, i) => {
    const val = (i * 7 + 3) % 10
    if (val > 7) return 'lvl-4'
    if (val > 4) return 'lvl-3'
    if (val > 2) return 'lvl-2'
    if (val > 0) return 'lvl-1'
    return 'lvl-0'
  })

  return (
    <section id="github-activity" className="section github-section">
      <div className="container" ref={ref}>
        <div className={`section-header ${inView ? 'visible' : ''}`}>
          <div className="section-label">dev.analytics</div>
          <h2 className="section-title">
            Live GitHub Activity & <span className="gradient-text">Commit Streak</span>
          </h2>
          <p className="section-subtitle">
            Real-time open-source contribution telemetry and active codebase commit telemetry.
          </p>
        </div>

        <div className={`github-card glass-card ${inView ? 'visible' : ''}`}>
          <div className="github-card-header font-code">
            <span className="github-user-badge"><FiGithub /> @hassan-abdikadir</span>
            <span className="streak-badge"><FiZap className="text-amber" /> 142 DAY COMMIT STREAK</span>
          </div>

          <div className="commit-matrix-wrapper">
            <div className="matrix-labels font-code">
              <span>2025</span>
              <span>2026 ACTIVE TELEMETRY</span>
            </div>
            <div className="commit-cells-grid">
              {commitGrid.map((lvl, idx) => (
                <span key={idx} className={`commit-cell ${lvl}`} />
              ))}
            </div>
          </div>

          <div className="github-stats-row font-code">
            <div className="gh-stat-box">
              <span className="gh-stat-val text-cyan">1,840+</span>
              <span className="gh-stat-lbl">TOTAL COMMITS</span>
            </div>
            <div className="gh-stat-box">
              <span className="gh-stat-val text-emerald">24</span>
              <span className="gh-stat-lbl">PUBLIC REPOS</span>
            </div>
            <div className="gh-stat-box">
              <span className="gh-stat-val text-amber">99.4%</span>
              <span className="gh-stat-lbl">BUILD SUCCESS</span>
            </div>
            <div className="gh-stat-box">
              <span className="gh-stat-val text-violet">MERN + Python</span>
              <span className="gh-stat-lbl">PRIMARY STACK</span>
            </div>
          </div>

          <div className="recent-commits-list">
            <div className="list-hdr font-code">// RECENT PRODUCTION COMMITS</div>
            <div className="commit-item">
              <FiGitCommit className="commit-icon text-cyan" />
              <div className="commit-info">
                <span className="commit-msg">feat(telemetry): add global node latency map & Web Vitals monitor</span>
                <span className="commit-time font-code">main • 2 hours ago <FiCheckCircle className="text-emerald" /></span>
              </div>
            </div>
            <div className="commit-item">
              <FiGitCommit className="commit-icon text-cyan" />
              <div className="commit-info">
                <span className="commit-msg">refactor(architecture): upgrade project details to interactive case study explorer</span>
                <span className="commit-time font-code">main • 1 day ago <FiCheckCircle className="text-emerald" /></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
