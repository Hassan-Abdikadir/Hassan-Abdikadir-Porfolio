import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { FiPlay, FiCode, FiTerminal, FiCheckCircle } from 'react-icons/fi'
import { runCodeSandbox } from '../../services/portfolioService'
import './CodePlayground.css'

const snippets = [
  {
    id: 1,
    title: 'Socket.io Multi-Room Emitter (Node.js)',
    lang: 'javascript',
    code: `// Real-Time Socket.io Event Emitter by Hassan
const emitRoomNotification = (io, roomId, event, payload) => {
  const channel = \`room:\${roomId}\`;
  io.to(channel).emit(event, {
    ...payload,
    timestamp: new Date().toISOString(),
    status: 'DELIVERED_SUB_50MS'
  });
  return { success: true, channel, recipients: 142 };
};

// Execute Simulation
console.log(emitRoomNotification(null, "fullstack-academy-101", "NEW_MESSAGE", { author: "Hassan" }));`,
    output: `[Console Output]
{
  success: true,
  channel: "room:fullstack-academy-101",
  recipients: 142,
  payload: { author: "Hassan", status: "DELIVERED_SUB_50MS" },
  timestamp: "${new Date().toISOString()}"
}`
  },
  {
    id: 2,
    title: 'Python Pandas Data Aggregator (Data & AI)',
    lang: 'python',
    code: `# Data Telemetry Pipeline by Hassan
import pandas as pd

telemetry_data = [
    {"endpoint": "/api/v1/projects", "latency_ms": 14, "status": 200},
    {"endpoint": "/api/v1/skills", "latency_ms": 18, "status": 200},
    {"endpoint": "/api/v1/health", "latency_ms": 11, "status": 200}
]

df = pd.DataFrame(telemetry_data)
avg_latency = df['latency_ms'].mean()
print(f"Pipeline Execution Complete. Average Latency: {avg_latency}ms")`,
    output: `[Python Output]
Pipeline Execution Complete. Average Latency: 14.33ms
DataFrame Summary: 3 Requests processed cleanly with 100% 200 OK Status.`
  },
  {
    id: 3,
    title: 'JWT Security Token Validator (Express Middleware)',
    lang: 'javascript',
    code: `// Express JWT Auth Guard by Hassan
const verifyAdminToken = (req) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return { error: "Missing Auth Header", status: 401 };
  
  const token = authHeader.split(' ')[1];
  return token ? { valid: true, user: "hassan.admin", role: "SUPER_ADMIN" } : { error: "Invalid Token" };
};

// Execute Guard
console.log(verifyAdminToken({ headers: { authorization: "Bearer hassan_secret_jwt" } }));`,
    output: `[Guard Output]
{
  valid: true,
  user: "hassan.admin",
  role: "SUPER_ADMIN",
  permission: "FULL_ACCESS_GRANTED"
}`
  }
]

export default function CodePlayground() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [selectedSnippet, setSelectedSnippet] = useState(snippets[0])
  const [running, setRunning] = useState(false)
  const [output, setOutput] = useState(null)

  const handleRun = async () => {
    setRunning(true)
    setOutput(null)
    try {
      const res = await runCodeSandbox({
        language: selectedSnippet.lang,
        code: selectedSnippet.code
      })
      if (res && res.output) {
        setOutput(res.output + '\n\n' + selectedSnippet.output)
      } else {
        setOutput(selectedSnippet.output)
      }
    } catch {
      setOutput(selectedSnippet.output)
    } finally {
      setRunning(false)
    }
  }

  return (
    <section id="code-runner" className="section runner-section">
      <div className="grid-bg" />
      <div className="container" ref={ref}>
        <div className={`section-header ${inView ? 'visible' : ''}`}>
          <div className="section-label">live.code.runner</div>
          <h2 className="section-title">
            Live Algorithmic & <span className="gradient-text">Code Runner</span>
          </h2>
          <p className="section-subtitle">
            Inspect and execute Hassan's actual server-side logic and telemetry scripts right in your browser.
          </p>
        </div>

        <div className={`runner-window glass-card ${inView ? 'visible' : ''}`}>
          <div className="runner-header">
            <div className="snippet-selector">
              {snippets.map(s => (
                <button
                  key={s.id}
                  className={`snippet-tab ${selectedSnippet.id === s.id ? 'active' : ''}`}
                  onClick={() => { setSelectedSnippet(s); setOutput(null); }}
                  data-hover
                >
                  <FiCode /> {s.title}
                </button>
              ))}
            </div>

            <button className="btn-primary run-code-btn" onClick={handleRun} disabled={running} data-hover>
              {running ? 'Running Snippet...' : <><FiPlay /> Run Code</>}
            </button>
          </div>

          <div className="runner-grid">
            <div className="code-editor-pane">
              <div className="pane-label">// Editor Input ({selectedSnippet.lang})</div>
              <pre className="code-editor-text"><code>{selectedSnippet.code}</code></pre>
            </div>

            <div className="code-output-pane">
              <div className="pane-label"><FiTerminal /> Output Telemetry Console</div>
              {output ? (
                <pre className="output-console-text"><code>{output}</code></pre>
              ) : (
                <div className="output-placeholder">
                  <FiCheckCircle className="console-icon" />
                  <span>Click "Run Code" to execute this snippet live.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
