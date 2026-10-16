import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { FiClock, FiArrowRight, FiBookOpen, FiBookmark, FiSearch, FiCheckCircle } from 'react-icons/fi'
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

  const filteredArticles = articles.filter(a => {
    return selectedTag === 'All' || a.category === selectedTag
  })

  return (
    <section id="blog" className="section blog-section">
      <div className="grid-bg" />
      <div className="blog-orb orb-a" />
      <div className="blog-orb orb-b" />

      <div className="container" ref={ref}>

        {/* Header */}
        <div className={`blog-header ${inView ? 'visible' : ''}`}>
          <div className="section-label">tech.insights</div>
          <h2 className="section-title">
            Engineering Insights & <span className="gradient-text">Architectural Writings</span>
          </h2>
          <p className="section-subtitle">
            Deep technical breakdowns on scalable backend systems, data analytics pipelines, MERN security, and full-stack performance tuning.
          </p>
        </div>

        {/* Filter tags */}
        <div className={`blog-filter-bar ${inView ? 'visible' : ''}`}>
          <div className="blog-tags">
            {tags.map(tag => (
              <button
                key={tag}
                className={`blog-tag-btn ${selectedTag === tag ? 'active' : ''}`}
                onClick={() => setSelectedTag(tag)}
                data-hover
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
                className={`article-card glass-card ${inView ? 'visible' : ''}`}
                style={{ transitionDelay: `${index * 0.12}s` }}
                onClick={() => setActiveArticle(article)}
                data-hover
              >
                <div className="article-banner" style={{ background: article.gradient || 'linear-gradient(135deg, #2563EB, #7C3AED)' }}>
                  <div className="article-banner-glow" />
                  <span className="article-badge">{article.category}</span>
                  <button
                    className={`article-bookmark-btn ${isBookmarked ? 'active' : ''}`}
                    onClick={(e) => toggleBookmark(e, article.id || index)}
                    title={isBookmarked ? "Saved" : "Save Article"}
                  >
                    <FiBookmark />
                  </button>
                </div>

                <div className="article-body">
                  <div className="article-time-info">
                    <FiClock className="time-icon" />
                    <span>{article.readTime}</span>
                    <span className="bullet-dot">•</span>
                    <span>{article.date}</span>
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
              </div>
            )
          })}
        </div>
      </div>

      <ArticleModal article={activeArticle} onClose={() => setActiveArticle(null)} />
    </section>
  )
}
