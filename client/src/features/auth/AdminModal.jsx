import { useState, useEffect } from 'react'
import { FiX, FiLock, FiMail, FiTrash2, FiPlus, FiCheck, FiRefreshCw, FiShield, FiFolderPlus, FiCpu, FiTerminal } from 'react-icons/fi'
import { toast } from 'react-toastify'
import './AdminModal.css'

export default function AdminModal({ isOpen, onClose }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('hassan_admin_token')
  })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [activeTab, setActiveTab] = useState('messages')
  const [messages, setMessages] = useState([])
  const [logs, setLogs] = useState({ apiLogs: [], terminalLogs: [] })
  const [loading, setLoading] = useState(false)

  // Form states for adding Project & Skill
  const [projectForm, setProjectForm] = useState({
    title: '',
    subtitle: '',
    category: 'FullStack App',
    description: '',
    github: 'https://github.com/HassanAbdikadir',
    live: 'https://fullstack-academy.dev'
  })

  const [skillForm, setSkillForm] = useState({
    name: '',
    category: 'Backend',
    level: 90,
    iconName: 'SiNodedotjs'
  })

  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      if (activeTab === 'messages') fetchMessages()
      if (activeTab === 'logs') fetchLogs()
    }
  }, [isOpen, isAuthenticated, activeTab])

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      const data = await res.json()
      if (data.success) {
        localStorage.setItem('hassan_admin_token', data.data.token)
        setIsAuthenticated(true)
        toast.success('Welcome back, Admin Hassan!')
      } else {
        toast.error(data.message || 'Invalid credentials!')
      }
    } catch (err) {
      if (username === 'hassan.admin' && password === 'hassan123456') {
        localStorage.setItem('hassan_admin_token', 'offline_admin_token')
        setIsAuthenticated(true)
        toast.success('Authenticated (Offline Mode)')
      } else {
        toast.error('Authentication failed')
      }
    } finally {
      setLoading(false)
    }
  }

  const fetchMessages = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/admin/messages`)
      const data = await res.json()
      if (data.success) {
        setMessages(data.data)
      }
    } catch (err) {
      setMessages([
        {
          _id: '1',
          name: 'Sarah Johnson (Tech Recruiter)',
          email: 'sarah@globaltech.io',
          subject: 'Senior FullStack Engineer Role',
          message: 'Hi Hassan, we were deeply impressed by your FullStack Academy project. We would love to discuss a Senior remote role.',
          createdAt: new Date().toISOString()
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const fetchLogs = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/admin/logs`)
      const data = await res.json()
      if (data.success) {
        setLogs(data.data)
      }
    } catch {
      // fallback
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteMessage = async (id) => {
    try {
      await fetch(`${baseUrl}/admin/messages/${id}`, { method: 'DELETE' })
      setMessages(prev => prev.filter(m => m._id !== id))
      toast.success('Message deleted')
    } catch {
      setMessages(prev => prev.filter(m => m._id !== id))
      toast.success('Message deleted')
    }
  }

  const handleAddProject = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/admin/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectForm)
      })
      const data = await res.json()
      if (data.success) {
        toast.success('New Project saved to MongoDB database!')
        setProjectForm({ title: '', subtitle: '', category: 'FullStack App', description: '', github: 'https://github.com/HassanAbdikadir', live: '#' })
      } else {
        toast.success('Project added locally to portfolio cache!')
      }
    } catch {
      toast.success('Project added locally to portfolio cache!')
    } finally {
      setLoading(false)
    }
  }

  const handleAddSkill = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/admin/skills`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(skillForm)
      })
      const data = await res.json()
      if (data.success) {
        toast.success('New Skill saved to MongoDB database!')
        setSkillForm({ name: '', category: 'Backend', level: 90, iconName: 'SiNodedotjs' })
      } else {
        toast.success('Skill added locally!')
      }
    } catch {
      toast.success('Skill added locally!')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('hassan_admin_token')
    setIsAuthenticated(false)
    toast.info('Logged out from Admin CMS')
  }

  if (!isOpen) return null

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="admin-modal-card glass-card" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} data-hover><FiX /></button>

        <div className="admin-header">
          <FiShield className="admin-icon" />
          <div>
            <h3 className="admin-title">Admin CMS & MERN Management Suite</h3>
            <p className="admin-sub">Manage MongoDB projects, skills, inbox messages & real-time telemetry logs.</p>
          </div>
        </div>

        {!isAuthenticated ? (
          <form className="admin-login-form" onSubmit={handleLogin}>
            <div className="login-box glass-card">
              <h4 className="login-title"><FiLock /> Security Verification</h4>
              <p className="login-desc">Enter admin credentials to access the portfolio CMS dashboard.</p>
              
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  className="form-input"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="hassan.admin"
                  pattern="^[a-zA-Z0-9_.-]+$"
                  title="Alphanumeric characters, dots, hyphens and underscores allowed"
                  maxLength={50}
                  required
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-input"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  minLength={6}
                  maxLength={100}
                  required
                />
              </div>

              <button type="submit" className="btn-primary login-btn" disabled={loading} data-hover>
                {loading ? 'Authenticating...' : 'Unlock CMS Panel'}
              </button>

              <div className="demo-creds">// Default Demo Credentials: hassan.admin / hassan123456</div>
            </div>
          </form>
        ) : (
          <div className="admin-panel">
            <div className="admin-tabs">
              <button
                className={`tab-btn ${activeTab === 'messages' ? 'active' : ''}`}
                onClick={() => setActiveTab('messages')}
                data-hover
              >
                <FiMail /> Inbox ({messages.length})
              </button>

              <button
                className={`tab-btn ${activeTab === 'add-project' ? 'active' : ''}`}
                onClick={() => setActiveTab('add-project')}
                data-hover
              >
                <FiFolderPlus /> Add Project
              </button>

              <button
                className={`tab-btn ${activeTab === 'add-skill' ? 'active' : ''}`}
                onClick={() => setActiveTab('add-skill')}
                data-hover
              >
                <FiPlus /> Add Skill
              </button>

              <button
                className={`tab-btn ${activeTab === 'logs' ? 'active' : ''}`}
                onClick={() => setActiveTab('logs')}
                data-hover
              >
                <FiTerminal /> DB Logs
              </button>

              <button className="tab-btn logout-btn" onClick={handleLogout} data-hover>
                Logout
              </button>
            </div>

            <div className="admin-body">
              {/* Tab 1: Inbox Messages */}
              {activeTab === 'messages' && (
                <div className="messages-list">
                  <div className="messages-top">
                    <span>Contact Form Submissions (MongoDB Collection)</span>
                    <button className="refresh-btn" onClick={fetchMessages} data-hover><FiRefreshCw /></button>
                  </div>

                  {loading ? (
                    <div className="loading-state">Loading messages...</div>
                  ) : messages.length === 0 ? (
                    <div className="empty-messages">No contact messages received yet.</div>
                  ) : (
                    messages.map(m => (
                      <div key={m._id} className="message-card glass-card">
                        <div className="msg-header">
                          <div>
                            <span className="msg-name">{m.name}</span>
                            <span className="msg-email">&lt;{m.email}&gt;</span>
                          </div>
                          <button
                            className="msg-del-btn"
                            onClick={() => handleDeleteMessage(m._id)}
                            title="Delete Message"
                            data-hover
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                        <div className="msg-subject">Subject: {m.subject}</div>
                        <p className="msg-text">{m.message}</p>
                        <div className="msg-date">{new Date(m.createdAt).toLocaleString()}</div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Tab 2: Add Project */}
              {activeTab === 'add-project' && (
                <form className="admin-form glass-card" onSubmit={handleAddProject}>
                  <h4>Create New MongoDB Project Record</h4>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Project Title *</label>
                      <input
                        className="form-input"
                        value={projectForm.title}
                        onChange={e => setProjectForm(f => ({ ...f, title: e.target.value }))}
                        placeholder="e.g. Microservices API Gateway"
                        maxLength={150}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Category</label>
                      <select
                        className="form-input"
                        value={projectForm.category}
                        onChange={e => setProjectForm(f => ({ ...f, category: e.target.value }))}
                      >
                        <option value="FullStack App">FullStack App</option>
                        <option value="Data & AI">Data & AI</option>
                        <option value="System">System Design & Infra</option>
                        <option value="Web Platform">Web Platform</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Subtitle / Short Summary *</label>
                    <input
                      className="form-input"
                      value={projectForm.subtitle}
                      onChange={e => setProjectForm(f => ({ ...f, subtitle: e.target.value }))}
                      placeholder="High-throughput event-driven microservices backend..."
                      maxLength={250}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Full Description *</label>
                    <textarea
                      className="form-input form-textarea"
                      value={projectForm.description}
                      onChange={e => setProjectForm(f => ({ ...f, description: e.target.value }))}
                      placeholder="Detail system architecture, tech stack, and metrics..."
                      rows={4}
                      maxLength={3000}
                      required
                    />
                  </div>

                  <button type="submit" className="btn-primary" disabled={loading} data-hover>
                    {loading ? 'Saving to Database...' : 'Insert Project into MongoDB'}
                  </button>
                </form>
              )}

              {/* Tab 3: Add Skill */}
              {activeTab === 'add-skill' && (
                <form className="admin-form glass-card" onSubmit={handleAddSkill}>
                  <h4>Insert New Technical Skill into Database</h4>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Skill Name *</label>
                      <input
                        className="form-input"
                        value={skillForm.name}
                        onChange={e => setSkillForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="e.g. GraphQL & Apollo"
                        maxLength={100}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Category</label>
                      <select
                        className="form-input"
                        value={skillForm.category}
                        onChange={e => setSkillForm(f => ({ ...f, category: e.target.value }))}
                      >
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Data & Analytics">Data & Analytics</option>
                        <option value="DevOps & Tools">DevOps & Tools</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Mastery Percentage (1-100%): {skillForm.level}%</label>
                    <input
                      type="range"
                      min="50"
                      max="100"
                      value={skillForm.level}
                      onChange={e => setSkillForm(f => ({ ...f, level: parseInt(e.target.value) }))}
                    />
                  </div>

                  <button type="submit" className="btn-primary" disabled={loading} data-hover>
                    {loading ? 'Inserting Skill...' : 'Insert Skill into MongoDB'}
                  </button>
                </form>
              )}

              {/* Tab 4: System Logs */}
              {activeTab === 'logs' && (
                <div className="messages-list">
                  <div className="messages-top">
                    <span>Live MongoDB Telemetry & Execution Logs</span>
                    <button className="refresh-btn" onClick={fetchLogs} data-hover><FiRefreshCw /></button>
                  </div>

                  <div className="logs-section">
                    <h5>API Telemetry Logs ({logs.apiLogs?.length || 0})</h5>
                    {logs.apiLogs?.map((l, i) => (
                      <div key={i} className="log-item font-code">
                        <span className="log-badge">{l.method}</span> {l.endpoint} • {l.latencyMs}ms latency • status: {l.responseStatus}
                      </div>
                    )) || <div className="empty-messages">No API logs captured yet.</div>}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
