import React, { useState, useEffect, useRef } from 'react';
import { Gamepad2, Swords, Flame, Trophy, Timer, Zap, RefreshCw, Sparkles, Shield, Cpu, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../AudioSynthesizer';

export default function FunArcadeTab() {
  const [gameMode, setGameMode] = useState('card_battler'); // 'card_battler' | 'speed_rush' | 'matrix'

  // ==========================================
  // GAME 1: CYBER SYNTH CARD BATTLER STATE
  // ==========================================
  const [playerHp, setPlayerHp] = useState(100);
  const [aiHp, setAiHp] = useState(100);
  const [winStreak, setWinStreak] = useState(0);
  const [battleLog, setBattleLog] = useState(['🎮 Select a Cyber Card below to launch an attack!']);
  const [isTurn, setIsTurn] = useState(true);
  const [gameEnded, setGameEnded] = useState(false);

  const cardDeck = [
    { id: 1, name: 'Quantum Cyber-Dragon', atk: 28, def: 15, cost: '40 Energy', color: 'var(--neon-cyan)', icon: '🐉', desc: 'Emits concentrated plasma beam dealing 28 DMG' },
    { id: 2, name: 'Neural Glitch Mech', atk: 35, def: 8, cost: '50 Energy', color: 'var(--neon-pink)', icon: '🤖', desc: 'High risk high damage neural overload strike' },
    { id: 3, name: 'Aether Shield Guardian', atk: 18, def: 25, cost: '30 Energy', color: 'var(--neon-green)', icon: '🛡️', desc: 'Restores +10 HP and strikes for 18 DMG' }
  ];

  const handleCardPlay = (card) => {
    if (!isTurn || gameEnded) return;

    soundEngine.playCardAttack();
    setIsTurn(false);

    // Player Turn Execution
    let dmgToAi = card.atk;
    let healPlayer = 0;
    if (card.name.includes('Guardian')) healPlayer = 10;

    const newAiHp = Math.max(0, aiHp - dmgToAi);
    const newPlayerHp = Math.min(100, playerHp + healPlayer);

    setAiHp(newAiHp);
    setPlayerHp(newPlayerHp);
    setBattleLog((prev) => [
      `⚔️ YOU played [${card.name}] dealing ${dmgToAi} DMG! ${healPlayer ? `(+${healPlayer} HP restored)` : ''}`,
      ...prev
    ]);

    // Check Victory
    if (newAiHp <= 0) {
      setGameEnded(true);
      setWinStreak((prev) => prev + 1);
      soundEngine.playSuccess();
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      setBattleLog((prev) => [`🏆 VICTORY! You defeated the AI Core!`, ...prev]);
      return;
    }

    // AI Counter Attack (after 900ms)
    setTimeout(() => {
      soundEngine.playLaser();
      const aiDmg = Math.floor(Math.random() * 22 + 10);
      const counterHp = Math.max(0, newPlayerHp - aiDmg);
      setPlayerHp(counterHp);

      setBattleLog((prev) => [`🤖 AI CORE countered with [Quantum Blast] dealing ${aiDmg} DMG!`, ...prev]);

      if (counterHp <= 0) {
        setGameEnded(true);
        setWinStreak(0);
        soundEngine.playGlitch();
        setBattleLog((prev) => [`💥 DEFEAT! Your Cyber Core collapsed.`, ...prev]);
      } else {
        setIsTurn(true);
      }
    }, 900);
  };

  const resetCardGame = () => {
    soundEngine.playClick();
    setPlayerHp(100);
    setAiHp(100);
    setGameEnded(false);
    setIsTurn(true);
    setBattleLog(['🎮 Select a Cyber Card below to launch an attack!']);
  };


  // ==========================================
  // GAME 2: AI PROMPT SPEED RUSH STATE
  // ==========================================
  const [rushScore, setRushScore] = useState(0);
  const [rushTime, setRushTime] = useState(30);
  const [rushActive, setRushActive] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);

  const triviaQuestions = [
    { q: 'Which keyword adds retro neon reflections to AI art prompts?', options: ['VFX Master', 'Octane Render Synthwave', 'Standard Blur'], correct: 1 },
    { q: 'What Web API generates zero-latency browser sound synth waves?', options: ['Audio HTML Tag', 'Web Audio API', 'Canvas API'], correct: 1 },
    { q: 'Which color mode combines neon cyan (#00f0ff) and magenta (#ff007f)?', options: ['Monochrome', 'Cyberpunk Palette', 'Pastel Soft'], correct: 1 },
    { q: 'What is the ideal frame rate target for smooth interactive particle canvas?', options: ['30 FPS', '60 FPS', '15 FPS'], correct: 1 }
  ];

  useEffect(() => {
    let timer;
    if (rushActive && rushTime > 0) {
      timer = setInterval(() => setRushTime((prev) => prev - 1), 1000);
    } else if (rushTime === 0 && rushActive) {
      setRushActive(false);
      soundEngine.playSuccess();
      confetti({ particleCount: 80, spread: 60 });
    }
    return () => clearInterval(timer);
  }, [rushActive, rushTime]);

  const startRushGame = () => {
    soundEngine.playSuccess();
    setRushScore(0);
    setRushTime(30);
    setRushActive(true);
    setCurrentQuestionIdx(0);
  };

  const handleAnswerClick = (optIdx) => {
    if (!rushActive) return;
    const q = triviaQuestions[currentQuestionIdx];
    if (optIdx === q.correct) {
      soundEngine.playTone(800, 0.15, 'triangle', 0.2);
      setRushScore((prev) => prev + 100);
    } else {
      soundEngine.playGlitch();
    }
    setCurrentQuestionIdx((prev) => (prev + 1) % triviaQuestions.length);
  };


  // ==========================================
  // GAME 3: MATRIX DIGITAL RAIN CANVAS
  // ==========================================
  const matrixCanvasRef = useRef(null);

  useEffect(() => {
    if (gameMode !== 'matrix') return;
    const canvas = matrixCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animId;
    const width = (canvas.width = canvas.parentElement.clientWidth || 600);
    const height = (canvas.height = 300);

    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789NEXUS';
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops = Array(columns).fill(1);

    const renderMatrix = () => {
      ctx.fillStyle = 'rgba(7, 9, 14, 0.08)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#00ff88';
      ctx.font = `${fontSize}px Fira Code, monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = katakana.charAt(Math.floor(Math.random() * katakana.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animId = requestAnimationFrame(renderMatrix);
    };

    renderMatrix();

    return () => cancelAnimationFrame(animId);
  }, [gameMode]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Sub Tabs Selector */}
      <div className="glass-panel" style={{ padding: '0.6rem 1rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => { soundEngine.playClick(); setGameMode('card_battler'); }}
          className={`btn-cyber ${gameMode === 'card_battler' ? '' : 'btn-cyber-pink'}`}
          style={{ opacity: gameMode === 'card_battler' ? 1 : 0.7 }}
        >
          <Swords size={16} /> Cyber Card Battler
        </button>

        <button
          onClick={() => { soundEngine.playClick(); setGameMode('speed_rush'); }}
          className={`btn-cyber ${gameMode === 'speed_rush' ? '' : 'btn-cyber-pink'}`}
          style={{ opacity: gameMode === 'speed_rush' ? 1 : 0.7 }}
        >
          <Timer size={16} /> AI Speed Rush Trivia
        </button>

        <button
          onClick={() => { soundEngine.playClick(); setGameMode('matrix'); }}
          className={`btn-cyber ${gameMode === 'matrix' ? '' : 'btn-cyber-pink'}`}
          style={{ opacity: gameMode === 'matrix' ? 1 : 0.7 }}
        >
          <Zap size={16} /> Glitch Matrix Rain Visualizer
        </button>
      </div>


      {/* --- GAME 1: CYBER CARD BATTLER --- */}
      {gameMode === 'card_battler' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Header HP Bars & Streak */}
          <div className="glass-panel" style={{ padding: '1.25rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', alignItems: 'center' }}>
            
            {/* Player HP */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <span style={{ fontWeight: '700', color: 'var(--neon-cyan)', fontSize: '0.9rem' }}>🛡️ YOU (Cyber Warrior)</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>{playerHp}/100 HP</span>
              </div>
              <div style={{ height: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ width: `${playerHp}%`, height: '100%', background: 'var(--grad-green-cyan)', transition: 'width 0.3s ease' }} />
              </div>
            </div>

            {/* Streak & Reset */}
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem' }}>
              <span className="cyber-badge cyber-badge-pink">STREAK: {winStreak} WINS</span>
              {gameEnded && (
                <button onClick={resetCardGame} className="btn-cyber btn-cyber-green" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                  <RotateCcw size={14} /> Play Next Round
                </button>
              )}
            </div>

            {/* AI HP */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <span style={{ fontWeight: '700', color: 'var(--neon-pink)', fontSize: '0.9rem' }}>🤖 AI CORE BOSS</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>{aiHp}/100 HP</span>
              </div>
              <div style={{ height: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ width: `${aiHp}%`, height: '100%', background: 'var(--grad-pink-orange)', transition: 'width 0.3s ease' }} />
              </div>
            </div>

          </div>


          {/* Card Hand Selection */}
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--text-main)' }}>
              Select Your Attack Card ({isTurn ? 'YOUR TURN' : 'AI TURN...'}):
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
              {cardDeck.map((card) => (
                <div
                  key={card.id}
                  onClick={() => handleCardPlay(card)}
                  style={{
                    background: 'rgba(15, 22, 36, 0.85)',
                    border: `2px solid ${card.color}`,
                    borderRadius: '16px',
                    padding: '1.25rem',
                    cursor: isTurn && !gameEnded ? 'pointer' : 'not-allowed',
                    opacity: isTurn && !gameEnded ? 1 : 0.6,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    boxShadow: `0 8px 25px -5px ${card.color}33`,
                    transition: 'all 0.2s ease',
                    position: 'relative'
                  }}
                  className="glass-panel-interactive"
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.8rem' }}>{card.icon}</span>
                    <span className="cyber-badge" style={{ borderColor: card.color, color: card.color }}>{card.cost}</span>
                  </div>

                  <div style={{ fontWeight: '800', fontSize: '1.1rem', color: card.color }}>{card.name}</div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{card.desc}</p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontFamily: 'var(--font-mono)', borderTop: '1px solid var(--border-glass)', paddingTop: '0.5rem' }}>
                    <span style={{ color: 'var(--neon-pink)' }}>ATK: +{card.atk}</span>
                    <span style={{ color: 'var(--neon-cyan)' }}>DEF: +{card.def}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>


          {/* Battle Action Log */}
          <div className="glass-panel" style={{ padding: '1.25rem' }}>
            <h4 className="mono-tag" style={{ marginBottom: '0.5rem' }}>BATTLE TELEMETRY LOG:</h4>
            <div style={{ maxHeight: '120px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>
              {battleLog.map((log, idx) => (
                <div key={idx} style={{ color: idx === 0 ? 'var(--neon-cyan)' : 'var(--text-muted)' }}>
                  {log}
                </div>
              ))}
            </div>
          </div>

        </div>
      )}


      {/* --- GAME 2: AI SPEED RUSH TRIVIA --- */}
      {gameMode === 'speed_rush' && (
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800' }}>AI Prompt & Tech Speed Rush</h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Answer trivia correctly before timer expires!</p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div className="cyber-badge cyber-badge-cyan" style={{ fontSize: '0.9rem' }}>
                SCORE: {rushScore}
              </div>
              <div className="cyber-badge cyber-badge-pink" style={{ fontSize: '0.9rem' }}>
                TIMER: {rushTime}s
              </div>
              <button onClick={startRushGame} className="btn-cyber btn-cyber-green">
                {rushActive ? 'Restart Rush' : 'Start Speed Game'}
              </button>
            </div>
          </div>

          {rushActive ? (
            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1.5rem', borderRadius: '14px', border: '1px solid var(--border-glass)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--neon-cyan)' }}>
                Q: {triviaQuestions[currentQuestionIdx].q}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {triviaQuestions[currentQuestionIdx].options.map((opt, oIdx) => (
                  <button
                    key={oIdx}
                    onClick={() => handleAnswerClick(oIdx)}
                    className="btn-cyber"
                    style={{ justifyContent: 'flex-start', padding: '0.75rem 1rem', fontSize: '0.9rem' }}
                  >
                    {oIdx + 1}. {opt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
              <Trophy size={48} color="var(--neon-yellow)" style={{ marginBottom: '1rem' }} />
              <h3>Ready to test your prompt engineering speed?</h3>
              <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>Click "Start Speed Game" to begin 30-second rapid challenge!</p>
            </div>
          )}
        </div>
      )}


      {/* --- GAME 3: GLITCH MATRIX RAIN --- */}
      {gameMode === 'matrix' && (
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Matrix Digital Rain Visualizer</h2>
            <button onClick={() => soundEngine.playGlitch()} className="btn-cyber btn-cyber-pink" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>
              <Zap size={14} /> Inject Glitch SFX
            </button>
          </div>

          <div style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid var(--border-glass)', background: '#07090e' }}>
            <canvas ref={matrixCanvasRef} style={{ width: '100%', display: 'block' }} />
          </div>
        </div>
      )}

    </div>
  );
}
