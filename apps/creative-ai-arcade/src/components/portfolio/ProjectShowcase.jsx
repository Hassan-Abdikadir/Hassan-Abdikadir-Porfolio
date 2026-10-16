import React, { useState } from 'react';
import { ExternalLink, Github, Layers, Star, GitFork, ShieldCheck, Sparkles, Cpu } from 'lucide-react';
import { soundEngine } from '../AudioSynthesizer';

export default function ProjectShowcase() {
  const [selectedArch, setSelectedArch] = useState(null);

  const projects = [
    {
      id: 'nexus',
      title: 'NEXUS // AI Creative Arcade & Data Lab',
      desc: 'Unprecedented web application combining AI prompt engineering, real-time data telemetry charts, Web Audio sound synthesis, and gamified RPG card battler.',
      tech: ['React 19', 'Vite', 'Web Audio API', 'HTML5 Canvas', 'Vanilla CSS'],
      stars: 142,
      forks: 38,
      status: 'PRODUCTION',
      arch: 'React UI ➔ Web Audio Engine ➔ Canvas Physics Render ➔ Realtime SVG Telemetry'
    },
    {
      id: 'lms',
      title: 'Digital Education LMS Platform',
      desc: 'Full-stack course creation & student dashboard suite with high-throughput video streaming, course analytics, and instructor portal workflow.',
      tech: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT Auth'],
      stars: 98,
      forks: 24,
      status: 'LIVE',
      arch: 'Client SPA ➔ Express REST Controllers ➔ Mongoose Schema Validation ➔ MongoDB Storage'
    },
    {
      id: 'auth',
      title: 'Cyber Security & Auth Suite',
      desc: 'Enterprise authentication engine featuring IP geo-fencing, multi-tab token state, recovery security codes, and audit scanners.',
      tech: ['Node.js', 'JWT', 'Bcrypt', 'IP Geo-Fence', 'Express Security'],
      stars: 115,
      forks: 31,
      status: 'ENTERPRISE',
      arch: 'Client Handshake ➔ JWT Verification Middleware ➔ IP Geo-Fence Scanner ➔ Encrypted Database'
    }
  ];

  return (
    <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Layers size={24} color="var(--neon-cyan)" />
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '800' }}>FEATURED SOFTWARE PROJECTS & ARCHITECTURE</h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Explore engineered applications and system architecture blueprints</p>
          </div>
        </div>

        <span className="cyber-badge cyber-badge-cyan">3 PRODUCTION APPS</span>
      </div>

      {/* Projects Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
        {projects.map((p) => (
          <div
            key={p.id}
            style={{
              background: 'rgba(10, 16, 28, 0.75)',
              border: '1px solid var(--border-glass)',
              borderRadius: '16px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              transition: 'all 0.3s ease'
            }}
            className="glass-panel-interactive"
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="cyber-badge cyber-badge-pink">{p.status}</span>
              <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                <span>⭐ {p.stars}</span>
                <span>🍴 {p.forks}</span>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--neon-cyan)', marginBottom: '0.4rem' }}>
                {p.title}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                {p.desc}
              </p>
            </div>

            {/* Tech Stack Pills */}
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {p.tech.map((t, idx) => (
                <span key={idx} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.72rem', fontFamily: 'var(--font-mono)' }}>
                  {t}
                </span>
              ))}
            </div>

            {/* Architecture Toggle */}
            <button
              onClick={() => { soundEngine.playClick(); setSelectedArch(selectedArch === p.id ? null : p.id); }}
              className="btn-cyber"
              style={{ padding: '0.4rem 0.75rem', fontSize: '0.78rem', justifyContent: 'center' }}
            >
              <Cpu size={14} /> {selectedArch === p.id ? 'Hide Architecture' : 'View System Architecture'}
            </button>

            {selectedArch === p.id && (
              <div style={{ background: 'rgba(0,0,0,0.6)', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--border-glow)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--neon-green)' }}>
                ⚙️ {p.arch}
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}
