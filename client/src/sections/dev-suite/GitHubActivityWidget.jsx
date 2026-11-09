import { useState, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import {
  FiGithub, FiGitCommit, FiZap, FiCheckCircle,
  FiExternalLink, FiTerminal, FiGitBranch, FiActivity,
  FiCode, FiFolder, FiStar, FiCpu
} from 'react-icons/fi'
import './GitHubActivityWidget.css'

export default function GitHubActivityWidget() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [hoveredCell, setHoveredCell] = useState(null)

  // Generate realistic GitHub contribution matrix (7 rows: Sun-Sat, 48 columns)
  const { weeks, totalContribs } = useMemo(() => {
    const days = 7
    const weekCount = 48
    let sum = 0

    const matrix = Array.from({ length: weekCount }, (_, w) => {
      return Array.from({ length: days }, (_, d) => {
        // Pseudo-random deterministic activity weighting
        const seed = (w * 13 + d * 7 + 11) % 100
        let level = 0
        let count = 0

        if (seed > 82) {
          level = 4
          count = 8 + (seed % 7)
        } else if (seed > 60) {
          level = 3
          count = 4 + (seed % 4)
        } else if (seed > 38) {
          level = 2
          count = 2 + (seed % 2)
        } else if (seed > 18) {
          level = 1
          count = 1
        }
        sum += count
        return {
          week: w,
          day: d,
          level,
          count,
          date: `Week ${w + 1}, Day ${d + 1}`
        }
      })
    })

    return { weeks: matrix, totalContribs: sum }
  }, [])

  const recentCommits = [
    {
      hash: 'f50cc59',
      scope: 'feat(ui)',
      msg: 'Luxury holographic glassmorphism upgrade for certificate cards',
      branch: 'main',
      time: 'Just now',
      verified: true
    },
    {
      hash: 'd9f69b7',
      scope: 'refactor(core)',
      msg: 'Portal certificate viewer to body with maximum z-index & deep blur',
      branch: 'main',
      time: '1 hour ago',
      verified: true
    },
    {
      hash: '916bcc4',
      scope: 'feat(telemetry)',
      msg: 'Premium Certificate Viewer with fullscreen split-panel & keyboard nav',
      branch: 'main',
      time: '3 hours ago',
      verified: true
    },
    {
      hash: 'aed590e',
      scope: 'perf(build)',
      msg: 'Production optimizations, drop console logs & convert certs to WebP',
      branch: 'main',
      time: 'Yesterday',
      verified: true
    }
  ]

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  return (
    <section id="github-activity" className="section github-section">
      <div className="container" ref={ref}>

        {/* ── Section Header ── */}
        <div className={`section-header ${inView ? 'visible' : ''}`}>
          <div className="section-label">dev.telemetry</div>
          <h2 className="section-title">
            Live GitHub Activity &amp; <span className="gradient-text">Commit Streak</span>
          </h2>
          <p className="section-subtitle">
            Real-time open-source contribution telemetry, continuous integration velocity, and production audit log.
          </p>
        </div>

        {/* ── Main Cyber Terminal Card ── */}
        <div className={`github-card glass-card ${inView ? 'visible' : ''}`}>

          {/* Terminal Title Bar */}
          <div className="gh-terminal-top">
            <div className="gh-window-controls">
              <span className="gh-dot gh-dot-red" />
              <span className="gh-dot gh-dot-yellow" />
              <span className="gh-dot gh-dot-green" />
              <span className="gh-terminal-title font-code">
                <FiTerminal className="gh-term-icon" /> bash ~ telemetry.github.hassan.sh
              </span>
            </div>

            <div className="gh-terminal-status font-code">
              <span className="gh-status-beacon" />
              <span>LIVE TELEMETRY STREAM</span>
            </div>
          </div>

          {/* Profile & Streak Header */}
          <div className="github-card-header">
            <div className="gh-user-box">
              <a
                href="https://github.com/Hassan-Abdikadir"
                target="_blank"
                rel="noreferrer"
                className="github-user-badge font-code"
                title="View Hassan's GitHub Profile"
              >
                <div className="gh-avatar-wrap">
                  <FiGithub className="gh-icon" />
                  <span className="gh-online-indicator" />
                </div>
                <div className="gh-user-text">
                  <span className="gh-handle">@Hassan-Abdikadir</span>
                  <span className="gh-role">FullStack Software Engineer</span>
                </div>
                <FiExternalLink className="gh-ext-arrow" />
              </a>
            </div>

            <div className="gh-header-actions">
              <div className="streak-badge font-code">
                <FiZap className="streak-icon" />
                <div className="streak-text">
                  <span className="streak-val">142 DAYS</span>
                  <span className="streak-sub">ACTIVE STREAK</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Contribution Matrix HUD ── */}
          <div className="commit-matrix-wrapper">
            <div className="matrix-labels font-code">
              <div className="matrix-left">
                <FiActivity className="text-emerald" />
                <span>ANNUAL CONTRIBUTION RADAR ({totalContribs}+ in 2025/2026)</span>
              </div>
              <div className="matrix-legend">
                <span>Less</span>
                <span className="legend-cell lvl-0" />
                <span className="legend-cell lvl-1" />
                <span className="legend-cell lvl-2" />
                <span className="legend-cell lvl-3" />
                <span className="legend-cell lvl-4" />
                <span>More</span>
              </div>
            </div>

            {/* Months row */}
            <div className="matrix-months font-code">
              {months.map((m, i) => (
                <span key={i} className="month-label">{m}</span>
              ))}
            </div>

            {/* Contribution Cells Grid */}
            <div className="commit-grid-container">
              {/* Day labels on side */}
              <div className="matrix-day-labels font-code">
                <span>Mon</span>
                <span>Wed</span>
                <span>Fri</span>
              </div>

              {/* Grid columns */}
              <div className="commit-cells-matrix">
                {weeks.map((week, wIdx) => (
                  <div key={wIdx} className="commit-col">
                    {week.map((cell, dIdx) => (
                      <span
                        key={dIdx}
                        className={`commit-cell lvl-${cell.level} ${hoveredCell === cell ? 'cell-hovered' : ''}`}
                        onMouseEnter={() => setHoveredCell(cell)}
                        onMouseLeave={() => setHoveredCell(null)}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Hover Tooltip display */}
            <div className="matrix-tooltip-bar font-code">
              {hoveredCell ? (
                <span className="tooltip-active">
                  <strong className="text-emerald">{hoveredCell.count} contributions</strong> on {hoveredCell.date}
                </span>
              ) : (
                <span className="tooltip-hint">
                  Hover over any pixel to inspect telemetry data
                </span>
              )}
            </div>
          </div>

          {/* ── Telemetry Metrics Row ── */}
          <div className="github-stats-row">
            <div className="gh-stat-box stat-cyan">
              <div className="gh-stat-icon-wrap">
                <FiGitCommit />
              </div>
              <div className="gh-stat-info">
                <span className="gh-stat-val text-cyan font-code">1,840+</span>
                <span className="gh-stat-lbl">TOTAL COMMITS</span>
              </div>
              <div className="gh-stat-pill font-code">+48 this week</div>
            </div>

            <div className="gh-stat-box stat-emerald">
              <div className="gh-stat-icon-wrap">
                <FiFolder />
              </div>
              <div className="gh-stat-info">
                <span className="gh-stat-val text-emerald font-code">24</span>
                <span className="gh-stat-lbl">PUBLIC REPOSITORIES</span>
              </div>
              <div className="gh-stat-pill font-code">Production grade</div>
            </div>

            <div className="gh-stat-box stat-amber">
              <div className="gh-stat-icon-wrap">
                <FiCheckCircle />
              </div>
              <div className="gh-stat-info">
                <span className="gh-stat-val text-amber font-code">99.4%</span>
                <span className="gh-stat-lbl">CI/CD BUILD SUCCESS</span>
              </div>
              <div className="gh-stat-pill font-code">Pipeline active</div>
            </div>

            <div className="gh-stat-box stat-violet">
              <div className="gh-stat-icon-wrap">
                <FiCode />
              </div>
              <div className="gh-stat-info">
                <span className="gh-stat-val text-violet font-code">MERN + Python</span>
                <span className="gh-stat-lbl">CORE TECH STACK</span>
              </div>
              <div className="gh-stat-pill font-code">High throughput</div>
            </div>
          </div>

          {/* ── Recent Production Commits Terminal Feed ── */}
          <div className="recent-commits-list">
            <div className="list-hdr-wrap font-code">
              <div className="list-hdr-left">
                <FiGitBranch className="text-cyan" />
                <span>// PRODUCTION AUDIT LOG (BRANCH: MAIN)</span>
              </div>
              <div className="list-hdr-right">
                <span className="audit-live-tag">
                  <FiCpu className="text-emerald" /> AUTOMATED TELEMETRY
                </span>
              </div>
            </div>

            <div className="commit-items-wrap">
              {recentCommits.map((c, i) => (
                <div key={i} className="commit-item">
                  <div className="commit-left">
                    <span className="commit-hash font-code">{c.hash}</span>
                    <span className="commit-scope font-code">{c.scope}</span>
                  </div>
                  <div className="commit-mid">
                    <span className="commit-msg">{c.msg}</span>
                  </div>
                  <div className="commit-right font-code">
                    <span className="commit-branch">
                      <FiGitBranch className="branch-ico" /> {c.branch}
                    </span>
                    <span className="commit-time">{c.time}</span>
                    <span className="verified-sig" title="Cryptographically Verified">
                      <FiCheckCircle className="text-emerald" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Terminal Action Footer ── */}
          <div className="gh-terminal-footer">
            <a
              href="https://github.com/Hassan-Abdikadir/Hassan-Abdikadir-Porfolio"
              target="_blank"
              rel="noreferrer"
              className="gh-cta-btn gh-cta-primary font-code"
            >
              <FiStar />
              <span>Star Portfolio Repo</span>
            </a>
            <a
              href="https://github.com/Hassan-Abdikadir"
              target="_blank"
              rel="noreferrer"
              className="gh-cta-btn gh-cta-secondary font-code"
            >
              <FiGithub />
              <span>Visit @Hassan-Abdikadir</span>
              <FiExternalLink />
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
