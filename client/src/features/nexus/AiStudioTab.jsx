import React, { useState, useRef, useEffect } from 'react';
import { Cpu, Sparkles, Wand2, Swords, MessageSquareText, Copy, Check, Sliders, RefreshCw, Flame, BrainCircuit, Terminal } from 'lucide-react';
import { soundEngine } from '../../services/AudioSynthesizer';

export default function AiStudioTab() {
  const [subTab, setSubTab] = useState('generator'); // 'generator' | 'sentiment' | 'battle'

  // --- 1. AI ART PROMPT GENERATOR STATE ---
  const [rawIdea, setRawIdea] = useState('Cyberpunk neon city with floating vehicles and glowing rain');
  const [stylePreset, setStylePreset] = useState('Cyberpunk');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [lighting, setLighting] = useState('Volumetric Neon Glow');
  const [isGenerating, setIsGenerating] = useState(false);
  const [genProgress, setGenProgress] = useState(0);
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef(null);

  const stylePresets = [
    { name: 'Cyberpunk', bg: 'linear-gradient(135deg, #00f0ff, #7000ff)', keywords: 'octane render, Unreal Engine 5, ray tracing, neon cyan and magenta, high tech low life' },
    { name: 'Synthwave 80s', bg: 'linear-gradient(135deg, #ff007f, #ffb703)', keywords: 'retro synthwave aesthetic, chrome reflections, grid horizon, dusk sunset, VHS scanlines' },
    { name: 'Anime Ghibli', bg: 'linear-gradient(135deg, #00ff88, #00f0ff)', keywords: 'hand-drawn anime art style, vibrant clouds, soft watercolor lighting, Hayao Miyazaki mood' },
    { name: 'Photorealistic 8K', bg: 'linear-gradient(135deg, #e2e8f0, #475569)', keywords: '8k UHD photograph, 35mm lens, depth of field, hyper realistic textures, photorealistic masterwork' },
    { name: 'Surrealist Sci-Fi', bg: 'linear-gradient(135deg, #9d4edd, #ff007f)', keywords: 'surrealist floating monoliths, cosmic dust, quantum particle trails, Moebius style' },
  ];

  // Draw procedural canvas artwork matching the style
  const drawProceduralArt = (presetName) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear
    ctx.clearRect(0, 0, width, height);

    // Background Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    if (presetName === 'Cyberpunk') {
      bgGrad.addColorStop(0, '#0a051b');
      bgGrad.addColorStop(0.5, '#001a33');
      bgGrad.addColorStop(1, '#1b002c');
    } else if (presetName === 'Synthwave 80s') {
      bgGrad.addColorStop(0, '#1a002c');
      bgGrad.addColorStop(0.6, '#4d004d');
      bgGrad.addColorStop(1, '#ff5400');
    } else if (presetName === 'Anime Ghibli') {
      bgGrad.addColorStop(0, '#0f2b3c');
      bgGrad.addColorStop(0.5, '#1e5f74');
      bgGrad.addColorStop(1, '#00ff88');
    } else if (presetName === 'Surrealist Sci-Fi') {
      bgGrad.addColorStop(0, '#10002b');
      bgGrad.addColorStop(0.5, '#240046');
      bgGrad.addColorStop(1, '#e0aaff');
    } else {
      bgGrad.addColorStop(0, '#0f172a');
      bgGrad.addColorStop(1, '#1e293b');
    }
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Grid lines
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.15)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw glowing dynamic shapes/particles
    for (let i = 0; i < 35; i++) {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      const radius = Math.random() * 40 + 5;
      
      const g = ctx.createRadialGradient(rx, ry, 0, rx, ry, radius);
      if (presetName === 'Cyberpunk') {
        g.addColorStop(0, i % 2 === 0 ? 'rgba(0, 240, 255, 0.8)' : 'rgba(255, 0, 127, 0.8)');
      } else if (presetName === 'Synthwave 80s') {
        g.addColorStop(0, i % 2 === 0 ? 'rgba(255, 0, 127, 0.8)' : 'rgba(255, 183, 3, 0.8)');
      } else {
        g.addColorStop(0, 'rgba(0, 255, 136, 0.8)');
      }
      g.addColorStop(1, 'transparent');

      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(rx, ry, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Overlay text title on canvas artwork
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = 'bold 16px Outfit, sans-serif';
    ctx.fillText(`NEXUS GEN-ART // ${presetName.toUpperCase()}`, 20, height - 25);
    ctx.fillStyle = 'rgba(0, 240, 255, 0.8)';
    ctx.font = '12px Fira Code, monospace';
    ctx.fillText(`SEED #${Math.floor(Math.random() * 899999 + 100000)} • 8K RENDER`, 20, height - 10);
  };

  useEffect(() => {
    drawProceduralArt(stylePreset);
  }, [stylePreset]);

  const handleGeneratePrompt = () => {
    soundEngine.playLaser();
    setIsGenerating(true);
    setGenProgress(0);

    let curr = 0;
    const interval = setInterval(() => {
      curr += 20;
      setGenProgress(curr);
      if (curr >= 100) {
        clearInterval(interval);
        setIsGenerating(false);
        const presetObj = stylePresets.find(p => p.name === stylePreset);
        const compiled = `Masterpiece art of ${rawIdea}, ${presetObj.keywords}, ${lighting}, hyper-detailed, cinematic composition, --ar ${aspectRatio} --v 6.0 --q 2 --style raw`;
        setGeneratedPrompt(compiled);
        drawProceduralArt(stylePreset);
        soundEngine.playSuccess();
      }
    }, 150);
  };

  const copyToClipboard = () => {
    soundEngine.playClick();
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- 2. SENTIMENT & INTELLIGENCE LAB STATE ---
  const [inputText, setInputText] = useState('The future of artificial intelligence is not about replacing humanity, but amplifying our creative spirit into infinite dimensions.');
  const [persona, setPersona] = useState('Cyber-Philosopher');
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const personas = [
    { name: 'Cyber-Philosopher', desc: 'Deep philosophical reflections on human-machine synergy', color: 'var(--neon-purple, #9d4edd)' },
    { name: 'Code Architect', desc: 'Technical decomposition & algorithmic evaluation', color: 'var(--neon-cyan, #00f0ff)' },
    { name: 'Sci-Fi Bard', desc: 'Poetic, futuristic storytelling and rich world building', color: 'var(--neon-pink, #ff007f)' },
    { name: 'Data Analyst', desc: 'Empirical sentiment metrics, token flux & statistical scoring', color: 'var(--neon-green, #00ff88)' }
  ];

  const handleAnalyzeSentiment = () => {
    soundEngine.playClick();
    setIsAnalyzing(true);
    setTimeout(() => {
      const words = inputText.split(/\s+/).filter(Boolean);
      const wordCount = words.length;
      const charCount = inputText.length;
      const tokenEst = Math.ceil(charCount / 4);

      const positiveWords = ['future', 'intelligence', 'humanity', 'amplifying', 'creative', 'infinite', 'love', 'great', 'innovative', 'powerful'];
      const score = words.reduce((acc, w) => positiveWords.includes(w.toLowerCase()) ? acc + 15 : acc + 2, 45);
      const normalizedScore = Math.min(100, score);

      let insightText = '';
      if (persona === 'Cyber-Philosopher') {
        insightText = `This text exhibits profound cybernetic resonance. It bridges biological cognition with digital expansion, reflecting a high index of technological optimism (+${normalizedScore}%).`;
      } else if (persona === 'Code Architect') {
        insightText = `Logical evaluation complete. Algorithmic complexity: low, semantic cohesion: 98%. Input structure indicates clean input stream ready for vector indexing.`;
      } else if (persona === 'Sci-Fi Bard') {
        insightText = `A vibrant echo from Neo-Tokyo's data towers! The narrative frequency radiates synthetic wonder and cosmic hope.`;
      } else {
        insightText = `Statistical breakdown: Token volume = ${tokenEst} tokens. Sentiment baseline calculated at ${normalizedScore}/100. Entropy coefficient: 0.14.`;
      }

      setAiAnalysis({
        wordCount,
        charCount,
        tokenEst,
        sentimentScore: normalizedScore,
        grade: normalizedScore > 75 ? 'Visionary (Grade A+)' : 'Standard (Grade B)',
        insight: insightText
      });
      setIsAnalyzing(false);
      soundEngine.playSuccess();
    }, 600);
  };

  // --- 3. AI BATTLE ARENA STATE ---
  const [battlePrompt, setBattlePrompt] = useState('Explain how quantum computing will change cyberspace in 2050.');
  const [modelA, setModelA] = useState('Quantum-Mind v9.4 (Deep Reasoning)');
  const [modelB, setModelB] = useState('Cyber-GPT Nexus (Creative Flash)');
  const [isBattling, setIsBattling] = useState(false);
  const [battleOutputA, setBattleOutputA] = useState('');
  const [battleOutputB, setBattleOutputB] = useState('');
  const [winner, setWinner] = useState(null);

  const handleStartBattle = () => {
    soundEngine.playGlitch();
    setIsBattling(true);
    setBattleOutputA('');
    setBattleOutputB('');
    setWinner(null);

    const fullA = "By 2050, Quantum Superposition will neutralize legacy RSA cryptography. Matrix grids will operate on qudit entanglements, enabling real-time planetary neural syncing without speed-of-light propagation lag.";
    const fullB = "Picture glowing bio-silicon hubs floating in orbital space! In 2050, hackers won't type commands — they will stream pure thought waves directly into quantum hyper-cubes with zero latency.";

    let i = 0;
    const interval = setInterval(() => {
      i += 3;
      setBattleOutputA(fullA.slice(0, i));
      setBattleOutputB(fullB.slice(0, i));

      if (i >= Math.max(fullA.length, fullB.length)) {
        clearInterval(interval);
        setIsBattling(false);
        const winChoice = Math.random() > 0.5 ? modelA : modelB;
        setWinner(winChoice);
        soundEngine.playSuccess();
      }
    }, 50);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Sub Tab Buttons */}
      <div className="glass-panel" style={{ padding: '0.6rem 1rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => { soundEngine.playClick(); setSubTab('generator'); }}
          className={`btn-cyber ${subTab === 'generator' ? '' : 'btn-cyber-pink'}`}
          style={{ opacity: subTab === 'generator' ? 1 : 0.7 }}
        >
          <Wand2 size={16} /> AI Art Prompt Studio
        </button>

        <button
          onClick={() => { soundEngine.playClick(); setSubTab('sentiment'); }}
          className={`btn-cyber ${subTab === 'sentiment' ? '' : 'btn-cyber-pink'}`}
          style={{ opacity: subTab === 'sentiment' ? 1 : 0.7 }}
        >
          <BrainCircuit size={16} /> Sentiment & Intelligence Lab
        </button>

        <button
          onClick={() => { soundEngine.playClick(); setSubTab('battle'); }}
          className={`btn-cyber ${subTab === 'battle' ? '' : 'btn-cyber-pink'}`}
          style={{ opacity: subTab === 'battle' ? 1 : 0.7 }}
        >
          <Swords size={16} /> Neural Model Battle Arena
        </button>
      </div>

      {/* --- SUB TAB 1: AI ART PROMPT STUDIO --- */}
      {subTab === 'generator' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1.5rem' }}>
          
          <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Wand2 size={20} color="#00f0ff" />
              <h2 style={{ fontSize: '1.2rem', fontWeight: '700' }}>AI Prompt Studio</h2>
              <span className="cyber-badge cyber-badge-cyan">PROMPT v6.0</span>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                Your Concept or Idea:
              </label>
              <textarea
                className="cyber-input"
                value={rawIdea}
                onChange={(e) => setRawIdea(e.target.value)}
                placeholder="Describe what you want to create..."
                rows={3}
                maxLength={500}
              />
            </div>

            {/* Presets */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                Artistic Style Preset:
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                {stylePresets.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => { soundEngine.playClick(); setStylePreset(p.name); }}
                    style={{
                      background: stylePreset === p.name ? 'rgba(0,240,255,0.15)' : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${stylePreset === p.name ? '#00f0ff' : 'rgba(255,255,255,0.08)'}`,
                      padding: '0.5rem 0.75rem',
                      borderRadius: '8px',
                      color: stylePreset === p.name ? '#fff' : '#94a3b8',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    ✨ {p.name}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGeneratePrompt}
              disabled={isGenerating || !rawIdea.trim()}
              className="btn-cyber"
              style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
            >
              {isGenerating ? (
                <>
                  <RefreshCw size={18} className="animate-spin" /> Synthesizing Neural Prompt ({genProgress}%)...
                </>
              ) : (
                <>
                  <Sparkles size={18} /> Transform Prompt & Render Art
                </>
              )}
            </button>
          </div>

          {/* Canvas Display */}
          <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Cpu size={20} color="#ff007f" />
                <h2 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Generative Canvas & Output</h2>
              </div>
              <span className="cyber-badge cyber-badge-pink">LIVE CANVAS</span>
            </div>

            <div style={{ position: 'relative', width: '100%', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', background: '#000' }}>
              <canvas
                ref={canvasRef}
                width={500}
                height={260}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>

            {/* Prompt Output Box */}
            <div style={{ background: 'rgba(5, 10, 20, 0.9)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(0, 240, 255, 0.2)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span className="mono-tag" style={{ fontSize: '0.7rem' }}>COMPILED PROMPT:</span>
                {generatedPrompt && (
                  <button onClick={copyToClipboard} className="btn-cyber" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}>
                    {copied ? <Check size={14} color="#00ff88" /> : <Copy size={14} />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                )}
              </div>
              <p style={{ fontFamily: 'Fira Code, monospace', fontSize: '0.85rem', color: generatedPrompt ? '#00f0ff' : '#64748b', lineHeight: '1.5' }}>
                {generatedPrompt || 'Click "Transform Prompt & Render Art" to build your engineered prompt...'}
              </p>
            </div>
          </div>

        </div>
      )}

      {/* --- SUB TAB 2: SENTIMENT --- */}
      {subTab === 'sentiment' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1.5rem' }}>
          <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BrainCircuit size={20} color="#9d4edd" />
              <h2 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Neural Text & Sentiment Lab</h2>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                Enter Text to Analyze:
              </label>
              <textarea
                className="cyber-input"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={4}
                maxLength={2000}
              />
            </div>

            <button onClick={handleAnalyzeSentiment} disabled={isAnalyzing || !inputText.trim()} className="btn-cyber btn-cyber-pink" style={{ width: '100%', justifyContent: 'center' }}>
              <MessageSquareText size={18} /> Execute Sentiment Intelligence Analysis
            </button>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Analysis Report</h2>
            {aiAnalysis ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.75rem', borderRadius: '10px' }}>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Words</div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#00f0ff' }}>{aiAnalysis.wordCount}</div>
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.75rem', borderRadius: '10px' }}>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Est. Tokens</div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#9d4edd' }}>{aiAnalysis.tokenEst}</div>
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.75rem', borderRadius: '10px' }}>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Optimism</div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#00ff88' }}>{aiAnalysis.sentimentScore}%</div>
                  </div>
                </div>

                <div style={{ background: 'rgba(157, 78, 221, 0.1)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(157, 78, 221, 0.3)' }}>
                  <div style={{ fontWeight: '700', color: '#9d4edd', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                    ✨ Persona Evaluation ({persona}):
                  </div>
                  <p style={{ fontSize: '0.9rem', color: '#f1f5f9', lineHeight: '1.6' }}>
                    "{aiAnalysis.insight}"
                  </p>
                </div>
              </div>
            ) : (
              <p style={{ color: '#64748b' }}>Click "Execute Sentiment Intelligence Analysis" to view AI sentiment metrics.</p>
            )}
          </div>
        </div>
      )}

      {/* --- SUB TAB 3: BATTLE ARENA --- */}
      {subTab === 'battle' && (
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Swords size={24} color="#ff007f" />
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800' }}>AI Neural Battle Arena</h2>
            </div>
            <button onClick={handleStartBattle} disabled={isBattling} className="btn-cyber btn-cyber-pink">
              <Flame size={18} /> {isBattling ? 'Battling...' : 'Start Neural Battle'}
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1.25rem' }}>
            <div style={{ background: 'rgba(0, 240, 255, 0.05)', border: '1px solid rgba(0, 240, 255, 0.3)', borderRadius: '14px', padding: '1.25rem' }}>
              <div style={{ fontWeight: '700', color: '#00f0ff', marginBottom: '0.5rem' }}>🤖 {modelA}</div>
              <div style={{ background: 'rgba(0,0,0,0.5)', padding: '1rem', borderRadius: '10px', minHeight: '120px', fontFamily: 'Fira Code, monospace', fontSize: '0.85rem' }}>
                {battleOutputA || 'Waiting for battle round start...'}
              </div>
            </div>

            <div style={{ background: 'rgba(255, 0, 127, 0.05)', border: '1px solid rgba(255, 0, 127, 0.3)', borderRadius: '14px', padding: '1.25rem' }}>
              <div style={{ fontWeight: '700', color: '#ff007f', marginBottom: '0.5rem' }}>🤖 {modelB}</div>
              <div style={{ background: 'rgba(0,0,0,0.5)', padding: '1rem', borderRadius: '10px', minHeight: '120px', fontFamily: 'Fira Code, monospace', fontSize: '0.85rem' }}>
                {battleOutputB || 'Waiting for battle round start...'}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
