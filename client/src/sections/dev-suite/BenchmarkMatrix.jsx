import { useInView } from 'react-intersection-observer'
import { FiCheckCircle, FiAward, FiXCircle } from 'react-icons/fi'
import './BenchmarkMatrix.css'

const METRICS = [
  {
    category: 'API Response Latency',
    standard: '250ms - 450ms (Uncached REST)',
    hassan: '18ms - 42ms (Redis + Indexing)',
    gain: '13x Faster Execution',
    highlight: true
  },
  {
    category: 'Onboarding Time',
    standard: '2 - 3 Weeks (Complex Stack)',
    hassan: '< 3 Days (Production Ready)',
    gain: '5x Onboarding Speed',
    highlight: true
  },
  {
    category: 'Security Architecture',
    standard: 'Basic Session / Plain Passwords',
    hassan: 'JWT + RateLimit + Helmet + Sanitization',
    gain: '100% Cyber Hardened',
    highlight: true
  },
  {
    category: 'Data & Telemetry',
    standard: 'Manual Monthly Reports',
    hassan: 'Automated Python Pipelines & Live Dashboards',
    gain: 'Real-Time Insights',
    highlight: false
  },
  {
    category: 'Real-Time Capabilities',
    standard: 'Polling / Polling Traffic',
    hassan: 'Socket.io WebSockets (<25ms Event Broker)',
    gain: 'Zero Latency Sync',
    highlight: false
  }
]

export default function BenchmarkMatrix() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="benchmark-matrix" className="section benchmark-matrix-section">
      <div className="container" ref={ref}>
        <div className={`section-header ${inView ? 'visible' : ''}`}>
          <div className="section-label">candidate.roi</div>
          <h2 className="section-title">
            Candidate vs. Industry <span className="gradient-text">Benchmark Matrix</span>
          </h2>
          <p className="section-subtitle">
            Transparent ROI evaluation comparing Hassan Abdikadir&apos;s engineering metrics against standard developer baselines.
          </p>
        </div>

        <div className={`matrix-table-container glass-card ${inView ? 'visible' : ''}`}>
          <div className="matrix-table-header font-code">
            <div className="col-cat">EVALUATION METRIC</div>
            <div className="col-std">AVERAGE DEVELOPER BASELINE</div>
            <div className="col-hassan">HASSAN ABDIKADIR (SPECIALIST)</div>
            <div className="col-gain">VALUE GAIN FOR TEAM</div>
          </div>

          <div className="matrix-table-body font-code">
            {METRICS.map((m, i) => (
              <div key={i} className={`matrix-row ${m.highlight ? 'highlight-row' : ''}`}>
                <div className="col-cat row-cat">{m.category}</div>
                <div className="col-std text-muted"><FiXCircle className="text-red" /> {m.standard}</div>
                <div className="col-hassan text-emerald"><FiCheckCircle className="text-emerald" /> {m.hassan}</div>
                <div className="col-gain">
                  <span className="gain-badge"><FiAward /> {m.gain}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
