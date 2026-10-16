import React, { useState } from 'react';
import AiHassanChat from '../../features/nexus/AiHassanChat';
import HargeisaLocationRadar from '../../features/nexus/HargeisaLocationRadar';
import AiStudioTab from '../../features/nexus/AiStudioTab';
import CyberTerminal from '../../features/nexus/CyberTerminal';
import RpgSkillTree from '../../features/nexus/RpgSkillTree';
import CreativeStudioTab from '../../features/nexus/CreativeStudioTab';
import FunArcadeTab from '../../features/nexus/FunArcadeTab';
import { soundEngine } from '../../services/AudioSynthesizer';
import { Sparkles, Bot, MapPin, Cpu, Terminal, Trophy, Gamepad2 } from 'lucide-react';

export default function NexusArcadeSection() {
  const [activeSub, setActiveSub] = useState('twin'); // 'twin' | 'cli' | 'skills' | 'ai' | 'arcade'

  const navs = [
    { id: 'twin', label: 'AI Digital Twin & Telemetry', icon: Bot },
    { id: 'cli', label: 'Cyber CLI & Code Sandbox', icon: Terminal },
    { id: 'skills', label: 'RPG Skill Tree Matrix', icon: Trophy },
    { id: 'ai', label: 'AI Prompt Studio & Arena', icon: Cpu },
    { id: 'arcade', label: 'Creative Synth Arcade', icon: Gamepad2 }
  ];

  const handleSubSwitch = (id) => {
    soundEngine.playClick();
    setActiveSub(id);
  };

  return (
    <section id="nexus-arcade" className="section-container" style={{ padding: '5rem 1.5rem', background: 'radial-gradient(circle at 50% 10%, rgba(0, 240, 255, 0.08), rgba(112, 0, 255, 0.04) 40%, transparent 80%)' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
          <div className="cyber-badge cyber-badge-cyan" style={{ padding: '0.45rem 1.25rem', fontSize: '0.85rem' }}>
            <Sparkles size={16} /> 2026 UNPRECEDENTED CYBER SUITE
          </div>

          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: '900', letterSpacing: '-1px', lineHeight: '1.1' }}>
            NEXUS<span className="gradient-text">//</span>AI & DIGITAL TWIN LAB
          </h2>

          <p style={{ color: '#94a3b8', maxWidth: '720px', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Experience an engineered digital twin trained on Hassan's experience, real-time satellite radar telemetry from Hargeisa, Somaliland, interactive CLI command sandboxes, RPG skill trees, and generative Web Audio synthesizers.
          </p>

          {/* Sub Navigation Switcher Pills */}
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            marginTop: '1rem',
            background: 'rgba(5, 10, 20, 0.8)',
            padding: '0.45rem',
            borderRadius: '16px',
            border: '1px solid rgba(0, 240, 255, 0.25)',
            boxShadow: '0 0 25px rgba(0, 240, 255, 0.1)',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            {navs.map((n) => {
              const Icon = n.icon;
              const isActive = activeSub === n.id;
              return (
                <button
                  key={n.id}
                  onClick={() => handleSubSwitch(n.id)}
                  className={`btn-cyber ${isActive ? '' : 'btn-cyber-pink'}`}
                  style={{
                    padding: '0.55rem 1.1rem',
                    fontSize: '0.85rem',
                    opacity: isActive ? 1 : 0.65,
                    border: isActive ? '1px solid #00f0ff' : '1px solid transparent'
                  }}
                >
                  <Icon size={16} /> {n.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Sub-Module Router */}
        <div style={{ minHeight: '520px' }}>
          
          {/* 1. AI TWIN & HARGEISA TELEMETRY RADAR */}
          {activeSub === 'twin' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              <AiHassanChat />
              <HargeisaLocationRadar />
            </div>
          )}

          {/* 2. CYBER CLI & LIVE ALGORITHM RUNNER */}
          {activeSub === 'cli' && (
            <CyberTerminal />
          )}

          {/* 3. RPG SKILL TREE MATRIX */}
          {activeSub === 'skills' && (
            <RpgSkillTree />
          )}

          {/* 4. AI PROMPT STUDIO & MODEL BATTLE ARENA */}
          {activeSub === 'ai' && (
            <AiStudioTab />
          )}

          {/* 5. CREATIVE SYNTH ARCADE & PARTICLES */}
          {activeSub === 'arcade' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <CreativeStudioTab />
              <FunArcadeTab />
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
