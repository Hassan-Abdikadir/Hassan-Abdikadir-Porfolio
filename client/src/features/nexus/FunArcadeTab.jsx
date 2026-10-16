import React, { useState } from 'react';
import { Gamepad2, Shield, Flame, Swords, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../../services/AudioSynthesizer';

export default function FunArcadeTab() {
  const [playerHp, setPlayerHp] = useState(100);
  const [bossHp, setBossHp] = useState(100);
  const [log, setLog] = useState("⚔️ Boss Encounter Initialized! Choose your action.");
  const [isGameOver, setIsGameOver] = useState(false);

  const handleAttack = () => {
    if (isGameOver) return;
    soundEngine.playCardAttack();

    const pDamage = Math.floor(Math.random() * 22) + 12;
    const newBossHp = Math.max(0, bossHp - pDamage);
    setBossHp(newBossHp);

    if (newBossHp === 0) {
      soundEngine.playSuccess();
      confetti({ particleCount: 80, spread: 80 });
      setLog(`🏆 VICTORY! You dealt ${pDamage} critical damage and defeated the Cyber Boss!`);
      setIsGameOver(true);
      return;
    }

    const bDamage = Math.floor(Math.random() * 18) + 8;
    const newPlayerHp = Math.max(0, playerHp - bDamage);
    setPlayerHp(newPlayerHp);

    if (newPlayerHp === 0) {
      soundEngine.playGlitch();
      setLog(`💀 DEFEAT! Boss countered with ${bDamage} damage and wiped your system.`);
      setIsGameOver(true);
    } else {
      setLog(`⚔️ You dealt ${pDamage} damage! Cyber Boss retaliated with ${bDamage} damage.`);
    }
  };

  const handleReset = () => {
    soundEngine.playClick();
    setPlayerHp(100);
    setBossHp(100);
    setLog("⚔️ Battle Reset! Choose your action.");
    setIsGameOver(false);
  };

  return (
    <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Gamepad2 size={24} color="#ff007f" />
          <h3 style={{ fontSize: '1.2rem', fontWeight: '800' }}>CYBER CARD BATTLER // VS NEURAL BOSS</h3>
        </div>
        <button onClick={handleReset} className="btn-cyber" style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}>
          <RotateCcw size={14} /> Reset Match
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }}>
        <div style={{ background: 'rgba(0, 240, 255, 0.08)', padding: '1rem', borderRadius: '12px', border: '1px solid #00f0ff' }}>
          <div style={{ fontWeight: '800', color: '#00f0ff', marginBottom: '0.4rem' }}>🛡️ PLAYER (YOU)</div>
          <div style={{ fontSize: '1.2rem', fontWeight: '900' }}>HP: {playerHp}/100</div>
          <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', marginTop: '0.5rem', overflow: 'hidden' }}>
            <div style={{ width: `${playerHp}%`, height: '100%', background: '#00f0ff', transition: 'width 0.3s ease' }} />
          </div>
        </div>

        <div style={{ background: 'rgba(255, 0, 127, 0.08)', padding: '1rem', borderRadius: '12px', border: '1px solid #ff007f' }}>
          <div style={{ fontWeight: '800', color: '#ff007f', marginBottom: '0.4rem' }}>👾 NEURAL BOSS</div>
          <div style={{ fontSize: '1.2rem', fontWeight: '900' }}>HP: {bossHp}/100</div>
          <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', marginTop: '0.5rem', overflow: 'hidden' }}>
            <div style={{ width: `${bossHp}%`, height: '100%', background: '#ff007f', transition: 'width 0.3s ease' }} />
          </div>
        </div>
      </div>

      <div style={{ background: 'rgba(0,0,0,0.5)', padding: '0.85rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', fontFamily: 'Fira Code, monospace', fontSize: '0.85rem', color: '#00ff88' }}>
        {log}
      </div>

      <button onClick={handleAttack} disabled={isGameOver} className="btn-cyber btn-cyber-pink" style={{ justifyContent: 'center' }}>
        <Swords size={18} /> Launch Cyber Quantum Strike
      </button>
    </div>
  );
}
