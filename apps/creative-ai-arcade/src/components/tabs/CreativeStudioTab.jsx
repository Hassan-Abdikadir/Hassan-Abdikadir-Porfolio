import React, { useState, useRef, useEffect } from 'react';
import { Palette, Sparkles, Sliders, Volume2, Copy, Check, RefreshCw, Layers, MousePointer, Flame } from 'lucide-react';
import { soundEngine } from '../AudioSynthesizer';

export default function CreativeStudioTab() {
  const [creativeSub, setCreativeSub] = useState('particles'); // 'particles' | 'palettes' | 'synth'

  // --- 1. PARTICLE CANVAS ENGINE STATE ---
  const canvasRef = useRef(null);
  const [particleMode, setParticleMode] = useState('Attract'); // 'Attract' | 'Repel' | 'Orbit'
  const [particleCount, setParticleCount] = useState(120);
  const [colorScheme, setColorScheme] = useState('Cyber'); // 'Cyber' | 'Synthwave' | 'Matrix' | 'Solar'

  useEffect(() => {
    if (creativeSub !== 'particles') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animId;
    let width = (canvas.width = canvas.parentElement.clientWidth || 600);
    let height = (canvas.height = 340);

    const handleResize = () => {
      if (canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = 340;
      }
    };
    window.addEventListener('resize', handleResize);

    // Particle Array
    const particles = [];
    const getColors = () => {
      if (colorScheme === 'Cyber') return ['#00f0ff', '#7000ff', '#ff007f', '#00ff88'];
      if (colorScheme === 'Synthwave') return ['#ff007f', '#ffb703', '#ff5400', '#9d4edd'];
      if (colorScheme === 'Matrix') return ['#00ff88', '#00f0ff', '#39ff14', '#00441b'];
      return ['#ff5400', '#ffb703', '#ff007f', '#ffffff'];
    };

    const colors = getColors();

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: Math.random() * 3.5 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.7 + 0.3
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const onClickCanvas = (e) => {
      soundEngine.playLaser();
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      // Burst 15 new particles
      for (let i = 0; i < 15; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 2;
        particles.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: Math.random() * 4 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1
        });
      }
      if (particles.length > 250) particles.splice(0, 15);
    };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('click', onClickCanvas);

    const render = () => {
      ctx.fillStyle = 'rgba(7, 9, 14, 0.25)'; // Trail blur
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        // Physics update
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 180) {
          const force = (180 - dist) / 180;
          if (particleMode === 'Attract') {
            p.vx += (dx / dist) * force * 0.4;
            p.vy += (dy / dist) * force * 0.4;
          } else if (particleMode === 'Repel') {
            p.vx -= (dx / dist) * force * 0.8;
            p.vy -= (dy / dist) * force * 0.8;
          } else {
            // Orbit
            p.vx += (-dy / dist) * force * 0.6;
            p.vy += (dx / dist) * force * 0.6;
          }
        }

        p.x += p.vx;
        p.y += p.vy;

        // Friction & Wall Bounce
        p.vx *= 0.97;
        p.vy *= 0.97;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (canvas) {
        canvas.removeEventListener('mousemove', onMouseMove);
        canvas.removeEventListener('click', onClickCanvas);
      }
    };
  }, [creativeSub, particleMode, particleCount, colorScheme]);


  // --- 2. GENERATIVE PALETTES STATE ---
  const [palettes, setPalettes] = useState([
    { name: 'Cyberpunk Neon', colors: ['#00f0ff', '#7000ff', '#ff007f', '#00ff88', '#07090e'] },
    { name: 'Midnight OLED', colors: ['#0b132b', '#1c2541', '#3a506b', '#5bc0be', '#6fffe9'] },
    { name: 'Synthwave Sunset', colors: ['#2b2d42', '#8d99ae', '#edf2f4', '#ef233c', '#d90429'] },
    { name: 'Quantum Aurora', colors: ['#05668d', '#028090', '#00a896', '#02c39a', '#f0f3bd'] },
  ]);
  const [copiedColor, setCopiedColor] = useState(null);

  const generateNewPalettes = () => {
    soundEngine.playSuccess();
    const hex = () => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    setPalettes([
      { name: 'Generative Cyber ' + Math.floor(Math.random() * 100), colors: [hex(), hex(), hex(), hex(), '#080c14'] },
      { name: 'Plasma Flow ' + Math.floor(Math.random() * 100), colors: [hex(), hex(), hex(), hex(), '#05070c'] },
      { name: 'Solaris Flare ' + Math.floor(Math.random() * 100), colors: [hex(), hex(), hex(), hex(), '#0a0d18'] },
      { name: 'Neon Matrix ' + Math.floor(Math.random() * 100), colors: [hex(), hex(), hex(), hex(), '#07090e'] },
    ]);
  };

  const copyColor = (code) => {
    soundEngine.playClick();
    navigator.clipboard.writeText(code);
    setCopiedColor(code);
    setTimeout(() => setCopiedColor(null), 1500);
  };


  // --- 3. WEB AUDIO SYNTH PADS STATE ---
  const synthNotes = [
    { label: 'C4 (261Hz)', freq: 261.63, color: 'var(--neon-cyan)', type: 'sine' },
    { label: 'D4 (293Hz)', freq: 293.66, color: 'var(--neon-purple)', type: 'triangle' },
    { label: 'E4 (329Hz)', freq: 329.63, color: 'var(--neon-pink)', type: 'sawtooth' },
    { label: 'G4 (392Hz)', freq: 392.00, color: 'var(--neon-green)', type: 'sine' },
    { label: 'A4 (440Hz)', freq: 440.00, color: 'var(--neon-yellow)', type: 'triangle' },
    { label: 'C5 (523Hz)', freq: 523.25, color: 'var(--neon-cyan)', type: 'square' },
    { label: 'Laser FX', isFx: true, fx: 'laser', color: 'var(--neon-orange)' },
    { label: 'Card Attack', isFx: true, fx: 'attack', color: 'var(--neon-pink)' }
  ];

  const [activePadIndex, setActivePadIndex] = useState(null);

  const handlePlayPad = (note, idx) => {
    setActivePadIndex(idx);
    setTimeout(() => setActivePadIndex(null), 300);

    if (note.isFx) {
      if (note.fx === 'laser') soundEngine.playLaser();
      if (note.fx === 'attack') soundEngine.playCardAttack();
    } else {
      soundEngine.playTone(note.freq, 0.4, note.type, 0.2);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Sub Tabs Selector */}
      <div className="glass-panel" style={{ padding: '0.6rem 1rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => { soundEngine.playClick(); setCreativeSub('particles'); }}
          className={`btn-cyber ${creativeSub === 'particles' ? '' : 'btn-cyber-pink'}`}
          style={{ opacity: creativeSub === 'particles' ? 1 : 0.7 }}
        >
          <MousePointer size={16} /> Interactive Particle Canvas
        </button>

        <button
          onClick={() => { soundEngine.playClick(); setCreativeSub('palettes'); }}
          className={`btn-cyber ${creativeSub === 'palettes' ? '' : 'btn-cyber-pink'}`}
          style={{ opacity: creativeSub === 'palettes' ? 1 : 0.7 }}
        >
          <Palette size={16} /> AI Color Palette Studio
        </button>

        <button
          onClick={() => { soundEngine.playClick(); setCreativeSub('synth'); }}
          className={`btn-cyber ${creativeSub === 'synth' ? '' : 'btn-cyber-pink'}`}
          style={{ opacity: creativeSub === 'synth' ? 1 : 0.7 }}
        >
          <Volume2 size={16} /> Web Audio Synth Pads
        </button>
      </div>


      {/* --- SUB TAB 1: INTERACTIVE PARTICLE CANVAS --- */}
      {creativeSub === 'particles' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
          
          {/* Controls */}
          <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sliders size={20} color="var(--neon-cyan)" />
              <h2 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Particle Physics Controls</h2>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                Cursor Magnet Mode:
              </label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {['Attract', 'Repel', 'Orbit'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => { soundEngine.playClick(); setParticleMode(mode); }}
                    className={`btn-cyber ${particleMode === mode ? '' : 'btn-cyber-pink'}`}
                    style={{ flex: 1, padding: '0.4rem 0.6rem', fontSize: '0.8rem', justifyContent: 'center' }}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                Color Palette Theme:
              </label>
              <select
                className="cyber-input"
                value={colorScheme}
                onChange={(e) => setColorScheme(e.target.value)}
              >
                <option value="Cyber">Cyber Neon Cyan & Magenta</option>
                <option value="Synthwave">Synthwave 80s Dusk</option>
                <option value="Matrix">Matrix Digital Green</option>
                <option value="Solar">Solar Flare Orange & Gold</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                Particle Density ({particleCount} nodes):
              </label>
              <input
                type="range"
                min="40"
                max="250"
                value={particleCount}
                onChange={(e) => setParticleCount(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--neon-cyan)' }}
              />
            </div>

            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              💡 Move mouse over canvas to attract/repel particles. Click canvas to unleash a particle burst!
            </p>
          </div>

          {/* Interactive Canvas Output */}
          <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Generative Physics Canvas</h2>
              <span className="cyber-badge cyber-badge-cyan">60 FPS REALTIME</span>
            </div>

            <div style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid var(--border-glass)', background: '#07090e' }}>
              <canvas ref={canvasRef} style={{ width: '100%', display: 'block', cursor: 'crosshair' }} />
            </div>
          </div>

        </div>
      )}


      {/* --- SUB TAB 2: AI COLOR PALETTE STUDIO --- */}
      {creativeSub === 'palettes' && (
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Palette size={24} color="var(--neon-purple)" />
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '800' }}>Generative Color Studio</h2>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Click any color to copy HEX code to clipboard</p>
              </div>
            </div>

            <button onClick={generateNewPalettes} className="btn-cyber btn-cyber-pink">
              <RefreshCw size={16} /> Generate Fresh Palettes
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {palettes.map((item, pIdx) => (
              <div key={pIdx} style={{ background: 'rgba(0,0,0,0.4)', padding: '1.25rem', borderRadius: '14px', border: '1px solid var(--border-glass)', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>{item.name}</div>
                <div style={{ display: 'flex', height: '65px', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border-glass)' }}>
                  {item.colors.map((c, cIdx) => (
                    <div
                      key={cIdx}
                      onClick={() => copyColor(c)}
                      style={{
                        flex: 1,
                        background: c,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        paddingBottom: '6px',
                        transition: 'transform 0.2s ease'
                      }}
                      title={`Copy ${c}`}
                    >
                      <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', background: 'rgba(0,0,0,0.6)', padding: '2px 4px', borderRadius: '4px', color: '#fff' }}>
                        {c}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {copiedColor && (
            <div className="cyber-badge cyber-badge-green" style={{ alignSelf: 'center', padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
              <Check size={16} /> Copied {copiedColor} to clipboard!
            </div>
          )}
        </div>
      )}


      {/* --- SUB TAB 3: WEB AUDIO SYNTH PADS --- */}
      {creativeSub === 'synth' && (
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Volume2 size={24} color="var(--neon-green)" />
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800' }}>Web Audio Synthesizer Studio</h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Interactive sound synthesizer utilizing native Web Audio API oscillators</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
            {synthNotes.map((note, idx) => (
              <button
                key={idx}
                onClick={() => handlePlayPad(note, idx)}
                style={{
                  background: activePadIndex === idx ? 'rgba(0, 240, 255, 0.3)' : 'rgba(255, 255, 255, 0.04)',
                  border: `2px solid ${activePadIndex === idx ? note.color : 'var(--border-glass)'}`,
                  boxShadow: activePadIndex === idx ? `0 0 25px ${note.color}` : 'none',
                  borderRadius: '16px',
                  padding: '2rem 1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  transform: activePadIndex === idx ? 'scale(0.96)' : 'scale(1)'
                }}
              >
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: note.color }} />
                <span style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-main)' }}>{note.label}</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  {note.isFx ? 'SFX EFFECT' : note.type.toUpperCase()}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
