import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Copy, Check, Play, Flame } from 'lucide-react';
import { soundEngine } from '../../services/AudioSynthesizer';

export default function CreativeStudioTab() {
  const [synthNote, setSynthNote] = useState('C4');
  const canvasRef = useRef(null);

  const notes = [
    { name: 'C4', freq: 261.63 },
    { name: 'D4', freq: 293.66 },
    { name: 'E4', freq: 329.63 },
    { name: 'G4', freq: 392.00 },
    { name: 'A4', freq: 440.00 },
    { name: 'C5', freq: 523.25 },
  ];

  const playNote = (note) => {
    setSynthNote(note.name);
    soundEngine.playTone(note.freq, 0.35, 'triangle', 0.15);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      radius: Math.random() * 3 + 1,
      color: Math.random() > 0.5 ? '#00f0ff' : '#ff007f'
    }));

    const render = () => {
      ctx.fillStyle = 'rgba(7, 9, 14, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Sparkles size={24} color="#00f0ff" />
          <h3 style={{ fontSize: '1.2rem', fontWeight: '800' }}>WEB AUDIO SYNTHESIZER & 60FPS PHYSICS</h3>
        </div>
        <span className="cyber-badge cyber-badge-cyan">INTERACTIVE CANVAS</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
        {/* Synth Pads */}
        <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1.25rem', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.75rem', color: '#00f0ff' }}>
            🎹 Web Audio Synth Pads (Pentatonic Scale):
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
            {notes.map((n) => (
              <button
                key={n.name}
                onClick={() => playNote(n)}
                className="btn-cyber"
                style={{
                  justifyContent: 'center',
                  padding: '1rem',
                  fontSize: '1rem',
                  fontWeight: '800',
                  background: synthNote === n.name ? 'rgba(0, 240, 255, 0.3)' : 'rgba(255,255,255,0.05)'
                }}
              >
                {n.name}
              </button>
            ))}
          </div>
        </div>

        {/* Physics Canvas */}
        <div style={{ background: '#04070d', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
          <canvas
            ref={canvasRef}
            width={450}
            height={200}
            style={{ width: '100%', height: '100%', display: 'block' }}
          />
        </div>
      </div>
    </div>
  );
}
