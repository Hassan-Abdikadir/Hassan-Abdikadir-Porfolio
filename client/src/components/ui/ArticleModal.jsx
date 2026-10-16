import React from 'react'
import { FiX, FiClock, FiCalendar, FiBookmark } from 'react-icons/fi'
import './ArticleModal.css'

export default function ArticleModal({ article, onClose }) {
  if (!article) return null

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="article-modal-card glass-card" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} data-hover><FiX /></button>
        <div className="article-modal-banner" style={{ background: article.gradient }} />
        
        <div className="article-modal-body">
          <div className="article-meta">
            <span className="article-cat">{article.category}</span>
            <span className="article-date"><FiCalendar /> {article.date}</span>
            <span className="article-time"><FiClock /> {article.readTime}</span>
          </div>

          <h2 className="article-modal-title">{article.title}</h2>
          <p className="article-snippet">{article.snippet}</p>

          <div className="article-content-text">
            {article.content.split('\n\n').map((paragraph, i) => {
              if (paragraph.startsWith('### ')) {
                return <h3 key={i} className="art-h3">{paragraph.replace('### ', '')}</h3>
              }
              if (paragraph.startsWith('#### ')) {
                return <h4 key={i} className="art-h4">{paragraph.replace('#### ', '')}</h4>
              }
              if (paragraph.startsWith('```')) {
                const code = paragraph.replace(/```[a-z]*/g, '').trim()
                return <pre key={i} className="art-code-block"><code>{code}</code></pre>
              }
              return <p key={i}>{paragraph}</p>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
