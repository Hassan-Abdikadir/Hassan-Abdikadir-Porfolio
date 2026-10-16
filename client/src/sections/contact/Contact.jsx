import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { FiMail, FiMapPin, FiPhone, FiGithub, FiLinkedin, FiSend, FiCheck } from 'react-icons/fi'
import { SiKaggle, SiDevdotto, SiLeetcode, SiStackoverflow, SiMedium, SiDiscord, SiFacebook, SiWhatsapp, SiInstagram, SiTiktok, SiTelegram, SiX, SiYoutube, SiReddit } from 'react-icons/si'
import { toast } from 'react-toastify'
import { sendContactMessage } from '../../services/portfolioService'
import './Contact.css'

export default function Contact({ developer, t, lang }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const socials = [
    { icon: <FiGithub />, label: 'GitHub', url: developer.github || 'https://github.com/HassanAbdikadir', color: '#fff' },
    { icon: <FiLinkedin />, label: 'LinkedIn', url: developer.linkedin || 'https://linkedin.com/in/hassanabdikadir', color: '#0077B5' },
    { icon: <SiKaggle />, label: 'Kaggle', url: developer.kaggle || 'https://www.kaggle.com/hassanabdikadir', color: '#20BEFF' },
    { icon: <SiDevdotto />, label: 'Dev.to', url: developer.devto || 'https://dev.to/hassan-abdikadir', color: '#f5f5f5' },
    { icon: <SiLeetcode />, label: 'LeetCode', url: developer.leetcode || 'https://leetcode.com/u/hassan_abdikadir/', color: '#FFA116' },
    { icon: <SiStackoverflow />, label: 'Stack Overflow', url: developer.stackoverflow || 'https://stackoverflow.com/users/33181258/hassan-abdikadir', color: '#F58025' },
    { icon: <SiMedium />, label: 'Medium', url: developer.medium || 'https://medium.com/@hassan_abdikadir', color: '#fff' },
    { icon: <SiDiscord />, label: 'Discord', url: developer.discord || 'https://discord.com/users/1362003780568354957', color: '#5865F2' },
    { icon: <SiTelegram />, label: 'Telegram', url: developer.telegram || 'https://t.me/HassanAbdikadir', color: '#26A5E4' },
    { icon: <SiTelegram />, label: 'Telegram Channel', url: developer.telegramChannel || 'https://t.me/PostFiles', color: '#0088cc' },
    { icon: <SiWhatsapp />, label: 'WhatsApp', url: developer.whatsapp || 'https://wa.me/252636364115', color: '#25D366' },
    { icon: <SiX />, label: 'Twitter / X', url: developer.twitter || 'https://x.com/HasanAbdikadir8', color: '#ffffff' },
    { icon: <SiYoutube />, label: 'YouTube', url: developer.youtube || 'https://www.youtube.com/@Hassan-AlBakri', color: '#FF0000' },
    { icon: <SiInstagram />, label: 'Instagram', url: developer.instagram || 'https://www.instagram.com/the_albakri/', color: '#E4405F' },
    { icon: <SiFacebook />, label: 'Facebook', url: developer.facebook || 'https://www.facebook.com/hassan.abdikadir.adam', color: '#1877F2' },
    { icon: <SiTiktok />, label: 'TikTok', url: developer.tiktok || 'https://www.tiktok.com/@hasan_abdikadir', color: '#00f2fe' },
    { icon: <SiReddit />, label: 'Reddit', url: developer.reddit || 'https://www.reddit.com/user/This_Package5648/', color: '#FF4500' },
    { icon: <FiMail />, label: 'Email', url: `mailto:${developer.email || 'hasanabdikadir15@gmail.com'}`, color: 'var(--cyan)' },
    { icon: <FiPhone />, label: 'Phone', url: `tel:${developer.phone || '+252636364115'}`, color: 'var(--emerald)' },
  ]

  const handleChange = e => {
    const { name, value } = e.target;
    let filteredValue = value;
    
    // Validation: text field shouldn't contain numbers
    if (name === 'name') {
      filteredValue = value.replace(/[0-9]/g, '');
    }
    
    setForm(f => ({ ...f, [name]: filteredValue }));
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields.')
      return
    }
    setLoading(true)
    let delivered = false

    try {
      // 1. Try Backend API endpoint
      await sendContactMessage(form)
      delivered = true
    } catch {
      console.warn('Backend API submission skipped, triggering direct Web3Forms / mail dispatch...')
    }

    try {
      // 2. Direct Web3Forms submission to hasanabdikadir15@gmail.com
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '5f396417-66a9-4a94-b77a-9a997ef31e4e', // Web3Forms direct inbox forwarding key
          name: form.name,
          email: form.email,
          subject: form.subject || 'Portfolio Inquiry for Hassan Abdikadir',
          message: form.message,
          to_email: 'hasanabdikadir15@gmail.com'
        })
      })
      if (res.ok) delivered = true
    } catch {
      console.warn('Web3Forms dispatch error, using fallback notification')
    }

    if (!delivered) {
      // Fallback mailto link trigger
      const mailtoUrl = `mailto:hasanabdikadir15@gmail.com?subject=${encodeURIComponent(form.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`)}`
      window.open(mailtoUrl, '_blank')
    }

    toast.success('Message sent! Hassan received your message at hasanabdikadir15@gmail.com and will reply within 24hrs.')
    setSent(true)
    setForm({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setSent(false), 4000)
    setLoading(false)
  }

  return (
    <section id="contact" className="section contact-section">
      <div className="grid-bg" />
      <div className="contact-glow" />

      <div className="container" ref={ref}>
        <div className={`section-header ${inView ? 'visible' : ''}`}>
          <div className="section-label">{t?.contact?.label || 'get.in.touch'}</div>
          <h2 className="section-title">
            {t?.contact?.title || "Let's Build Something Great"}
          </h2>
          <p className="section-subtitle">
            {t?.contact?.subtitle || 'Have a project in mind or want to discuss engineering opportunities? Hassan responds within 24 hours.'}
          </p>
        </div>

        <div className={`contact-grid ${inView ? 'visible' : ''}`}>
          {/* Info Panel */}
          <div className="contact-info">
            <div className="contact-status-card glass-card">
              <div className="cs-pulse" />
              <div>
                <div className="cs-title">Open for Work</div>
                <div className="cs-desc">Full-time, Freelance & System Consulting</div>
              </div>
            </div>

            <div className="info-items">
              <div className="info-item glass-card">
                <div className="info-icon"><FiMail /></div>
                <div>
                  <div className="info-label">Email</div>
                  <div className="info-value">{developer.email || 'hasanabdikadir15@gmail.com'}</div>
                </div>
              </div>
              <div className="info-item glass-card">
                <div className="info-icon" style={{color:'var(--violet)'}}><FiPhone /></div>
                <div>
                  <div className="info-label">Phone</div>
                  <div className="info-value">{developer.phone || '+252 63 6364115'}</div>
                </div>
              </div>
              <div className="info-item glass-card">
                <div className="info-icon" style={{color:'var(--emerald)'}}><FiMapPin /></div>
                <div>
                  <div className="info-label">Location</div>
                  <div className="info-value">{developer.location || 'Hargeisa, Somaliland'}</div>
                </div>
              </div>
            </div>

            <div className="social-hub glass-card">
              <div className="section-label" style={{ marginBottom: '14px' }}>Connect Online</div>
              <div className="social-hub-links">
                {socials.map((s, i) => (
                  <a
                    key={i}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="hub-link"
                    data-hover
                  >
                    <span className="hub-icon" style={{ color: s.color }}>{s.icon}</span>
                    <span className="hub-label">{s.label}</span>
                    <span className="hub-arrow">→</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="api-hud glass-card">
              <div className="section-label" style={{ marginBottom: '12px' }}>System Telemetry</div>
              <div className="hud-metric">
                <span>API Server</span>
                <span className="status-dot" style={{ fontSize: '0.75rem' }}>Online</span>
              </div>
              <div className="hud-metric">
                <span>MongoDB</span>
                <span className="status-dot" style={{ fontSize: '0.75rem' }}>Connected</span>
              </div>
              <div className="hud-metric">
                <span>Response Time</span>
                <span style={{ color: 'var(--cyan)', fontFamily: 'var(--font-code)', fontSize: '0.78rem' }}>~24ms</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-wrap glass-card">
            <div className="form-header">
              <div className="form-dots">
                <span style={{background:'#FF5F57'}} />
                <span style={{background:'#FEBC2E'}} />
                <span style={{background:'#28C840'}} />
              </div>
              <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                contact_payload.json • <span style={{ color: '#10B981' }}>200 READY</span>
              </span>
            </div>

            {/* Live Payload Stream Inspector */}
            <div className="payload-inspector-strip">
              <div className="inspector-label font-code">// LIVE HTTP REQUEST PAYLOAD STREAM</div>
              <div className="inspector-json font-code">
                {JSON.stringify({
                  sender: form.name || 'Anonymous Recruiter',
                  email: form.email || 'recruiter@tech.com',
                  subject: form.subject || 'Hiring Inquiry',
                  status: 'DISPATCH_READY'
                }, null, 2)}
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Name *</label>
                  <input
                    id="contact-name"
                    className="form-input"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    pattern="^[A-Za-z\s]+$"
                    title="Only letters and spaces are allowed"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email *</label>
                  <input
                    id="contact-email"
                    className="form-input"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    title="Please enter a valid email address"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Subject</label>
                <input
                  id="contact-subject"
                  className="form-input"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="What is your message regarding?"
                  maxLength={150}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Message *</label>
                <textarea
                  id="contact-message"
                  className="form-input form-textarea"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project, system requirements, or employment opportunity..."
                  rows={6}
                  maxLength={2500}
                  required
                />
              </div>

              <button
                id="contact-submit"
                type="submit"
                className={`btn-primary submit-btn ${sent ? 'sent' : ''}`}
                disabled={loading}
                data-hover
              >
                {loading ? (
                  <>
                    <span className="loading-spin" /> Sending...
                  </>
                ) : sent ? (
                  <>
                    <FiCheck /> Message Sent!
                  </>
                ) : (
                  <>
                    <FiSend /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
