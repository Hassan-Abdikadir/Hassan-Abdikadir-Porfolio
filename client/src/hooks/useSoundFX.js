import { useState, useEffect, useCallback } from 'react'

export function useSoundFX() {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    return localStorage.getItem('hassan_sound_fx') === 'true'
  })

  useEffect(() => {
    localStorage.setItem('hassan_sound_fx', soundEnabled)
  }, [soundEnabled])

  const playHoverSound = useCallback(() => {
    if (!soundEnabled) return
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (!AudioCtx) return
      const ctx = new AudioCtx()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(440, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.05)

      gain.gain.setValueAtTime(0.03, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 0.05)
    } catch (e) {
      // Audio context policy fallback
    }
  }, [soundEnabled])

  const playClickSound = useCallback(() => {
    if (!soundEnabled) return
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (!AudioCtx) return
      const ctx = new AudioCtx()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(600, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.08)

      gain.gain.setValueAtTime(0.05, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 0.08)
    } catch (e) {
      // Audio policy fallback
    }
  }, [soundEnabled])

  const toggleSound = () => setSoundEnabled(prev => !prev)

  return { soundEnabled, toggleSound, playHoverSound, playClickSound }
}
