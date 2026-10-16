import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeaderBanner from './components/HeaderBanner';
import AiHassanChat from './components/portfolio/AiHassanChat';
import HargeisaLocationRadar from './components/portfolio/HargeisaLocationRadar';
import ProjectShowcase from './components/portfolio/ProjectShowcase';
import CyberTerminal from './components/portfolio/CyberTerminal';
import RpgSkillTree from './components/portfolio/RpgSkillTree';
import AiStudioTab from './components/tabs/AiStudioTab';
import DataLabTab from './components/tabs/DataLabTab';
import CreativeStudioTab from './components/tabs/CreativeStudioTab';
import FunArcadeTab from './components/tabs/FunArcadeTab';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'projects' | 'skills' | 'ai' | 'arcade'
  const [soundOn, setSoundOn] = useState(true);

  return (
    <div className="app-container">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        soundOn={soundOn}
        setSoundOn={setSoundOn}
      />

      {/* Ticker Banner */}
      <HeaderBanner />

      {/* Main View Router */}
      <main style={{ minHeight: '650px' }}>
        
        {/* TAB 1: OVERVIEW & AI DIGITAL TWIN */}
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
            <AiHassanChat />
            <HargeisaLocationRadar />
          </div>
        )}

        {/* TAB 2: PROJECTS & CYBER CLI TERMINAL */}
        {activeTab === 'projects' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <ProjectShowcase />
            <CyberTerminal />
          </div>
        )}

        {/* TAB 3: RPG SKILL TREE */}
        {activeTab === 'skills' && (
          <RpgSkillTree />
        )}

        {/* TAB 4: AI & DATA STUDIO */}
        {activeTab === 'ai' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <AiStudioTab />
            <DataLabTab />
          </div>
        )}

        {/* TAB 5: CREATIVE & FUN ARCADE */}
        {activeTab === 'arcade' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <CreativeStudioTab />
            <FunArcadeTab />
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="glass-panel" style={{ 
        padding: '1.25rem 1.5rem', 
        marginTop: '1rem', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        flexWrap: 'wrap', 
        gap: '1rem',
        fontSize: '0.85rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
          <Sparkles size={16} color="var(--neon-cyan)" />
          <span>HASSAN ABDIKADIR // ULTIMATE CYBER PORTFOLIO &copy; 2026</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-dim)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
          <span>FULLSTACK SOFTWARE ENGINEER</span>
          <span>•</span>
          <span style={{ color: 'var(--neon-green)' }}>Hargeisa, Somaliland</span>
        </div>
      </footer>
    </div>
  );
}
