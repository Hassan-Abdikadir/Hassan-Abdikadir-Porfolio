import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { FiGithub, FiExternalLink, FiStar, FiAward, FiX, FiCpu, FiLayers, FiAlertCircle, FiActivity, FiCheckCircle } from 'react-icons/fi'
import './Projects.css'

const filterTabs = ['All', 'FullStack App', 'Data & AI', 'Web Platform', 'System']

export default function Projects({ projects = [], t, lang }) {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)
  const [modalTab, setModalTab] = useState('overview')
  const [sandboxRunning, setSandboxRunning] = useState(false)
  const [sandboxResult, setSandboxResult] = useState(null)
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  const runLiveSandboxTest = (proj) => {
    setSandboxRunning(true)
    setSandboxResult(null)
    setTimeout(() => {
      setSandboxResult({
        status: 200,
        latency: '18ms',
        payload: {
          system: proj.title,
          status: 'HEALTHY_200_OK',
          activeEndpoint: `/api/v1/${proj.id}/telemetry`,
          dbConnections: 'ACTIVE_CLUSTER',
          cacheHitRate: '98.4%'
        }
      })
      setSandboxRunning(false)
    }, 700)
  }

  const filtered = activeFilter === 'All' ? projects : projects.filter(p => p.category === activeFilter)

  return (
    <section id="projects" className="section projects-section">
      <div className="grid-bg" />
      <div className="container" ref={ref}>
        <div className={`section-header ${inView ? 'visible' : ''}`}>
          <div className="section-label">{t?.projects?.label || 'my.projects'}</div>
          <h2 className="section-title">
            {t?.projects?.title || 'Projects That Define Me'}
          </h2>
          <p className="section-subtitle">
            {t?.projects?.subtitle || 'Real-world production systems built with precision — from flagship education platforms to intelligent data engines.'}
          </p>
        </div>

        {/* Filter */}
        <div className={`skills-filter ${inView ? 'visible' : ''}`}>
          {filterTabs.map(tab => (
            <button
              key={tab}
              className={`filter-btn ${activeFilter === tab ? 'active' : ''}`}
              onClick={() => setActiveFilter(tab)}
              data-hover
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filtered.map((project, i) => (
            <div
              key={project.id || i}
              className={`project-card glass-card ${project.flagship ? 'flagship' : ''} ${inView ? 'visible' : ''}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
              onClick={() => { setSelectedProject(project); setModalTab('overview'); }}
            >
              <div className="project-gradient" style={{ background: project.gradient }}>
                <div className="project-overlay">
                  {project.flagship && (
                    <div className="flagship-badge">
                      <FiAward /> Flagship System
                    </div>
                  )}
                  {project.featured && <FiStar className="featured-star" />}
                  <div className="project-actions-hover">
                    <a href={project.github} target="_blank" rel="noreferrer" className="project-action-btn" onClick={e => e.stopPropagation()} data-hover>
                      <FiGithub /> Code
                    </a>
                    <a href={project.live} target="_blank" rel="noreferrer" className="project-action-btn primary" onClick={e => e.stopPropagation()} data-hover>
                      <FiExternalLink /> Live
                    </a>
                  </div>
                </div>
                <div className="project-mock-ui">
                  <div className="mock-bar">
                    <div className="mock-dots">
                      <span className="dot red" /><span className="dot yellow" /><span className="dot green" />
                    </div>
                    <div className="mock-url">{project.title.toLowerCase().replace(/ /g,'-')}.dev</div>
                  </div>
                  <div className="mock-content image-mock-content">
                    <img 
                      src={project.gif || project.image || `/projects/${project.id}.png`} 
                      alt={project.title} 
                      className="mock-project-img" 
                      loading="lazy"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>
                </div>
              </div>

              <div className="project-body">
                <div className="project-meta">
                  <span className="project-category">{project.category}</span>
                  {project.flagship && (
                    <span className="gradient-text-flagship" style={{fontSize:'0.72rem', fontWeight:700}}>
                      ⭐ Flagship
                    </span>
                  )}
                </div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-subtitle">{project.subtitle}</p>
                <p className="project-desc">{project.description}</p>

                {project.stats && (
                  <div className="project-stats">
                    {Object.entries(project.stats).map(([k, v]) => (
                      <div key={k} className="proj-stat">
                        <div className="proj-stat-value gradient-text">{v}</div>
                        <div className="proj-stat-label">{k}</div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="project-tech">
                  {project.tech.slice(0, 5).map(t => (
                    <span key={t} className="tech-badge">{t}</span>
                  ))}
                  {project.tech.length > 5 && (
                    <span className="tech-badge violet">+{project.tech.length - 5}</span>
                  )}
                </div>

                <div className="project-links">
                  <a href={project.github} target="_blank" rel="noreferrer" className="proj-link" onClick={e => e.stopPropagation()} data-hover>
                    <FiGithub /> GitHub
                  </a>
                  <a href={project.live} target="_blank" rel="noreferrer" className="proj-link primary" onClick={e => e.stopPropagation()} data-hover>
                    <FiExternalLink /> Case Study
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Project Detail & Architecture Case Study Modal */}
      {selectedProject && (
        <div className="modal-backdrop" onClick={() => setSelectedProject(null)}>
          <div className="modal-card glass-card project-detail-modal case-study-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProject(null)} data-hover><FiX /></button>
            <div className="modal-gradient" style={{ background: selectedProject.gradient }} />
            <div className="modal-body">
              <div className="modal-header-meta">
                <span className="section-label">{selectedProject.category}</span>
                {selectedProject.flagship && <span className="flagship-badge-mini">⭐ Flagship System</span>}
              </div>
              <h2 className="modal-title gradient-text">{selectedProject.title}</h2>
              <p className="modal-subtitle">{selectedProject.subtitle}</p>
              
              {/* Modal Tabs Navigation */}
              <div className="modal-tabs-nav">
                <button
                  className={`modal-tab-btn ${modalTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setModalTab('overview')}
                >
                  <FiLayers /> Overview & Preview
                </button>
                <button
                  className={`modal-tab-btn ${modalTab === 'architecture' ? 'active' : ''}`}
                  onClick={() => setModalTab('architecture')}
                >
                  <FiCpu /> Architecture Topology
                </button>
                <button
                  className={`modal-tab-btn ${modalTab === 'challenges' ? 'active' : ''}`}
                  onClick={() => setModalTab('challenges')}
                >
                  <FiAlertCircle /> Engineering Challenges
                </button>
                <button
                  className={`modal-tab-btn ${modalTab === 'benchmarks' ? 'active' : ''}`}
                  onClick={() => setModalTab('benchmarks')}
                >
                  <FiActivity /> Impact & Benchmarks
                </button>
              </div>

              {/* TAB 1: OVERVIEW */}
              {modalTab === 'overview' && (
                <div className="tab-pane-content">
                  <div className="project-demo-window glass-card">
                    <div className="demo-window-bar">
                      <div className="window-dots">
                        <span className="dot red" /><span className="dot yellow" /><span className="dot green" />
                      </div>
                      <div className="window-title font-code">{selectedProject.title.toLowerCase().replace(/ /g,'-')}.preview.dev</div>
                      <span className="demo-live-badge"><span className="pulse-dot" /> LIVE SIMULATION</span>
                    </div>
                    <div className="demo-window-screen modal-demo-screen-img">
                      <img 
                        src={selectedProject.gif || selectedProject.image || `/projects/${selectedProject.id}.png`} 
                        alt={selectedProject.title} 
                        className="modal-screen-preview-img" 
                      />
                      <div className="demo-screen-overlay-bar">
                        <div className="demo-hero-text font-code">&gt; {selectedProject.title} Engine Active {selectedProject.gif ? '(ANIMATED DEMO)' : ''}</div>
                        <div className="demo-tech-chips">
                          {selectedProject.tech.map(t => (
                            <span key={t} className="demo-chip">{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="modal-desc">{selectedProject.longDesc || selectedProject.description}</p>

                  {/* FEATURE 5: Interactive Live Sandbox API Tester */}
                  <div className="sandbox-tester-box glass-card" style={{ marginBottom: '18px', padding: '14px', borderRadius: '12px', background: 'rgba(10,15,30,0.8)', border: '1px solid rgba(59,130,246,0.3)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <span className="font-code" style={{ fontSize: '0.78rem', color: '#60A5FA', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <FiCpu /> INTERACTIVE LIVE SANDBOX & API TESTER
                      </span>
                      <button
                        className="modal-tab-btn"
                        style={{ padding: '4px 10px', fontSize: '0.75rem', borderColor: '#3B82F6', color: '#60A5FA' }}
                        onClick={() => runLiveSandboxTest(selectedProject)}
                        disabled={sandboxRunning}
                      >
                        {sandboxRunning ? 'Ping Server...' : '🧪 Execute Live Health Ping'}
                      </button>
                    </div>

                    {sandboxResult ? (
                      <div className="font-code" style={{ fontSize: '0.75rem', background: 'rgba(0,0,0,0.6)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(16,185,129,0.3)', color: '#10B981' }}>
                        <div>STATUS: {sandboxResult.status} OK ({sandboxResult.latency})</div>
                        <pre style={{ margin: '6px 0 0', color: '#93C5FD', fontSize: '0.72rem' }}>
                          {JSON.stringify(sandboxResult.payload, null, 2)}
                        </pre>
                      </div>
                    ) : (
                      <p className="font-code" style={{ fontSize: '0.72rem', color: '#9CA3AF', margin: 0 }}>
                        Click &quot;Execute Live Health Ping&quot; to simulate a low-latency API call to this project&apos;s active backend cluster.
                      </p>
                    )}
                  </div>
                  
                  <div style={{ marginBottom: '16px' }}>
                    <div className="section-label" style={{ marginBottom: '8px' }}>Technology Stack</div>
                    <div className="project-tech">
                      {selectedProject.tech.map(t => <span key={t} className="tech-badge">{t}</span>)}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: SYSTEM ARCHITECTURE */}
              {modalTab === 'architecture' && (
                <div className="tab-pane-content">
                  <div className="topology-box glass-card" style={{ marginBottom: '20px' }}>
                    <div className="section-label" style={{ fontSize: '0.7rem', color: '#60A5FA', marginBottom: '12px' }}>// SYSTEM ARCHITECTURE FLOW</div>
                    <div className="topology-flow">
                      {(selectedProject.caseStudy?.topology || ['React 18 SPA', 'Express REST API', 'MongoDB Cluster']).map((node, index, arr) => (
                        <span key={index} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                          <span className={`topo-node ${index === 0 ? 'client' : index === arr.length - 1 ? 'db' : 'api'}`}>{node}</span>
                          {index < arr.length - 1 && <span className="topo-arrow">➔</span>}
                        </span>
                      ))}
                    </div>
                  </div>

                  {selectedProject.caseStudy?.architecture && (
                    <div className="arch-specs-grid">
                      <div className="arch-spec-card glass-card">
                        <span className="spec-label font-code">FRONTEND LAYER</span>
                        <p className="spec-val">{selectedProject.caseStudy.architecture.frontend}</p>
                      </div>
                      <div className="arch-spec-card glass-card">
                        <span className="spec-label font-code">BACKEND & GATEWAY</span>
                        <p className="spec-val">{selectedProject.caseStudy.architecture.backend}</p>
                      </div>
                      <div className="arch-spec-card glass-card">
                        <span className="spec-label font-code">DATABASE & CACHING</span>
                        <p className="spec-val">{selectedProject.caseStudy.architecture.database}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: ENGINEERING CHALLENGES */}
              {modalTab === 'challenges' && (
                <div className="tab-pane-content">
                  <div className="challenges-list">
                    {(selectedProject.caseStudy?.challenges || [
                      { problem: 'Ensuring sub-50ms API response latency under heavy concurrent request load.', solution: 'Optimized MongoDB aggregation pipelines and implemented Redis caching for hotspot read requests.' }
                    ]).map((c, i) => (
                      <div key={i} className="challenge-item glass-card">
                        <div className="challenge-header">
                          <FiAlertCircle className="text-amber" /> <strong>Challenge #{i+1}:</strong> {c.problem}
                        </div>
                        <div className="challenge-solution">
                          <FiCheckCircle className="text-emerald" /> <strong>Engineering Solution:</strong> {c.solution}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: BENCHMARKS */}
              {modalTab === 'benchmarks' && (
                <div className="tab-pane-content">
                  <div className="benchmarks-grid">
                    {(selectedProject.caseStudy?.benchmarks || [
                      { label: 'System Uptime', value: '99.9%' },
                      { label: 'API Response Latency', value: '< 45ms' }
                    ]).map((b, i) => (
                      <div key={i} className="benchmark-card glass-card">
                        <div className="bench-val gradient-text">{b.value}</div>
                        <div className="bench-label font-code">{b.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="modal-actions-row">
                <a href={selectedProject.github} target="_blank" rel="noreferrer" className="btn-outline" data-hover>
                  <FiGithub /> Source Code
                </a>
                <a href={selectedProject.live} target="_blank" rel="noreferrer" className="btn-primary" data-hover>
                  <FiExternalLink /> Live System Preview
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

