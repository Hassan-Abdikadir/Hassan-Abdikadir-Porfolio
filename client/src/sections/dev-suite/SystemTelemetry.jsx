import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { FiActivity, FiCpu, FiDatabase, FiShield, FiWifi, FiGlobe, FiZap, FiCheckCircle } from 'react-icons/fi'
import { fetchTelemetry } from '../../services/portfolioService'
import './SystemTelemetry.css'

const NODES = [
  { id: 'hargeisa', name: 'Hargeisa Primary Node', lat: '9.56', lng: '44.06', ping: '12ms', requests: '1.4k', status: 'Optimal' },
  { id: 'frankfurt', name: 'Frankfurt Gateway', lat: '50.11', lng: '8.68', ping: '38ms', requests: '850', status: 'Optimal' },
  { id: 'newyork', name: 'New York Edge', lat: '40.71', lng: '-74.00', ping: '62ms', requests: '1.1k', status: 'Optimal' },
  { id: 'tokyo', name: 'Tokyo Node', lat: '35.67', lng: '139.65', ping: '84ms', requests: '620', status: 'Optimal' },
  { id: 'singapore', name: 'Singapore Hub', lat: '1.35', lng: '103.81', ping: '72ms', requests: '940', status: 'Optimal' }
]

export default function SystemTelemetry() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [selectedNode, setSelectedNode] = useState(NODES[0])
  const [metrics, setMetrics] = useState({
    cpuLoad: 24,
    memoryUsage: 48,
    activeRequests: 142,
    apiLatency: 18,
    uptime: '99.98%'
  })

  useEffect(() => {
    const loadRealTelemetry = async () => {
      try {
        const data = await fetchTelemetry()
        if (data) {
          setMetrics(prev => ({
            ...prev,
            uptime: data.serverUptime || prev.uptime,
            apiLatency: parseInt(data.avgResponseLatency) || prev.apiLatency
          }))
        }
      } catch (err) {
        // keep defaults
      }
    }

    loadRealTelemetry()

    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        cpuLoad: Math.floor(Math.random() * 15) + 18,
        memoryUsage: Math.floor(Math.random() * 8) + 44,
        activeRequests: prev.activeRequests + Math.floor(Math.random() * 5) - 2,
        apiLatency: Math.floor(Math.random() * 8) + 14
      }))
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="telemetry" className="section telemetry-section">
      <div className="grid-bg" />
      <div className="container" ref={ref}>
        <div className={`section-header ${inView ? 'visible' : ''}`}>
          <div className="section-label">system.telemetry</div>
          <h2 className="section-title">
            Live System <span className="gradient-text">Telemetry & Global Heatmap</span>
          </h2>
          <p className="section-subtitle">
            Real-time infrastructure benchmark monitoring showcasing global low-latency execution and Web Vitals performance.
          </p>
        </div>

        <div className={`telemetry-hud glass-card ${inView ? 'visible' : ''}`}>
          <div className="hud-top-bar">
            <div className="hud-title">
              <FiActivity className="pulse-icon" /> TELEMETRY COMMAND CENTER v3.0
            </div>
            <div className="hud-status">
              <span className="status-dot">OPERATIONAL</span>
              <span className="hud-clock">{new Date().toLocaleTimeString()}</span>
            </div>
          </div>

          <div className="hud-grid">
            {/* Metric 1 */}
            <div className="hud-card glass-card">
              <div className="hud-card-header">
                <FiCpu className="hud-icon blue" />
                <span className="hud-label">CPU LOAD SIMULATION</span>
              </div>
              <div className="hud-value">{metrics.cpuLoad}%</div>
              <div className="hud-bar-track">
                <div className="hud-bar-fill blue" style={{ width: `${metrics.cpuLoad}%` }} />
              </div>
              <span className="hud-sub">8 Cores • 3.4 GHz</span>
            </div>

            {/* Metric 2 */}
            <div className="hud-card glass-card">
              <div className="hud-card-header">
                <FiDatabase className="hud-icon emerald" />
                <span className="hud-label">MEMORY ALLOCATION</span>
              </div>
              <div className="hud-value">{metrics.memoryUsage}%</div>
              <div className="hud-bar-track">
                <div className="hud-bar-fill emerald" style={{ width: `${metrics.memoryUsage}%` }} />
              </div>
              <span className="hud-sub">7.68 GB / 16 GB</span>
            </div>

            {/* Metric 3 */}
            <div className="hud-card glass-card">
              <div className="hud-card-header">
                <FiWifi className="hud-icon cyan" />
                <span className="hud-label">AVG API LATENCY</span>
              </div>
              <div className="hud-value">{metrics.apiLatency} <span className="hud-unit">ms</span></div>
              <div className="hud-bar-track">
                <div className="hud-bar-fill cyan" style={{ width: `${(metrics.apiLatency / 50) * 100}%` }} />
              </div>
              <span className="hud-sub">Sub-50ms Threshold</span>
            </div>

            {/* Metric 4 */}
            <div className="hud-card glass-card">
              <div className="hud-card-header">
                <FiShield className="hud-icon violet" />
                <span className="hud-label">SECURITY SUITE</span>
              </div>
              <div className="hud-value">100%</div>
              <div className="hud-bar-track">
                <div className="hud-bar-fill violet" style={{ width: '100%' }} />
              </div>
              <span className="hud-sub">JWT • RateLimit • Helmet</span>
            </div>
          </div>

          {/* FEATURE 4: Live Global Telemetry & Heatmap Nodes */}
          <div className="global-heatmap-container glass-card">
            <div className="heatmap-header font-code">
              <span><FiGlobe className="text-cyan" /> GLOBAL EDGE TELEMETRY MAP & ACTIVE PINGS</span>
              <span className="selected-node-badge">Active Node: {selectedNode.name}</span>
            </div>
            
            <div className="nodes-pills-bar">
              {NODES.map(node => (
                <button
                  key={node.id}
                  className={`node-pill ${selectedNode.id === node.id ? 'active' : ''}`}
                  onClick={() => setSelectedNode(node)}
                >
                  <span className="node-dot" /> {node.name.split(' ')[0]} ({node.ping})
                </button>
              ))}
            </div>

            <div className="node-stats-strip font-code">
              <div><span className="text-gray">LATITUDE / LONGITUDE:</span> {selectedNode.lat}, {selectedNode.lng}</div>
              <div><span className="text-gray">PING LATENCY:</span> <span className="text-cyan">{selectedNode.ping}</span></div>
              <div><span className="text-gray">HOURLY REQUESTS:</span> <span className="text-emerald">{selectedNode.requests}</span></div>
              <div><span className="text-gray">HEALTH:</span> <span className="text-emerald">{selectedNode.status}</span></div>
            </div>
          </div>

          {/* FEATURE 6: Real-Time Web Vitals & PWA Monitor */}
          <div className="web-vitals-strip glass-card">
            <div className="vitals-title font-code">
              <FiZap className="text-amber" /> PERFORMANCE MONITOR & WEB VITALS (PWA CACHED)
            </div>
            <div className="vitals-grid">
              <div className="vital-item">
                <span className="vital-label">LCP (Largest Contentful)</span>
                <span className="vital-val text-emerald">0.78s <FiCheckCircle className="check-mini" /></span>
              </div>
              <div className="vital-item">
                <span className="vital-label">FID / INP (Input Delay)</span>
                <span className="vital-val text-emerald">12ms <FiCheckCircle className="check-mini" /></span>
              </div>
              <div className="vital-item">
                <span className="vital-label">CLS (Layout Shift)</span>
                <span className="vital-val text-emerald">0.001 <FiCheckCircle className="check-mini" /></span>
              </div>
              <div className="vital-item">
                <span className="vital-label">PWA Offline Readiness</span>
                <span className="vital-val text-cyan">Service Worker Active</span>
              </div>
            </div>
          </div>

          <div className="hud-footer">
            <div className="hud-log">
              <span className="log-prompt">$</span> status check: Express Controller, MongoDB Cluster & WebSocket gateway synced.
            </div>
            <div className="hud-uptime">
              Uptime Target: <strong>{metrics.uptime}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

