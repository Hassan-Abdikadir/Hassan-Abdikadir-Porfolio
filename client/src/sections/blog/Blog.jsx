import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { FiClock, FiArrowRight, FiBookOpen, FiBookmark, FiZap, FiCpu } from 'react-icons/fi'
import ArticleModal from '../../components/ui/ArticleModal'
import './Blog.css'

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
    'System Architecture': <FiCpu />,
    'Data Engineering':    <FiZap />,
    'Web Security':        <FiBookOpen />,
    'Frontend Engineering':<FiZap />,
    'DevOps':              <FiCpu />,
    'AI & Integration':    <FiZap />,
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
                {/* Scanner lines */}
                <div className="card-scan-line" />
                <div className="card-corner-tl" />
                <div className="card-corner-br" />

                {/* Banner */}
                <div className="article-banner" style={{ background: article.gradient }}>
                  <div className="article-banner-noise" />
                  <div className="article-banner-grid" />
                  <div className="article-banner-glow" />

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

                {/* Hover glow overlay */}
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
