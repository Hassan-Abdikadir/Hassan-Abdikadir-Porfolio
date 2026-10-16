import React, { useState } from 'react';
import { Trophy, Zap, CheckCircle2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../../services/AudioSynthesizer';

export default function RpgSkillTree() {
  const [xp, setXp] = useState(2450);
  const [activeSkill, setActiveSkill] = useState(null);

  const skillCategories = [
    {
      title: "Frontend Engineering",
      color: "#00f0ff",
      skills: [
        { id: 'react', name: 'React 19 & Hooks', level: 'Mastery (98%)', xpVal: 150, desc: 'Advanced state management, custom hooks, Error Boundaries, dynamic routing, component architecture.' },
        { id: 'js', name: 'Modern JavaScript (ES6+)', level: 'Mastery (96%)', xpVal: 120, desc: 'Async/Await, Promises, Closures, DOM optimization, Web Worker threads, Event Loop mechanics.' },
        { id: 'css', name: 'Vanilla CSS & Cyber UI Systems', level: 'Mastery (99%)', xpVal: 140, desc: 'CSS Variables design tokens, glassmorphism, responsive grid/flexbox, keyframe neon glow animations.' }
      ]
    },
    {
      title: "Backend & Systems Architecture",
      color: "#9d4edd",
      skills: [
        { id: 'node', name: 'Node.js & Express APIs', level: 'Senior (94%)', xpVal: 140, desc: 'RESTful API controllers, middleware security, async error handlers, scalable microservices.' },
        { id: 'db', name: 'MongoDB & Data Modeling', level: 'Advanced (91%)', xpVal: 130, desc: 'Mongoose schemas, aggregation pipelines, indexing, transactional integrity, data sanitization.' },
        { id: 'auth', name: 'JWT & Security Geo-Fencing', level: 'Advanced (93%)', xpVal: 140, desc: 'Multi-tab auth state, IP geo-fencing, audit security scanners, bcrypt password hashing.' }
      ]
    },
    {
      title: "Creative & Interactive Innovation",
      color: "#ff007f",
      skills: [
        { id: 'audio', name: 'Web Audio API Sound Engine', level: 'Mastery (97%)', xpVal: 160, desc: 'Native browser audio synthesis, pentatonic scales, zero-latency sound FX, oscillator nodes.' },
        { id: 'canvas', name: 'HTML5 Canvas & Physics', level: 'Mastery (95%)', xpVal: 150, desc: 'Generative particle physics, matrix rain rendering, gravitational cursor tracking, 60 FPS animation loops.' }
      ]
    }
  ];

  const handleNodeClick = (skill) => {
    soundEngine.playSuccess();
    setActiveSkill(skill);
    setXp((prev) => prev + skill.xpVal);
    confetti({ particleCount: 30, spread: 50 });
  };

  return (
    <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Trophy size={24} color="#ffd700" />
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '800' }}>RPG SKILL TREE & ACHIEVEMENT MATRIX</h2>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Click any skill node to view details and earn XP points</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="cyber-badge cyber-badge-cyan" style={{ fontSize: '0.85rem' }}>
            👑 LEVEL 18 SENIOR ARCHITECT
          </div>
          <div className="cyber-badge cyber-badge-pink" style={{ fontSize: '0.85rem' }}>
            ⚡ {xp} TOTAL XP
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
        {skillCategories.map((cat, cIdx) => (
          <div
            key={cIdx}
            style={{
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '14px',
              padding: '1.25rem',
              border: `1px solid ${cat.color}33`,
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}
          >
            <div style={{ fontWeight: '800', fontSize: '1rem', color: cat.color, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Zap size={18} /> {cat.title}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {cat.skills.map((skill) => (
                <div
                  key={skill.id}
                  onClick={() => handleNodeClick(skill)}
                  style={{
                    background: activeSkill?.id === skill.id ? `${cat.color}22` : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${activeSkill?.id === skill.id ? cat.color : 'rgba(255,255,255,0.08)'}`,
                    padding: '0.85rem',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <CheckCircle2 size={16} color={cat.color} />
                    <div>
                      <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>{skill.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{skill.level}</div>
                    </div>
                  </div>
                  <span className="cyber-badge cyber-badge-cyan" style={{ fontSize: '0.7rem' }}>
                    +{skill.xpVal} XP
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {activeSkill && (
        <div style={{ background: 'rgba(0, 240, 255, 0.08)', padding: '1.25rem', borderRadius: '12px', border: '1px solid #00f0ff', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          <Sparkles size={24} color="#00f0ff" style={{ flexShrink: 0 }} />
          <div>
            <h4 style={{ fontWeight: '800', fontSize: '1rem', color: '#00f0ff', marginBottom: '0.25rem' }}>
              {activeSkill.name} — {activeSkill.level}
            </h4>
            <p style={{ fontSize: '0.88rem', color: '#f1f5f9', lineHeight: '1.5' }}>
              {activeSkill.desc}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
