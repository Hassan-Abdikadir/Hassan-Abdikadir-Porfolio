import React from 'react';
import { UserCheck, Code, Trophy, Cpu, Gamepad2, Volume2, VolumeX, Sparkles, Activity } from 'lucide-react';
import { soundEngine } from './AudioSynthesizer';

export default function Navbar({ activeTab, setActiveTab, soundOn, setSoundOn }) {
  const tabs = [
    { id: 'overview', label: 'Overview & AI Twin', icon: UserCheck },
    { id: 'projects', label: 'Projects & CLI', icon: Code },
    { id: 'skills', label: 'RPG Skill Tree', icon: Trophy },
    { id: 'ai', label: 'AI & Data Studio', icon: Cpu },
    { id: 'arcade', label: 'Creative Arcade', icon: Gamepad2 },
  ];

  const handleTabClick = (id) => {
    soundEngine.playClick();
    setActiveTab(id);
  };

  const toggleSound = () => {
    const nextState = !soundOn;
    setSoundOn(nextState);
    soundEngine.enabled = nextState;
    if (nextState) soundEngine.playSuccess();
  };

  return (
    <header className="glass-panel" style={{ padding: '0.85rem 1.5rem', marginBottom: '0.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ 
            width: '42px', 
            height: '42px', 
            borderRadius: '12px', 
            background: 'var(--grad-cyan-purple)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: 'var(--glow-cyan)'
          }}>
            <Sparkles size={22} color="#fff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h1 style={{ fontSize: '1.25rem', fontWeight: '800', letterSpacing: '-0.5px' }}>
                HASSAN<span className="text-gradient-cyan">//</span>PORTFOLIO
              </h1>
              <span className="cyber-badge cyber-badge-cyan">
                <span className="live-indicator"></span> ONLINE
              </span>
            </div>
            <p className="mono-tag" style={{ fontSize: '0.65rem' }}>HASSAN ABDIKADIR • HARGEISA, SOMALILAND</p>
          </div>
        </div>

        {/* Center Nav Tabs */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(0, 0, 0, 0.3)', padding: '0.35rem', borderRadius: '14px', border: '1px solid var(--border-glass)', flexWrap: 'wrap' }}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`nav-tab-btn ${isActive ? 'active' : ''}`}
                style={{ padding: '0.6rem 1rem', fontSize: '0.88rem' }}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button 
            onClick={toggleSound}
            className="btn-cyber"
            style={{ padding: '0.5rem 0.85rem', fontSize: '0.8rem' }}
            title="Toggle Web Audio Synthesizer Sound FX"
          >
            {soundOn ? <Volume2 size={16} color="var(--neon-green)" /> : <VolumeX size={16} color="var(--text-dim)" />}
            <span>{soundOn ? 'SFX ON' : 'SFX OFF'}</span>
          </button>
        </div>

      </div>
    </header>
  );
}
