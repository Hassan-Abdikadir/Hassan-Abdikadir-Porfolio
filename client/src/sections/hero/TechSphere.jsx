import { useEffect, useRef } from 'react'
import './TechSphere.css'

const techTags = [
  'React.js', 'Node.js', 'MongoDB', 'Express.js',
  'Python', 'Socket.io', 'JWT Auth', 'Redux',
  'TailwindCSS', 'PostgreSQL', 'Docker', 'Pandas',
  'Chart.js', 'REST APIs', 'Git', 'Linux'
]

export default function TechSphere() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let width = (canvas.width = canvas.parentElement.offsetWidth || 350)
    let height = (canvas.height = 350)
    const radius = 130

    // Create 3D points
    const points = techTags.map((tag, i) => {
      const phi = Math.acos(-1 + (2 * i + 1) / techTags.length)
      const theta = Math.sqrt(techTags.length * Math.PI) * phi
      return {
        text: tag,
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
      }
    })

    let rx = 0.003
    let ry = 0.005
    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = (e.clientX - rect.left - width / 2) * 0.00005
      mouseY = (e.clientY - rect.top - height / 2) * 0.00005
    }

    canvas.addEventListener('mousemove', handleMouseMove)

    let animId
    const render = () => {
      ctx.clearRect(0, 0, width, height)

      rx += (mouseY - rx) * 0.05
      ry += (mouseX - ry) * 0.05

      const cosX = Math.cos(rx)
      const sinX = Math.sin(rx)
      const cosY = Math.cos(ry)
      const sinY = Math.sin(ry)

      points.forEach((p) => {
        // Rotate Y
        let x1 = p.x * cosY - p.z * sinY
        let z1 = p.z * cosY + p.x * sinY

        // Rotate X
        let y1 = p.y * cosX - z1 * sinX
        let z2 = z1 * cosX + p.y * sinX

        p.x = x1
        p.y = y1
        p.z = z2

        // Perspective scale
        const scale = 250 / (250 - p.z)
        const alpha = Math.max(0.2, (p.z + radius) / (2 * radius))

        ctx.font = `${Math.round(12 * scale)}px Plus Jakarta Sans, sans-serif`
        ctx.fillStyle = p.text.includes('React') || p.text.includes('Node')
          ? `rgba(96, 165, 250, ${alpha})`
          : p.text.includes('Python') || p.text.includes('Pandas')
          ? `rgba(16, 185, 129, ${alpha})`
          : `rgba(243, 244, 246, ${alpha})`

        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(p.text, width / 2 + p.x * scale, height / 2 + p.y * scale)
      })

      animId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animId)
      canvas.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className="tech-sphere-wrapper">
      <canvas ref={canvasRef} className="tech-sphere-canvas" />
      <div className="sphere-hint">// Move mouse to rotate 3D tech universe</div>
    </div>
  )
}
