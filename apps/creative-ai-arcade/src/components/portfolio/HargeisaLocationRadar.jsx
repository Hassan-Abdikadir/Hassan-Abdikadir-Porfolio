import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Globe, Signal, Shield, CheckCircle } from 'lucide-react';

export default function HargeisaLocationRadar() {
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      // Format to GMT+3 (Somaliland timezone)
      const options = { timeZone: 'Africa/Mogadishu', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
      setLocalTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', height: '100%', minHeight: '480px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <MapPin size={22} color="var(--neon-green)" />
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800' }}>HARGEISA_TELEMETRY // RADAR</h3>
            <span className="mono-tag" style={{ fontSize: '0.65rem' }}>SOMALILAND (GMT+3) BASE OPERATING HUB</span>
          </div>
        </div>
        <span className="cyber-badge cyber-badge-green">
          <span className="live-indicator"></span> SATELLITE ONLINE
        </span>
      </div>

      {/* SVG Interactive Radar Animation */}
      <div style={{ background: '#030712', borderRadius: '14px', border: '1px solid var(--border-glass)', padding: '1rem', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg viewBox="0 0 400 200" style={{ width: '100%', height: 'auto' }}>
          {/* Radar Circles */}
          <circle cx="200" cy="100" r="80" stroke="rgba(0, 255, 136, 0.15)" strokeWidth="1" fill="none" />
          <circle cx="200" cy="100" r="50" stroke="rgba(0, 255, 136, 0.25)" strokeWidth="1" fill="none" />
          <circle cx="200" cy="100" r="20" stroke="rgba(0, 255, 136, 0.4)" strokeWidth="1" fill="none" />

          {/* Crosshair Lines */}
          <line x1="200" y1="10" x2="200" y2="190" stroke="rgba(0, 255, 136, 0.15)" strokeWidth="1" />
          <line x1="10" y1="100" x2="390" y2="100" stroke="rgba(0, 255, 136, 0.15)" strokeWidth="1" />

          {/* Hargeisa Ping Dot */}
          <circle cx="200" cy="100" r="6" fill="var(--neon-green)">
            <animate attributeName="r" values="4;12;4" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
          </circle>

          {/* Label Text */}
          <text x="215" y="95" fill="var(--neon-green)" fontSize="12" fontFamily="Fira Code" fontWeight="bold">
            HARGEISA, SOMALILAND
          </text>
          <text x="215" y="112" fill="var(--text-muted)" fontSize="10" fontFamily="Fira Code">
            9.5600° N, 44.0650° E
          </text>
        </svg>
      </div>

      {/* Local Time & Telemetry Status Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
        
        <div style={{ background: 'rgba(0,0,0,0.4)', padding: '0.85rem', borderRadius: '10px', border: '1px solid var(--border-glass)', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <Clock size={14} color="var(--neon-cyan)" /> LOCAL TIME:
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: '800', fontFamily: 'var(--font-mono)', color: 'var(--neon-cyan)' }}>
            {localTime || '12:00:00 PM'}
          </div>
        </div>

        <div style={{ background: 'rgba(0,0,0,0.4)', padding: '0.85rem', borderRadius: '10px', border: '1px solid var(--border-glass)', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <Globe size={14} color="var(--neon-green)" /> REMOTE STATUS:
          </div>
          <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--neon-green)' }}>
            READY FOR GLOBAL ROLES
          </div>
        </div>

      </div>

      <div style={{ background: 'rgba(0, 255, 136, 0.08)', padding: '0.85rem', borderRadius: '10px', border: '1px solid rgba(0, 255, 136, 0.25)', fontSize: '0.82rem', color: 'var(--text-main)', lineHeight: '1.5' }}>
        📍 <strong>High-Speed Connectivity:</strong> Hassan operates with fiber optic infrastructure, zero-downtime power backup, and seamless coordination across US, European, and Asian timezones.
      </div>
    </div>
  );
}
