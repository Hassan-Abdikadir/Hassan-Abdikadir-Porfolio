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
    <section id="nexus-arcade" className="section nexus-arcade-section">
      <div className="grid-bg" />
      <div className="container" style={{ maxWidth: '1240px', display: 'flex', flexDirection: 'column', gap: '2.25rem', position: 'relative', zIndex: 1 }}>
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-label">
            <Sparkles size={14} style={{ marginRight: '4px' }} /> 2026 UNPRECEDENTED CYBER SUITE
          </div>

          <h2 className="section-title">
            NEXUS // <span className="gradient-text">AI &amp; DIGITAL TWIN LAB</span>
          </h2>

          <p className="section-subtitle">
            Experience an engineered digital twin trained on Hassan&apos;s experience, real-time satellite radar telemetry from Hargeisa, Somaliland, interactive CLI command sandboxes, RPG skill trees, and generative Web Audio synthesizers.
          </p>

          {/* Sub Navigation Switcher Pills */}
          <div className="nexus-sub-nav glass-card">
            {navs.map((n) => {
              const Icon = n.icon;
              const isActive = activeSub === n.id;
              return (
                <button
                  key={n.id}
                  onClick={() => handleSubSwitch(n.id)}
                  className={`nexus-tab-btn ${isActive ? 'active' : ''}`}
                  data-hover
                >
                  <Icon size={16} />
                  <span>{n.label}</span>
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
