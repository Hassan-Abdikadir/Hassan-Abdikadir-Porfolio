import { useState, useEffect } from 'react'
import { FiPlay, FiPause, FiVolume2, FiRadio } from 'react-icons/fi'
import './VoicePitchWidget.css'

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
    } else {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isPlaying, speed])

  const togglePlay = () => {
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel()
        setIsPlaying(false)
      } else {
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
      <div className="voice-pitch-hdr font-code">
        <span className="pitch-tag"><FiRadio className="pulse-icon text-cyan" /> AI VOICE TWIN & 60-SEC EXECUTIVE PITCH</span>
        <div className="pitch-speed-selector">
          <button className={`speed-btn ${speed === 1 ? 'active' : ''}`} onClick={() => setSpeed(1)}>1x</button>
          <button className={`speed-btn ${speed === 1.25 ? 'active' : ''}`} onClick={() => setSpeed(1.25)}>1.25x</button>
          <button className={`speed-btn ${speed === 1.5 ? 'active' : ''}`} onClick={() => setSpeed(1.5)}>1.5x</button>
        </div>
      </div>

      <div className="voice-pitch-body">
        <button className="play-btn-circle" onClick={togglePlay} data-hover>
          {isPlaying ? <FiPause /> : <FiPlay style={{ marginLeft: '3px' }} />}
        </button>

        <div className="voice-pitch-details">
          <div className="voice-equalizer-bars">
            <span className={`eq-bar ${isPlaying ? 'anim' : ''}`} style={{ height: '60%' }} />
            <span className={`eq-bar ${isPlaying ? 'anim' : ''}`} style={{ height: '100%' }} />
            <span className={`eq-bar ${isPlaying ? 'anim' : ''}`} style={{ height: '40%' }} />
            <span className={`eq-bar ${isPlaying ? 'anim' : ''}`} style={{ height: '80%' }} />
            <span className={`eq-bar ${isPlaying ? 'anim' : ''}`} style={{ height: '50%' }} />
            <span className={`eq-bar ${isPlaying ? 'anim' : ''}`} style={{ height: '90%' }} />
          </div>

          <div className="pitch-transcript">
            &quot;Specialist in FullStack MERN Architecture, Real-Time WebSockets & Python Business Analytics.&quot;
          </div>

          <div className="pitch-progress-track">
            <div className="pitch-progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </div>
  )
}
