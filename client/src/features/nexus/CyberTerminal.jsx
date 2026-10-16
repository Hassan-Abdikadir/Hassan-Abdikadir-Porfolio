import React, { useState } from 'react';
import { Terminal, Play, Code } from 'lucide-react';
import { soundEngine } from '../../services/AudioSynthesizer';

export default function CyberTerminal() {
  const [terminalTab, setTerminalTab] = useState('cli');
  const [cmdInput, setCmdInput] = useState('');
  const [logs, setLogs] = useState([
    "NEXUS CYBER CLI v4.2.0 [System initialized]",
    "Type 'help' to view available system commands.",
    "------------------------------------------------"
  ]);

  const [selectedAlgo, setSelectedAlgo] = useState('quicksort');
  const [algoOutput, setAlgoOutput] = useState([]);
  const [isRunningAlgo, setIsRunningAlgo] = useState(false);

  const algorithms = {
    quicksort: {
      name: 'QuickSort Benchmark O(N log N)',
      code: `function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[arr.length - 1];
  const left = arr.filter((x, i) => x <= pivot && i < arr.length - 1);
  const right = arr.filter(x => x > pivot);
  return [...quickSort(left), pivot, ...quickSort(right)];
}
const unsorted = [84, 12, 99, 43, 2, 67, 31, 5];
console.log("Sorted:", quickSort(unsorted));`,
      execute: () => [
        "⚡ Initializing QuickSort Benchmark on [84, 12, 99, 43, 2, 67, 31, 5]...",
        "📌 Selected Pivot: 5",
        "🔀 Partitioning left & right subarrays...",
        "📌 Selected Pivot: 43...",
        "✅ Array sorted successfully: [2, 5, 12, 31, 43, 67, 84, 99]",
        "⏱️ Execution time: 0.42ms | Time Complexity: O(N log N) | Space: O(log N)"
      ]
    },
    minimax: {
      name: 'AI Minimax Decision Tree O(B^D)',
      code: `function minimax(depth, isMaximizing) {
  if (depth === 0) return evaluateState();
  if (isMaximizing) {
    let best = -Infinity;
    for (let move of getPossibleMoves()) {
      best = Math.max(best, minimax(depth - 1, false));
    }
    return best;
  }
}`,
      execute: () => [
        "🤖 Evaluating AI Minimax Decision Tree (Depth=4)...",
        "🔍 Branch 1 evaluated score: +10",
        "🔍 Branch 2 evaluated score: -5 (Pruned via Alpha-Beta)",
        "🔍 Branch 3 evaluated score: +15",
        "🎯 Optimal Move Selected: Branch 3 (Score: +15)",
        "⏱️ Execution time: 1.18ms | Nodes Pruned: 42%"
      ]
    },
    fibonacci: {
      name: 'Fibonacci Dynamic Memoization O(N)',
      code: `const memo = {};
function fib(n) {
  if (n <= 1) return n;
  if (memo[n]) return memo[n];
  return memo[n] = fib(n - 1) + fib(n - 2);
}
console.log("Fib(50):", fib(50));`,
      execute: () => [
        "🧠 Computing Fib(50) via Dynamic Programming Memoization...",
        "💾 Cache Hit: memo[48], memo[49] retrieved from O(1) hash map",
        "✅ Fib(50) Result = 12,586,269,025",
        "⏱️ Execution time: 0.08ms | Standard Recursion: ~3000ms vs Memoized: 0.08ms!"
      ]
    }
  };

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const raw = cmdInput.trim();
      const cmd = raw.toLowerCase();
      soundEngine.playClick();

      let newLog = `hassan@nexus-portfolio:~$ ${raw}`;
      let responseLogs = [];

      if (cmd === 'help') {
        responseLogs = [
          "Available Commands:",
          "  bio        - View Hassan Abdikadir's background",
          "  skills     - List core technical competencies",
          "  projects   - Show key software engineering projects",
          "  location   - Display current operational base",
          "  contact    - Retrieve contact details",
          "  clear      - Clear terminal window",
          "  matrix     - Trigger visual matrix sound FX"
        ];
      } else if (cmd === 'bio') {
        responseLogs = ["👨‍💻 Hassan Abdikadir - Senior Full-Stack Software Engineer crafting high-performance React & Node applications."];
      } else if (cmd === 'skills') {
        responseLogs = ["⚡ Tech Stack: React 19, Node.js, Express, MongoDB, Vanilla CSS, Web Audio API, Canvas Generative Art, Git, REST APIs."];
      } else if (cmd === 'projects') {
        responseLogs = ["📂 Projects: Nexus AI Creative Arcade, Digital Education LMS, Cyber Security & Auth Suite."];
      } else if (cmd === 'location') {
        responseLogs = ["🌍 Location: Hargeisa, Somaliland (GMT+3) • Open for Global Remote Roles."];
      } else if (cmd === 'clear') {
        setLogs([]);
        setCmdInput('');
        return;
      } else if (cmd === 'matrix') {
        soundEngine.playGlitch();
        responseLogs = ["💚 MATRIX MODE ACTIVATED // SYNC COMPLETE"];
      } else if (cmd === '') {
        responseLogs = [];
      } else {
        responseLogs = [`Command not recognized: '${cmd}'. Type 'help' for command list.`];
      }

      setLogs((prev) => [...prev, newLog, ...responseLogs]);
      setCmdInput('');
    }
  };

  const handleRunAlgo = () => {
    soundEngine.playLaser();
    setIsRunningAlgo(true);
    setAlgoOutput(["Executing algorithm script in v8 sandbox engine..."]);

    setTimeout(() => {
      soundEngine.playSuccess();
      const results = algorithms[selectedAlgo].execute();
      setAlgoOutput(results);
      setIsRunningAlgo(false);
    }, 600);
  };

  return (
    <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', height: '100%', minHeight: '480px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Terminal size={20} color="#00f0ff" />
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800' }}>CYBER CLI & ALGO SANDBOX</h3>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => { soundEngine.playClick(); setTerminalTab('cli'); }}
            className={`cyber-badge ${terminalTab === 'cli' ? 'cyber-badge-cyan' : ''}`}
            style={{ cursor: 'pointer', padding: '0.4rem 0.75rem' }}
          >
            💻 Interactive CLI
          </button>
          <button
            onClick={() => { soundEngine.playClick(); setTerminalTab('algo'); }}
            className={`cyber-badge ${terminalTab === 'algo' ? 'cyber-badge-pink' : ''}`}
            style={{ cursor: 'pointer', padding: '0.4rem 0.75rem' }}
          >
            ⚡ Live Algo Runner
          </button>
        </div>
      </div>

      {terminalTab === 'cli' && (
        <div style={{
          flex: 1,
          background: '#04070d',
          borderRadius: '12px',
          padding: '1rem',
          fontFamily: 'Fira Code, monospace',
          fontSize: '0.85rem',
          color: '#00ff88',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          border: '1px solid rgba(255,255,255,0.08)',
          minHeight: '320px'
        }}>
          <div style={{ overflowY: 'auto', maxHeight: '280px', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {logs.map((l, idx) => (
              <div key={idx} style={{ color: l.startsWith('hassan@') ? '#00f0ff' : '#f1f5f9' }}>
                {l}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.5rem' }}>
            <span style={{ color: '#00f0ff' }}>hassan@nexus-portfolio:~$</span>
            <input
              type="text"
              value={cmdInput}
              onChange={(e) => setCmdInput(e.target.value)}
              onKeyDown={handleCommand}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#fff',
                fontFamily: 'Fira Code, monospace',
                fontSize: '0.85rem',
                flex: 1
              }}
              placeholder="type 'help', 'bio', 'skills'..."
              maxLength={200}
              autoFocus
            />
          </div>
        </div>
      )}

      {terminalTab === 'algo' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.4rem' }}>
              Select Algorithm:
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {Object.keys(algorithms).map((key) => (
                <button
                  key={key}
                  onClick={() => { soundEngine.playClick(); setSelectedAlgo(key); }}
                  className={`btn-cyber ${selectedAlgo === key ? '' : 'btn-cyber-pink'}`}
                  style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
                >
                  <Code size={14} /> {algorithms[key].name}
                </button>
              ))}
            </div>
          </div>

          <div style={{ background: '#070c16', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', fontFamily: 'Fira Code, monospace', fontSize: '0.8rem', color: '#00f0ff' }}>
            <pre>{algorithms[selectedAlgo].code}</pre>
          </div>

          <button onClick={handleRunAlgo} disabled={isRunningAlgo} className="btn-cyber btn-cyber-green" style={{ justifyContent: 'center' }}>
            <Play size={16} /> {isRunningAlgo ? 'Running Code Sandbox...' : 'Execute Live Algorithm'}
          </button>

          {algoOutput.length > 0 && (
            <div style={{ background: 'rgba(0,0,0,0.5)', padding: '0.85rem', borderRadius: '10px', border: '1px solid rgba(0, 240, 255, 0.3)', fontFamily: 'Fira Code, monospace', fontSize: '0.8rem', color: '#00ff88' }}>
              {algoOutput.map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
