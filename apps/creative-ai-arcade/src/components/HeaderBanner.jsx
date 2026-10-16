import React, { useState, useEffect } from 'react';
import { Zap, Terminal, Shield, RefreshCw } from 'lucide-react';

export default function HeaderBanner() {
  const [tickerIndex, setTickerIndex] = useState(0);
  
  const tickerItems = [
    "🤖 NEURAL ENGINE: Quantum Prompt Model v4.8 active",
    "📊 DATA STREAM: Real-time telemetry monitoring 1,240 nodes/sec",
    "🎨 CREATIVE CANVAS: Generative Particle Engine running at 60 FPS",
    "🎮 FUN ARCADE: Cyber Card Arena tournament status: ACTIVE",
    "💡 TIP: Sound FX use Web Audio API synthesis for zero latency"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % tickerItems.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="glass-panel" style={{ 
      padding: '0.65rem 1.25rem', 
      background: 'linear-gradient(90deg, rgba(0,240,255,0.05) 0%, rgba(157,78,221,0.05) 50%, rgba(255,0,127,0.05) 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1rem',
      fontSize: '0.85rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flex: 1, minWidth: 0 }}>
        <Zap size={16} color="var(--neon-cyan)" style={{ flexShrink: 0 }} />
        <span className="mono-tag" style={{ color: 'var(--neon-cyan)', flexShrink: 0 }}>SYSTEM TELEMETRY:</span>
        <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', color: 'var(--text-main)', fontWeight: '500' }}>
          {tickerItems[tickerIndex]}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
          <Shield size={14} color="var(--neon-green)" />
          <span>LATENCY: 14ms</span>
        </div>
      </div>
    </div>
  );
}
