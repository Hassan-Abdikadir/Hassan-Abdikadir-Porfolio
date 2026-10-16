import React, { useState, useEffect } from 'react';
import { BarChart3, Database, Activity, Download, Search, RefreshCw, Filter, ArrowUpDown, Server, Cpu, HardDrive } from 'lucide-react';
import { soundEngine } from '../AudioSynthesizer';

export default function DataLabTab() {
  const [activeDataset, setActiveDataset] = useState('ai_models'); // 'ai_models' | 'tech_stack' | 'crypto_gaming'
  const [searchTerm, setSearchTerm] = useState('');
  const [sortAsc, setSortAsc] = useState(false);
  
  // Real-time metric stream state
  const [metrics, setMetrics] = useState({
    throughput: 1240,
    latency: 14,
    nodesActive: 94,
    entropy: 42
  });

  const [history, setHistory] = useState([40, 55, 35, 70, 65, 80, 75, 90, 85, 95]);

  // Simulate real-time streaming data pulses
  useEffect(() => {
    const timer = setInterval(() => {
      setMetrics((prev) => ({
        throughput: Math.floor(1200 + Math.random() * 200),
        latency: Math.floor(12 + Math.random() * 6),
        nodesActive: Math.min(100, Math.max(85, Math.floor(prev.nodesActive + (Math.random() * 6 - 3)))),
        entropy: Math.floor(35 + Math.random() * 20)
      }));

      setHistory((prev) => {
        const nextVal = Math.floor(40 + Math.random() * 55);
        return [...prev.slice(1), nextVal];
      });
    }, 2000);

    return () => clearInterval(timer);
  }, []);


  // Dataset Collections
  const datasets = {
    ai_models: [
      { id: 1, name: 'QuantumMind-v9', category: 'LLM Reasoning', throughput: 850, accuracy: '98.4%', latency: '12ms', rank: 1 },
      { id: 2, name: 'CyberGPT Nexus', category: 'Generative Code', throughput: 920, accuracy: '96.8%', latency: '15ms', rank: 2 },
      { id: 3, name: 'VisionSynth Pro', category: 'Multimodal Art', throughput: 640, accuracy: '94.2%', latency: '22ms', rank: 3 },
      { id: 4, name: 'NeuralLogic X', category: 'Math & Symbolic', throughput: 780, accuracy: '97.1%', latency: '18ms', rank: 4 },
      { id: 5, name: 'AudioPulse Synth', category: 'Speech & Audio', throughput: 510, accuracy: '92.5%', latency: '10ms', rank: 5 },
    ],
    tech_stack: [
      { id: 1, name: 'React 19 + Vite', category: 'Frontend', throughput: 9800, accuracy: '99.1%', latency: '2ms', rank: 1 },
      { id: 2, name: 'Node.js Microservices', category: 'Backend', throughput: 8400, accuracy: '97.9%', latency: '8ms', rank: 2 },
      { id: 3, name: 'PostgreSQL + Prisma', category: 'Database', throughput: 7600, accuracy: '99.8%', latency: '5ms', rank: 3 },
      { id: 4, name: 'Tailwind / Vanilla CSS', category: 'Styling', throughput: 9100, accuracy: '98.5%', latency: '1ms', rank: 4 },
      { id: 5, name: 'Web Audio API Engine', category: 'Interactive Audio', throughput: 6200, accuracy: '99.5%', latency: '0ms', rank: 5 },
    ],
    crypto_gaming: [
      { id: 1, name: 'Cyber Token ($NEX)', category: 'Utility', throughput: 45000, accuracy: '+24.5%', latency: '0.4s', rank: 1 },
      { id: 2, name: 'Quantum Core ($QNT)', category: 'Governance', throughput: 31000, accuracy: '+18.2%', latency: '1.2s', rank: 2 },
      { id: 3, name: 'Synth Gold ($SGLD)', category: 'Gaming Asset', throughput: 28000, accuracy: '+12.0%', latency: '0.8s', rank: 3 },
      { id: 4, name: 'Byte Shield ($SHLD)', category: 'Security', throughput: 19500, accuracy: '+8.7%', latency: '0.5s', rank: 4 },
      { id: 5, name: 'Aether Gem ($AETH)', category: 'NFT Standard', throughput: 14200, accuracy: '+31.4%', latency: '2.1s', rank: 5 },
    ]
  };

  const currentList = datasets[activeDataset] || [];

  const filteredList = currentList
    .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.category.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => sortAsc ? a.rank - b.rank : b.rank - a.rank);

  const exportJSON = () => {
    soundEngine.playSuccess();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentList, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `nexus_dataset_${activeDataset}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Realtime Telemetry Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        
        <div className="glass-panel stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="stat-label">Neural Throughput</span>
            <Activity size={18} color="var(--neon-cyan)" />
          </div>
          <div className="stat-value text-gradient-cyan">{metrics.throughput} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>req/s</span></div>
          <div style={{ fontSize: '0.75rem', color: 'var(--neon-green)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span className="live-indicator"></span> Streaming Live
          </div>
        </div>

        <div className="glass-panel stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="stat-label">Network Latency</span>
            <Server size={18} color="var(--neon-green)" />
          </div>
          <div className="stat-value text-gradient-green">{metrics.latency} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>ms</span></div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Optimum Ping</div>
        </div>

        <div className="glass-panel stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="stat-label">Active Neural Cores</span>
            <Cpu size={18} color="var(--neon-purple)" />
          </div>
          <div className="stat-value" style={{ color: 'var(--neon-purple)' }}>{metrics.nodesActive} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>/ 100</span></div>
          <div style={{ fontSize: '0.75rem', color: 'var(--neon-cyan)' }}>{metrics.nodesActive}% Operational</div>
        </div>

        <div className="glass-panel stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="stat-label">Entropy Index</span>
            <HardDrive size={18} color="var(--neon-pink)" />
          </div>
          <div className="stat-value text-gradient-pink">{metrics.entropy} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>%</span></div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Dynamic Flux</div>
        </div>

      </div>


      {/* Main Data Visualizer Chart & Dataset Explorer Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
        
        {/* Real-time Streaming SVG Line & Bar Chart */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BarChart3 size={20} color="var(--neon-cyan)" />
              <h2 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Live Telemetry Flux Chart</h2>
            </div>
            <span className="cyber-badge cyber-badge-cyan">SVG REALTIME</span>
          </div>

          {/* SVG Animated Chart */}
          <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '12px', padding: '1.25rem', border: '1px solid var(--border-glass)' }}>
            <svg viewBox="0 0 500 180" style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
              {/* Background Grid Lines */}
              <line x1="0" y1="40" x2="500" y2="40" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
              <line x1="0" y1="90" x2="500" y2="90" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
              <line x1="0" y1="140" x2="500" y2="140" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />

              {/* Bar Chart Visualization */}
              {history.map((val, idx) => {
                const x = idx * 48 + 20;
                const h = (val / 100) * 130;
                const y = 160 - h;
                return (
                  <g key={idx}>
                    <rect
                      x={x}
                      y={y}
                      width="24"
                      height={h}
                      rx="4"
                      fill={idx % 2 === 0 ? 'url(#barGrad1)' : 'url(#barGrad2)'}
                      opacity="0.85"
                    />
                    <text x={x + 12} y={y - 6} textAnchor="middle" fill="var(--neon-cyan)" fontSize="10" fontFamily="Fira Code">
                      {val}
                    </text>
                  </g>
                );
              })}

              {/* SVG Gradients */}
              <defs>
                <linearGradient id="barGrad1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00f0ff" />
                  <stop offset="100%" stopColor="#7000ff" />
                </linearGradient>
                <linearGradient id="barGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ff007f" />
                  <stop offset="100%" stopColor="#ff5400" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            📊 Chart automatically updates live values every 2 seconds simulating cloud telemetry streams.
          </p>
        </div>


        {/* Dynamic Dataset Explorer & Table */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Database size={20} color="var(--neon-green)" />
              <h2 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Synthetic Dataset Explorer</h2>
            </div>
            
            <button onClick={exportJSON} className="btn-cyber btn-cyber-green" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>
              <Download size={14} /> Export JSON
            </button>
          </div>

          {/* Selector Tabs for Datasets */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => { soundEngine.playClick(); setActiveDataset('ai_models'); }}
              className={`cyber-badge ${activeDataset === 'ai_models' ? 'cyber-badge-cyan' : ''}`}
              style={{ cursor: 'pointer', padding: '0.5rem 0.75rem' }}
            >
              🤖 AI Models
            </button>
            <button
              onClick={() => { soundEngine.playClick(); setActiveDataset('tech_stack'); }}
              className={`cyber-badge ${activeDataset === 'tech_stack' ? 'cyber-badge-green' : ''}`}
              style={{ cursor: 'pointer', padding: '0.5rem 0.75rem' }}
            >
              💻 Tech Stack
            </button>
            <button
              onClick={() => { soundEngine.playClick(); setActiveDataset('crypto_gaming'); }}
              className={`cyber-badge ${activeDataset === 'crypto_gaming' ? 'cyber-badge-pink' : ''}`}
              style={{ cursor: 'pointer', padding: '0.5rem 0.75rem' }}
            >
              🪙 Tokens & Assets
            </button>
          </div>

          {/* Search Bar */}
          <div style={{ position: 'relative' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              className="cyber-input"
              style={{ paddingLeft: '2.4rem', fontSize: '0.85rem' }}
              placeholder="Search dataset items or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-glass)', textAlign: 'left', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.6rem 0.5rem', cursor: 'pointer' }} onClick={() => setSortAsc(!sortAsc)}>
                    Rank <ArrowUpDown size={12} style={{ display: 'inline' }} />
                  </th>
                  <th style={{ padding: '0.6rem 0.5rem' }}>Name</th>
                  <th style={{ padding: '0.6rem 0.5rem' }}>Category</th>
                  <th style={{ padding: '0.6rem 0.5rem' }}>Throughput</th>
                  <th style={{ padding: '0.6rem 0.5rem' }}>Score</th>
                </tr>
              </thead>
              <tbody>
                {filteredList.map((item) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.2s' }}>
                    <td style={{ padding: '0.6rem 0.5rem', fontFamily: 'var(--font-mono)', color: 'var(--neon-cyan)' }}>#{item.rank}</td>
                    <td style={{ padding: '0.6rem 0.5rem', fontWeight: '600' }}>{item.name}</td>
                    <td style={{ padding: '0.6rem 0.5rem', color: 'var(--text-muted)' }}>{item.category}</td>
                    <td style={{ padding: '0.6rem 0.5rem', fontFamily: 'var(--font-mono)' }}>{item.throughput}</td>
                    <td style={{ padding: '0.6rem 0.5rem', color: 'var(--neon-green)', fontWeight: 'bold' }}>{item.accuracy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>

    </div>
  );
}
