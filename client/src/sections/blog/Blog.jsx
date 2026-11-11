import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { FiClock, FiArrowRight, FiBookOpen, FiBookmark, FiZap, FiCpu } from 'react-icons/fi'
import ArticleModal from '../../components/ui/ArticleModal'
import './Blog.css'

/* ── Category SVG Illustrations ───────────────────────────── */
const CategoryIllustration = ({ category }) => {
  switch (category) {
    case 'System Architecture':
      return (
        <svg className="card-illustration" viewBox="0 0 220 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Server nodes network */}
          <rect x="10" y="38" width="36" height="24" rx="5" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2"/>
          <rect x="14" y="43" width="6" height="4" rx="1" fill="rgba(255,255,255,0.4)"/>
          <rect x="14" y="50" width="20" height="2" rx="1" fill="rgba(255,255,255,0.2)"/>
          <rect x="14" y="54" width="14" height="2" rx="1" fill="rgba(255,255,255,0.2)"/>
          <circle cx="40" cy="43" r="2" fill="#22d3ee"/>

          <rect x="92" y="20" width="36" height="24" rx="5" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2"/>
          <rect x="96" y="25" width="6" height="4" rx="1" fill="rgba(255,255,255,0.5)"/>
          <rect x="96" y="32" width="20" height="2" rx="1" fill="rgba(255,255,255,0.3)"/>
          <circle cx="122" cy="25" r="2" fill="#34d399"/>

          <rect x="92" y="56" width="36" height="24" rx="5" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2"/>
          <rect x="96" y="61" width="6" height="4" rx="1" fill="rgba(255,255,255,0.4)"/>
          <rect x="96" y="68" width="20" height="2" rx="1" fill="rgba(255,255,255,0.2)"/>
          <circle cx="122" cy="61" r="2" fill="#f59e0b"/>

          <rect x="174" y="38" width="36" height="24" rx="5" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2"/>
          <rect x="178" y="43" width="6" height="4" rx="1" fill="rgba(255,255,255,0.4)"/>
          <rect x="178" y="50" width="20" height="2" rx="1" fill="rgba(255,255,255,0.2)"/>
          <circle cx="204" cy="43" r="2" fill="#a78bfa"/>

          {/* Connecting lines */}
          <line x1="46" y1="50" x2="92" y2="32" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeDasharray="3 2"/>
          <line x1="46" y1="50" x2="92" y2="68" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeDasharray="3 2"/>
          <line x1="128" y1="32" x2="174" y2="50" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeDasharray="3 2"/>
          <line x1="128" y1="68" x2="174" y2="50" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeDasharray="3 2"/>

          {/* Animated dot */}
          <circle cx="69" cy="41" r="2.5" fill="#22d3ee" opacity="0.9">
            <animate attributeName="cx" values="46;92" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="1;0" dur="2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="151" cy="41" r="2.5" fill="#34d399" opacity="0.9">
            <animate attributeName="cx" values="128;174" dur="2.4s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="1;0" dur="2.4s" repeatCount="indefinite"/>
          </circle>
        </svg>
      )

    case 'Data Engineering':
      return (
        <svg className="card-illustration" viewBox="0 0 220 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Bar chart */}
          <rect x="18" y="58" width="18" height="28" rx="3" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
          <rect x="18" y="58" width="18" height="28" rx="3" fill="url(#barGrad1)"/>
          <rect x="44" y="40" width="18" height="46" rx="3" fill="url(#barGrad2)"/>
          <rect x="70" y="22" width="18" height="64" rx="3" fill="url(#barGrad3)"/>
          <rect x="96" y="48" width="18" height="38" rx="3" fill="url(#barGrad1)"/>
          <rect x="122" y="30" width="18" height="56" rx="3" fill="url(#barGrad2)"/>
          <rect x="148" y="52" width="18" height="34" rx="3" fill="url(#barGrad3)"/>
          <rect x="174" y="18" width="18" height="68" rx="3" fill="url(#barGrad1)"/>

          {/* Trend line */}
          <polyline points="27,58 53,42 79,24 105,50 131,32 157,54 183,20" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" fill="none" strokeDasharray="4 2"/>
          <circle cx="183" cy="20" r="3" fill="#ffffff" opacity="0.9"/>

          {/* Grid lines */}
          <line x1="10" y1="86" x2="210" y2="86" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
          <line x1="10" y1="66" x2="210" y2="66" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
          <line x1="10" y1="46" x2="210" y2="46" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>

          <defs>
            <linearGradient id="barGrad1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.4)"/>
              <stop offset="100%" stopColor="rgba(255,255,255,0.1)"/>
            </linearGradient>
            <linearGradient id="barGrad2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.5)"/>
              <stop offset="100%" stopColor="rgba(255,255,255,0.12)"/>
            </linearGradient>
            <linearGradient id="barGrad3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.6)"/>
              <stop offset="100%" stopColor="rgba(255,255,255,0.15)"/>
            </linearGradient>
          </defs>
        </svg>
      )

    case 'Web Security':
      return (
        <svg className="card-illustration" viewBox="0 0 220 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Central shield */}
          <path d="M110 8 L138 20 L138 50 C138 68 110 82 110 82 C110 82 82 68 82 50 L82 20 Z"
            fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
          <path d="M110 18 L128 27 L128 50 C128 63 110 73 110 73 C110 73 92 63 92 50 L92 27 Z"
            fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
          {/* Checkmark */}
          <polyline points="100,48 107,55 122,38" stroke="rgba(255,255,255,0.8)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>

          {/* Orbiting dots */}
          <circle cx="110" cy="45" r="32" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="4 3" fill="none"/>
          <circle cx="142" cy="45" r="4" fill="rgba(255,255,255,0.3)">
            <animateTransform attributeName="transform" type="rotate" from="0 110 45" to="360 110 45" dur="6s" repeatCount="indefinite"/>
          </circle>
          <circle cx="110" cy="45" r="44" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="2 4" fill="none"/>
          <circle cx="154" cy="45" r="3" fill="rgba(255,255,255,0.2)">
            <animateTransform attributeName="transform" type="rotate" from="90 110 45" to="450 110 45" dur="9s" repeatCount="indefinite"/>
          </circle>

          {/* Lock icon left */}
          <rect x="22" y="40" width="22" height="18" rx="3" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
          <path d="M27 40 L27 35 C27 30 39 30 39 35 L39 40" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          <circle cx="33" cy="49" r="2" fill="rgba(255,255,255,0.5)"/>

          {/* Binary right */}
          <text x="176" y="30" fill="rgba(255,255,255,0.2)" fontSize="8" fontFamily="monospace">10110</text>
          <text x="176" y="42" fill="rgba(255,255,255,0.15)" fontSize="8" fontFamily="monospace">01001</text>
          <text x="176" y="54" fill="rgba(255,255,255,0.2)" fontSize="8" fontFamily="monospace">11010</text>
          <text x="176" y="66" fill="rgba(255,255,255,0.1)" fontSize="8" fontFamily="monospace">00111</text>
        </svg>
      )

    case 'Frontend Engineering':
      return (
        <svg className="card-illustration" viewBox="0 0 220 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Browser window */}
          <rect x="12" y="12" width="196" height="76" rx="8" fill="rgba(0,0,0,0.3)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2"/>
          <rect x="12" y="12" width="196" height="20" rx="8" fill="rgba(255,255,255,0.08)"/>
          <rect x="12" y="24" width="196" height="8" fill="rgba(255,255,255,0.08)"/>
          {/* Traffic lights */}
          <circle cx="26" cy="22" r="4" fill="rgba(239,68,68,0.6)"/>
          <circle cx="40" cy="22" r="4" fill="rgba(245,158,11,0.6)"/>
          <circle cx="54" cy="22" r="4" fill="rgba(34,197,94,0.6)"/>
          {/* URL bar */}
          <rect x="70" y="17" width="110" height="10" rx="5" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
          <text x="78" y="25" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace">localhost:5173/portfolio</text>
          {/* Code lines */}
          <rect x="22" y="40" width="60" height="4" rx="2" fill="rgba(139,92,246,0.5)"/>
          <rect x="30" y="48" width="80" height="4" rx="2" fill="rgba(255,255,255,0.15)"/>
          <rect x="30" y="56" width="55" height="4" rx="2" fill="rgba(6,182,212,0.4)"/>
          <rect x="38" y="64" width="35" height="4" rx="2" fill="rgba(255,255,255,0.1)"/>
          <rect x="22" y="72" width="45" height="4" rx="2" fill="rgba(139,92,246,0.3)"/>
          {/* React atom right */}
          <circle cx="168" cy="58" r="8" fill="none" stroke="rgba(6,182,212,0.5)" strokeWidth="1.5"/>
          <circle cx="168" cy="58" r="3" fill="rgba(6,182,212,0.6)"/>
          <ellipse cx="168" cy="58" rx="22" ry="8" fill="none" stroke="rgba(6,182,212,0.3)" strokeWidth="1" transform="rotate(0 168 58)"/>
          <ellipse cx="168" cy="58" rx="22" ry="8" fill="none" stroke="rgba(6,182,212,0.3)" strokeWidth="1" transform="rotate(60 168 58)"/>
          <ellipse cx="168" cy="58" rx="22" ry="8" fill="none" stroke="rgba(6,182,212,0.3)" strokeWidth="1" transform="rotate(-60 168 58)"/>
        </svg>
      )

    case 'DevOps':
      return (
        <svg className="card-illustration" viewBox="0 0 220 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* CI/CD Pipeline */}
          {/* Stage 1: Code */}
          <rect x="8" y="38" width="34" height="24" rx="6" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2"/>
          <text x="13" y="52" fill="rgba(255,255,255,0.7)" fontSize="7" fontFamily="monospace">CODE</text>
          <circle cx="38" cy="41" r="3" fill="#22d3ee"/>

          {/* Arrow */}
          <line x1="42" y1="50" x2="58" y2="50" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeDasharray="3 2"/>
          <polygon points="58,46 66,50 58,54" fill="rgba(255,255,255,0.3)"/>

          {/* Stage 2: Build */}
          <rect x="66" y="38" width="34" height="24" rx="6" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2"/>
          <text x="71" y="52" fill="rgba(255,255,255,0.7)" fontSize="7" fontFamily="monospace">BUILD</text>
          <circle cx="96" cy="41" r="3" fill="#34d399"/>

          {/* Arrow */}
          <line x1="100" y1="50" x2="116" y2="50" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeDasharray="3 2"/>
          <polygon points="116,46 124,50 116,54" fill="rgba(255,255,255,0.3)"/>

          {/* Stage 3: Test */}
          <rect x="124" y="38" width="34" height="24" rx="6" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2"/>
          <text x="130" y="52" fill="rgba(255,255,255,0.7)" fontSize="7" fontFamily="monospace">TEST</text>
          <circle cx="154" cy="41" r="3" fill="#f59e0b"/>

          {/* Arrow */}
          <line x1="158" y1="50" x2="174" y2="50" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeDasharray="3 2"/>
          <polygon points="174,46 182,50 174,54" fill="rgba(255,255,255,0.3)"/>

          {/* Stage 4: Deploy */}
          <rect x="182" y="38" width="34" height="24" rx="6" fill="rgba(34,197,94,0.15)" stroke="rgba(34,197,94,0.5)" strokeWidth="1.2"/>
          <text x="184" y="52" fill="rgba(255,255,255,0.8)" fontSize="6" fontFamily="monospace">DEPLOY</text>
          <circle cx="212" cy="41" r="3" fill="#22c55e"/>

          {/* Docker whale hint */}
          <ellipse cx="110" cy="78" rx="25" ry="8" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
          <rect x="96" y="65" width="10" height="8" rx="2" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8"/>
          <rect x="109" y="67" width="8" height="6" rx="2" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8"/>
          <rect x="120" y="66" width="10" height="7" rx="2" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8"/>

          {/* Animated moving dot */}
          <circle r="2.5" fill="#22d3ee">
            <animateMotion dur="3s" repeatCount="indefinite">
              <mpath href="#cicdPath"/>
            </animateMotion>
          </circle>
          <path id="cicdPath" d="M42,50 L66,50 M100,50 L124,50 M158,50 L182,50" fill="none"/>
        </svg>
      )

    case 'AI & Integration':
      return (
        <svg className="card-illustration" viewBox="0 0 220 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Neural network */}
          {/* Input layer */}
          <circle cx="25" cy="25" r="7" fill="rgba(59,130,246,0.3)" stroke="rgba(59,130,246,0.6)" strokeWidth="1.5"/>
          <circle cx="25" cy="50" r="7" fill="rgba(59,130,246,0.3)" stroke="rgba(59,130,246,0.6)" strokeWidth="1.5"/>
          <circle cx="25" cy="75" r="7" fill="rgba(59,130,246,0.3)" stroke="rgba(59,130,246,0.6)" strokeWidth="1.5"/>
          {/* Hidden layer 1 */}
          <circle cx="80" cy="18" r="7" fill="rgba(139,92,246,0.3)" stroke="rgba(139,92,246,0.6)" strokeWidth="1.5"/>
          <circle cx="80" cy="40" r="7" fill="rgba(139,92,246,0.3)" stroke="rgba(139,92,246,0.6)" strokeWidth="1.5"/>
          <circle cx="80" cy="62" r="7" fill="rgba(139,92,246,0.3)" stroke="rgba(139,92,246,0.6)" strokeWidth="1.5"/>
          <circle cx="80" cy="82" r="7" fill="rgba(139,92,246,0.3)" stroke="rgba(139,92,246,0.6)" strokeWidth="1.5"/>
          {/* Hidden layer 2 */}
          <circle cx="140" cy="25" r="7" fill="rgba(6,182,212,0.3)" stroke="rgba(6,182,212,0.6)" strokeWidth="1.5"/>
          <circle cx="140" cy="50" r="7" fill="rgba(6,182,212,0.3)" stroke="rgba(6,182,212,0.6)" strokeWidth="1.5"/>
          <circle cx="140" cy="75" r="7" fill="rgba(6,182,212,0.3)" stroke="rgba(6,182,212,0.6)" strokeWidth="1.5"/>
          {/* Output layer */}
          <circle cx="195" cy="38" r="8" fill="rgba(16,185,129,0.3)" stroke="rgba(16,185,129,0.7)" strokeWidth="1.5"/>
          <circle cx="195" cy="62" r="8" fill="rgba(16,185,129,0.3)" stroke="rgba(16,185,129,0.7)" strokeWidth="1.5"/>

          {/* Connections input → h1 */}
          {[25,50,75].map(y1 => [18,40,62,82].map(y2 => (
            <line key={`${y1}-${y2}`} x1="32" y1={y1} x2="73" y2={y2} stroke="rgba(255,255,255,0.06)" strokeWidth="0.8"/>
          )))}
          {/* h1 → h2 */}
          {[18,40,62,82].map(y1 => [25,50,75].map(y2 => (
            <line key={`h${y1}-${y2}`} x1="87" y1={y1} x2="133" y2={y2} stroke="rgba(255,255,255,0.06)" strokeWidth="0.8"/>
          )))}
          {/* h2 → output */}
          {[25,50,75].map(y1 => [38,62].map(y2 => (
            <line key={`o${y1}-${y2}`} x1="147" y1={y1} x2="187" y2={y2} stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
          )))}

          {/* Animated signal */}
          <circle r="2.5" fill="#3b82f6" opacity="0.9">
            <animate attributeName="cx" values="25;80;140;195" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="cy" values="50;40;50;38" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="1;0.8;0.9;0" dur="2s" repeatCount="indefinite"/>
          </circle>
          <circle r="2" fill="#8b5cf6" opacity="0.7">
            <animate attributeName="cx" values="25;80;140;195" dur="2.6s" repeatCount="indefinite" begin="0.5s"/>
            <animate attributeName="cy" values="75;62;75;62" dur="2.6s" repeatCount="indefinite" begin="0.5s"/>
            <animate attributeName="opacity" values="1;0.7;0.8;0" dur="2.6s" repeatCount="indefinite" begin="0.5s"/>
          </circle>

          {/* GPT label */}
          <rect x="183" y="28" width="30" height="14" rx="4" fill="none" stroke="rgba(16,185,129,0.5)" strokeWidth="0.8"/>
          <text x="186" y="38" fill="rgba(16,185,129,0.8)" fontSize="6.5" fontFamily="monospace" fontWeight="700">GPT-4o</text>
        </svg>
      )

    default:
      return (
        <svg className="card-illustration" viewBox="0 0 220 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="110" cy="50" r="30" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
          <circle cx="110" cy="50" r="18" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
          <circle cx="110" cy="50" r="6" fill="rgba(255,255,255,0.4)"/>
        </svg>
      )
  }
}

/* ── Main Blog Component ───────────────────────────────────── */
export default function Blog({ articles = [] }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [activeArticle, setActiveArticle] = useState(null)
  const [selectedTag, setSelectedTag] = useState('All')
  const [bookmarkedMap, setBookmarkedMap] = useState({})

  const toggleBookmark = (e, id) => {
    e.stopPropagation()
    setBookmarkedMap(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const tags = ['All', ...new Set(articles.map(a => a.category).filter(Boolean))]

  const filteredArticles = articles.filter(a =>
    selectedTag === 'All' || a.category === selectedTag
  )

  const categoryIcons = {
    'System Architecture':  <FiCpu />,
    'Data Engineering':     <FiZap />,
    'Web Security':         <FiBookOpen />,
    'Frontend Engineering': <FiZap />,
    'DevOps':               <FiCpu />,
    'AI & Integration':     <FiZap />,
  }

  return (
    <section id="blog" className="section blog-section">
      <div className="grid-bg" />
      <div className="blog-orb orb-a" />
      <div className="blog-orb orb-b" />
      <div className="blog-orb orb-c" />

      <div className="container" ref={ref}>

        {/* Header */}
        <div className={`blog-header ${inView ? 'visible' : ''}`}>
          <div className="section-label">// TECH.INSIGHTS</div>
          <h2 className="section-title">
            Engineering Insights &amp; <span className="gradient-text">Architectural Writings</span>
          </h2>
          <p className="section-subtitle">
            Deep technical breakdowns on scalable backend systems, data analytics pipelines, MERN security, and full-stack performance tuning.
          </p>
        </div>

        {/* Filter Bar */}
        <div className={`blog-filter-bar ${inView ? 'visible' : ''}`}>
          <div className="blog-tags">
            {tags.map(tag => (
              <button
                key={tag}
                className={`blog-tag-btn ${selectedTag === tag ? 'active' : ''}`}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
          <div className="blog-count-badge">
            <FiBookOpen /> {filteredArticles.length} Technical Papers
          </div>
        </div>

        {/* Grid */}
        <div className="blog-grid">
          {filteredArticles.map((article, index) => {
            const isBookmarked = bookmarkedMap[article.id || index]
            return (
              <div
                key={article.id || index}
                className={`article-card ${inView ? 'visible' : ''}`}
                style={{ transitionDelay: `${index * 0.08}s`, '--card-gradient': article.gradient }}
                onClick={() => setActiveArticle(article)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && setActiveArticle(article)}
              >
                {/* Scanner + corners */}
                <div className="card-scan-line" />
                <div className="card-corner-tl" />
                <div className="card-corner-br" />

                {/* Banner with SVG illustration */}
                <div className="article-banner" style={{ background: article.gradient }}>
                  <div className="article-banner-noise" />
                  <div className="article-banner-grid" />
                  <div className="article-banner-glow" />

                  {/* SVG Illustration — centred in banner */}
                  <div className="banner-illustration">
                    <CategoryIllustration category={article.category} />
                  </div>

                  {/* Top row: badge + bookmark */}
                  <div className="banner-top-row">
                    <span className="article-badge">
                      {categoryIcons[article.category] || <FiBookOpen />}
                      {article.category}
                    </span>
                    <button
                      className={`article-bookmark-btn ${isBookmarked ? 'active' : ''}`}
                      onClick={e => toggleBookmark(e, article.id || index)}
                      title={isBookmarked ? 'Saved' : 'Save Article'}
                    >
                      <FiBookmark />
                    </button>
                  </div>

                  {/* Bottom row: read time */}
                  <div className="banner-bottom-row">
                    <div className="article-time-badge">
                      <FiClock /> {article.readTime}
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="article-body">
                  <div className="article-date-row">
                    <span className="article-date-chip">{article.date}</span>
                  </div>
                  <h3 className="article-title">{article.title}</h3>
                  <p className="article-snippet">{article.snippet}</p>

                  <div className="article-footer">
                    <div className="article-author">
                      <img src="/LOGO.png" alt="HA" className="author-img" />
                      <span>Hassan Abdikadir</span>
                    </div>
                    <div className="read-more-btn">
                      Read Paper <FiArrowRight />
                    </div>
                  </div>
                </div>

                {/* Hover glow */}
                <div className="card-hover-glow" />
              </div>
            )
          })}
        </div>
      </div>

      <ArticleModal
        article={activeArticle}
        articles={filteredArticles}
        onClose={() => setActiveArticle(null)}
      />
    </section>
  )
}
