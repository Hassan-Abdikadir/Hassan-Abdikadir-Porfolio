import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { FiStar, FiUserCheck, FiChevronLeft, FiChevronRight, FiThumbsUp } from 'react-icons/fi'
import { FaQuoteLeft } from 'react-icons/fa'
import './Testimonials.css'

export default function Testimonials({ testimonials = [] }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [activeIndex, setActiveIndex] = useState(0)
  const [likedMap, setLikedMap] = useState({})

  const toggleLike = (idx) => {
    setLikedMap(prev => ({ ...prev, [idx]: !prev[idx] }))
  }

  const handleNext = () => {
    setActiveIndex(prev => (prev + 1) % (testimonials.length || 1))
  }

  const handlePrev = () => {
    setActiveIndex(prev => (prev - 1 + testimonials.length) % (testimonials.length || 1))
  }

  return (
    <section id="testimonials" className="section testimonials-section">
      <div className="grid-bg" />
      <div className="t-orb t-orb-a" />
      <div className="t-orb t-orb-b" />

      <div className="container" ref={ref}>

        {/* Header */}
        <div className={`t-header ${inView ? 'visible' : ''}`}>
          <div className="section-label">client.feedback</div>
          <h2 className="section-title">
            Words From <span className="gradient-text">Collaborators & Leaders</span>
          </h2>
          <p className="section-subtitle">
            Direct endorsements from tech leads, clients, and project directors who have experienced Hassan's engineering impact first-hand.
          </p>
        </div>

        {/* Featured Spotlight Card */}
        {testimonials.length > 0 && (
          <div className={`t-spotlight-card glass-card ${inView ? 'visible' : ''}`}>
            <FaQuoteLeft className="t-quote-bg" />

            <div className="t-spotlight-header">
              <div className="t-spotlight-avatar">
                {testimonials[activeIndex]?.avatar || testimonials[activeIndex]?.name?.substring(0, 2).toUpperCase() || 'HA'}
                <div className="t-avatar-glow" />
              </div>
              <div className="t-spotlight-info">
                <h3 className="t-spotlight-name">{testimonials[activeIndex]?.name}</h3>
                <div className="t-spotlight-role">
                  {testimonials[activeIndex]?.role} · <span className="t-spotlight-company">{testimonials[activeIndex]?.company}</span>
                </div>
                <div className="t-spotlight-rating">
                  {[...Array(testimonials[activeIndex]?.rating || 5)].map((_, i) => (
                    <FiStar key={i} className="star-icon glow" />
                  ))}
                  <span className="rating-score">5.0 / 5.0</span>
                </div>
              </div>

              <div className="t-spotlight-badge">
                <FiUserCheck /> Verified Endorsement
              </div>
            </div>

            <p className="t-spotlight-text">
              "{testimonials[activeIndex]?.text}"
            </p>

            <div className="t-spotlight-footer">
              <button
                className={`t-like-btn ${likedMap[activeIndex] ? 'liked' : ''}`}
                onClick={() => toggleLike(activeIndex)}
                data-hover
              >
                <FiThumbsUp /> {likedMap[activeIndex] ? 'Endorsed (+1)' : 'Endorse Feedback'}
              </button>

              <div className="t-nav-controls">
                <span className="t-counter">
                  {activeIndex + 1} / {testimonials.length}
                </span>
                <button className="t-nav-btn" onClick={handlePrev} data-hover aria-label="Previous">
                  <FiChevronLeft />
                </button>
                <button className="t-nav-btn" onClick={handleNext} data-hover aria-label="Next">
                  <FiChevronRight />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Grid View */}
        <div className="testimonials-grid">
          {testimonials.map((item, index) => (
            <div
              key={item.id || index}
              className={`testimonial-card glass-card ${index === activeIndex ? 'active-card' : ''} ${inView ? 'visible' : ''}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
              onClick={() => setActiveIndex(index)}
              data-hover
            >
              <FaQuoteLeft className="card-quote-icon" />

              <div className="t-card-header">
                <div className="t-avatar">
                  {item.avatar || item.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="t-name">{item.name}</h4>
                  <div className="t-role">{item.role} • <span className="t-company">{item.company}</span></div>
                </div>
              </div>

              <div className="t-rating">
                {[...Array(item.rating || 5)].map((_, i) => (
                  <FiStar key={i} className="star-icon" />
                ))}
              </div>

              <p className="t-text">"{item.text}"</p>

              <div className="t-card-bottom">
                <div className="t-badge">
                  <FiUserCheck /> Verified
                </div>
                <span className="t-click-hint">Click to feature</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
