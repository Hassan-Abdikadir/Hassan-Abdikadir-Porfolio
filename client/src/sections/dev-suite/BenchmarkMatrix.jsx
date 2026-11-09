import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import {
  FiCheckCircle, FiAward, FiXCircle, FiZap,
  FiShield, FiClock, FiActivity, FiDatabase,
  FiRadio, FiTrendingUp, FiTerminal, FiArrowRight
} from 'react-icons/fi'
import './BenchmarkMatrix.css'

const BENCHMARK_METRICS = [
  {
    id: 'latency',
    category: 'API Response Latency',
    icon: <FiZap />,
    domain: 'Performance',
    standard: '250ms – 450ms (Uncached REST)',
    standardDetail: 'High database roundtrips, uncached queries',
    hassan: '18ms – 42ms (Redis + Indexing)',
    hassanDetail: 'Multi-tier in-memory caching & compound indexes',
    gain: '13x Faster Execution',
    gainMultiplier: '13x',
    baselineRatio: 18,
    hassanRatio: 96,
    highlight: true
  },
  {
    id: 'onboarding',
    category: 'Production Onboarding Time',
    icon: <FiClock />,
    domain: 'Velocity',
    standard: '2 – 3 Weeks (Complex Stack)',
    standardDetail: 'Steep learning curve, undocumented architectures',
    hassan: '< 3 Days (Production Ready)',
    hassanDetail: 'Modular codebases, Docker setups & clean documentation',
    gain: '5x Onboarding Speed',
    gainMultiplier: '5x',
    baselineRatio: 24,
    hassanRatio: 94,
    highlight: true
  },
  {
    id: 'security',
    category: 'Security Architecture',
    icon: <FiShield />,
    domain: 'Security',
    standard: 'Basic Session / Plain Passwords',
    standardDetail: 'Vulnerable to CSRF, XSS, and unthrottled brute-force',
    hassan: 'JWT + RateLimit + Helmet + Sanitization',
    hassanDetail: 'OWASP hardened, bcrypt salted, parameterized queries',
    gain: '100% Cyber Hardened',
    gainMultiplier: '100%',
    baselineRatio: 30,
    hassanRatio: 99,
    highlight: true
  },
  {
    id: 'data',
    category: 'Data & Telemetry Engine',
    icon: <FiDatabase />,
    domain: 'Telemetry',
    standard: 'Manual Monthly Reports',
    standardDetail: 'Delayed feedback loop, unmonitored drop-offs',
    hassan: 'Automated Python Pipelines & Live Dashboards',
    hassanDetail: 'Event-driven telemetry, automated Pandas/NumPy pipelines',
    gain: 'Real-Time Insights',
    gainMultiplier: 'Real-Time',
    baselineRatio: 20,
    hassanRatio: 92,
    highlight: false
  },
  {
    id: 'realtime',
    category: 'Real-Time Sync & Events',
    icon: <FiRadio />,
    domain: 'Architecture',
    standard: 'HTTP Polling / Polling Overhead',
    standardDetail: 'Heavy server load, 5s+ message latency',
    hassan: 'Socket.io WebSockets (<25ms Broker)',
    hassanDetail: 'Bi-directional duplex channels, room-based broadcast',
    gain: 'Zero Latency Sync',
    gainMultiplier: '<25ms',
    baselineRatio: 22,
    hassanRatio: 97,
    highlight: false
  },
  {
    id: 'delivery',
    category: 'Full-Stack Delivery Ownership',
    icon: <FiTrendingUp />,
    domain: 'Engineering',
    standard: 'Siloed (Frontend OR Backend only)',
    standardDetail: 'Blocked by cross-team handoffs & API contract mismatches',
    hassan: 'End-to-End MERN (DB Schema to UI)',
    hassanDetail: 'Unified type contracts, REST/WebSocket parity & CI/CD',
    gain: '2.5x Delivery Velocity',
    gainMultiplier: '2.5x',
    baselineRatio: 35,
    hassanRatio: 95,
    highlight: true
  }
]

export default function BenchmarkMatrix() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [activeFilter, setActiveFilter] = useState('All')
  const [activeRow, setActiveRow] = useState(null)

  const filteredMetrics = activeFilter === 'All'
    ? BENCHMARK_METRICS
    : BENCHMARK_METRICS.filter(m => m.domain === activeFilter)

  const domains = ['All', 'Performance', 'Velocity', 'Security', 'Architecture']

  return (
    <section id="benchmark-matrix" className="section benchmark-matrix-section">
      <div className="container" ref={ref}>

        {/* ── Section Header ── */}
        <div className={`section-header ${inView ? 'visible' : ''}`}>
          <div className="section-label">candidate.roi</div>
          <h2 className="section-title">
            Candidate vs. Industry <span className="gradient-text">Benchmark Matrix</span>
          </h2>
          <p className="section-subtitle">
            Transparent ROI evaluation comparing Hassan Abdikadir&apos;s engineering speed, security, and velocity against standard developer baselines.
          </p>
        </div>

        {/* ── Benchmark Chassis Card ── */}
        <div className={`bm-card glass-card ${inView ? 'visible' : ''}`}>

          {/* Top HUD Bar */}
          <div className="bm-terminal-bar">
            <div className="bm-bar-left font-code">
              <span className="bm-radar-dot" />
              <span className="bm-terminal-tag">
                <FiTerminal className="text-cyan" /> ROI_BENCHMARK_v3.2 // TELEMETRY AUDIT
              </span>
            </div>

            <div className="bm-summary-pills font-code">
              <div className="bm-pill pill-cyan">
                <span className="bm-pill-label">AVG VELOCITY</span>
                <span className="bm-pill-val">7.2x GAIN</span>
              </div>
              <div className="bm-pill pill-emerald">
                <span className="bm-pill-label">SECURITY</span>
                <span className="bm-pill-val">ENTERPRISE</span>
              </div>
              <div className="bm-pill pill-amber">
                <span className="bm-pill-label">ONBOARDING</span>
                <span className="bm-pill-val">&lt;72 HOURS</span>
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="bm-filter-bar">
            <span className="bm-filter-label font-code">// FILTER DOMAIN:</span>
            <div className="bm-filters font-code">
              {domains.map(dom => (
                <button
                  key={dom}
                  className={`bm-filter-btn ${activeFilter === dom ? 'active' : ''}`}
                  onClick={() => setActiveFilter(dom)}
                >
                  {dom}
                </button>
              ))}
            </div>
          </div>

          {/* ── Desktop & Tablet Matrix Table ── */}
          <div className="bm-table-wrapper">
            <div className="bm-table-header font-code">
              <div className="bm-col-cat">
                <span>EVALUATION METRIC</span>
              </div>
              <div className="bm-col-std">
                <span className="std-title-badge">AVERAGE DEVELOPER BASELINE</span>
              </div>
              <div className="bm-col-hassan">
                <span className="hassan-title-badge">
                  <FiZap className="hassan-star" /> HASSAN ABDIKADIR (SPECIALIST)
                </span>
              </div>
              <div className="bm-col-gain">
                <span>VALUE GAIN FOR TEAM</span>
              </div>
            </div>

            <div className="bm-table-body">
              {filteredMetrics.map((m) => (
                <div
                  key={m.id}
                  className={`bm-row ${m.highlight ? 'highlight-row' : ''} ${activeRow === m.id ? 'row-active' : ''}`}
                  onMouseEnter={() => setActiveRow(m.id)}
                  onMouseLeave={() => setActiveRow(null)}
                >
                  {/* Column 1: Metric & Category */}
                  <div className="bm-col-cat">
                    <div className="bm-cat-icon-wrap">
                      {m.icon}
                    </div>
                    <div className="bm-cat-text">
                      <span className="bm-cat-name font-code">{m.category}</span>
                      <span className="bm-cat-domain font-code">{m.domain}</span>
                    </div>
                  </div>

                  {/* Column 2: Average Baseline */}
                  <div className="bm-col-std">
                    <div className="bm-baseline-card">
                      <div className="bm-val-top text-red font-code">
                        <FiXCircle className="bm-status-icon text-red" />
                        <span className="bm-val-txt">{m.standard}</span>
                      </div>
                      <p className="bm-detail-sub">{m.standardDetail}</p>
                      {/* Comparison Micro Bar */}
                      <div className="bm-micro-track">
                        <div className="bm-micro-fill fill-baseline" style={{ width: `${m.baselineRatio}%` }} />
                      </div>
                    </div>
                  </div>

                  {/* Column 3: Hassan Abdikadir (Champion) */}
                  <div className="bm-col-hassan">
                    <div className="bm-champion-card">
                      <div className="bm-val-top text-emerald font-code">
                        <FiCheckCircle className="bm-status-icon text-emerald" />
                        <span className="bm-val-txt-pro">{m.hassan}</span>
                      </div>
                      <p className="bm-detail-sub-pro">{m.hassanDetail}</p>
                      {/* Champion Micro Bar */}
                      <div className="bm-micro-track">
                        <div className="bm-micro-fill fill-champion" style={{ width: `${m.hassanRatio}%` }} />
                      </div>
                    </div>
                  </div>

                  {/* Column 4: Value Gain Badge */}
                  <div className="bm-col-gain">
                    <div className="bm-gain-badge-wrap">
                      <div className="gain-badge font-code">
                        <FiAward className="gain-award-ico" />
                        <span className="gain-text">{m.gain}</span>
                      </div>
                      <span className="gain-multiplier-tag font-code">
                        <FiActivity className="gm-ico" /> ADVANTAGE
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Mobile Battle Cards (Hidden on Desktop, Visible on Small Screens) ── */}
          <div className="bm-mobile-cards">
            {filteredMetrics.map((m) => (
              <div key={m.id} className="bm-mobile-card">
                <div className="bmm-header font-code">
                  <div className="bmm-header-left">
                    <span className="bmm-icon">{m.icon}</span>
                    <span className="bmm-title">{m.category}</span>
                  </div>
                  <span className="bmm-domain">{m.domain}</span>
                </div>

                <div className="bmm-vs-grid font-code">
                  <div className="bmm-box bmm-baseline">
                    <div className="bmm-box-lbl text-red">
                      <FiXCircle /> AVERAGE BASELINE
                    </div>
                    <div className="bmm-box-val">{m.standard}</div>
                  </div>

                  <div className="bmm-box bmm-champion">
                    <div className="bmm-box-lbl text-emerald">
                      <FiCheckCircle /> HASSAN (SPECIALIST)
                    </div>
                    <div className="bmm-box-val text-emerald">{m.hassan}</div>
                  </div>
                </div>

                <div className="bmm-footer font-code">
                  <span className="bmm-gain-pill">
                    <FiAward /> {m.gain}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* ── Bottom ROI Highlights Banner ── */}
          <div className="bm-footer-summary">
            <div className="bm-fs-left font-code">
              <span className="bm-fs-highlight text-cyan">
                ESTIMATED ROI MULTIPLIER: 4.8x
              </span>
              <span className="bm-fs-desc">
                High code velocity, zero-latency architectures &amp; end-to-end fullstack delivery save teams ~320+ dev hours/year.
              </span>
            </div>

            <div className="bm-fs-right">
              <a
                href="#contact"
                className="bm-cta-button font-code"
              >
                <span>Discuss Engineering Fit</span>
                <FiArrowRight />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
