import { useState, useEffect } from 'react'
import { FiPlay, FiPause, FiRadio } from 'react-icons/fi'
import './VoicePitchWidget.css'

const EQ_HEIGHTS = [38, 78, 52, 95, 64, 88, 44, 100, 58, 82, 46, 70]

export default function VoicePitchWidget() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let interval = null
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false)
            return 0
          }
          return prev + 2 * speed
        })
      }, 500)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying, speed])

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  const togglePlay = () => {
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel()
        setIsPlaying(false)
      } else {
        setProgress(0)
        const text = "Hello! I am Hassan Abdikadir's AI Twin. Hassan is a Senior FullStack MERN Developer and Data Analytics Specialist based in Hargeisa. He specializes in React, Node.js, MongoDB, Python Telemetry, and high-performance system architecture."
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.rate = speed
        utterance.onend = () => {
          setIsPlaying(false)
          setProgress(100)
        }
        window.speechSynthesis.speak(utterance)
        setIsPlaying(true)
      }
    } else {
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className="voice-pitch-card glass-card">
      <button
        type="button"
        className="play-btn-circle"
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause executive voice pitch' : 'Play executive voice pitch'}
        data-hover
      >
        {isPlaying ? <FiPause /> : <FiPlay style={{ marginLeft: '2px' }} />}
      </button>

      <div className="vp-center">
        <div className="vp-top-row font-code">
          <span className="pitch-tag">
            <FiRadio className={`pulse-icon ${isPlaying ? 'active' : ''}`} />
            <span>AI VOICE TWIN — 60s EXECUTIVE PITCH</span>
          </span>

          <div className="voice-equalizer-bars" aria-hidden="true">
            {EQ_HEIGHTS.map((h, i) => (
              <span
                key={i}
                className={`eq-bar ${isPlaying ? 'anim' : ''}`}
                style={{
                  height: `${h}%`,
                  animationDelay: `${(i % 6) * 0.08}s`
                }}
              />
            ))}
          </div>
        </div>

        <div className="vp-sub-row">
          <div className="pitch-transcript">
            FullStack MERN • Real-Time Systems • Python Analytics
          </div>
          <div className="pitch-progress-track">
            <div className="pitch-progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <div className="pitch-speed-selector" role="group" aria-label="Playback speed">
        {[1, 1.25, 1.5].map((rate) => (
          <button
            key={rate}
            type="button"
            className={`speed-btn ${speed === rate ? 'active' : ''}`}
            onClick={() => setSpeed(rate)}
          >
            {rate}x
          </button>
        ))}
      </div>
    </div>
  )
}
