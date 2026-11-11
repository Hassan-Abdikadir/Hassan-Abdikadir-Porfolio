import { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { FiX, FiClock, FiCalendar, FiUser, FiTag, FiArrowLeft, FiArrowRight, FiBookOpen } from 'react-icons/fi'
import './ArticleModal.css'

function ArticleContent({ content }) {
  if (!content) return null

  const blocks = content.split('\n\n')
  return (
    <>
      {blocks.map((block, i) => {
        if (block.startsWith('#### ')) {
          return <h4 key={i} className="art-h4">{block.replace('#### ', '')}</h4>
        }
        if (block.startsWith('### ')) {
          return <h3 key={i} className="art-h3">{block.replace('### ', '')}</h3>
        }
        if (block.startsWith('```')) {
          const lines = block.split('\n')
          const lang = lines[0].replace('```', '').trim()
          const code = lines.slice(1).join('\n').replace(/```$/, '').trim()
          return (
            <div key={i} className="art-code-wrapper">
              {lang && <div className="art-code-lang">{lang}</div>}
              <pre className="art-code-block"><code>{code}</code></pre>
            </div>
          )
        }
        if (block.trim().startsWith('- ')) {
          const items = block.split('\n').filter(l => l.trim().startsWith('- '))
          return (
            <ul key={i} className="art-list">
              {items.map((item, j) => (
                <li key={j} dangerouslySetInnerHTML={{ __html: item.replace('- ', '').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/`(.+?)`/g, '<code>$1</code>') }} />
              ))}
            </ul>
          )
        }
        if (block.trim()) {
          const html = block
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/`(.+?)`/g, '<code class="art-inline-code">$1</code>')
            .replace(/\*(.+?)\*/g, '<em>$1</em>')
          return <p key={i} dangerouslySetInnerHTML={{ __html: html }} />
        }
        return null
      })}
    </>
  )
}

export default function ArticleModal({ article, articles = [], onClose }) {
  const currentIndex = articles.findIndex(a => a.id === article?.id)
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null
  const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null

  const handleClose = useCallback(() => {
    document.body.classList.remove('cv-viewer-open')
    onClose()
  }, [onClose])

  useEffect(() => {
    if (!article) return
    document.body.classList.add('cv-viewer-open')
    const onKey = (e) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.classList.remove('cv-viewer-open')
    }
  }, [article, handleClose])

  if (!article) return null

  const categoryColors = {
    'System Architecture': { accent: '#06B6D4', glow: 'rgba(6,182,212,0.25)', label: 'SYS.ARCH' },
    'Data Engineering':    { accent: '#10B981', glow: 'rgba(16,185,129,0.25)', label: 'DATA.ENG' },
    'Web Security':        { accent: '#F59E0B', glow: 'rgba(245,158,11,0.25)',  label: 'SEC.LAYER' },
    'Frontend Engineering':{ accent: '#8B5CF6', glow: 'rgba(139,92,246,0.25)', label: 'FE.PERF' },
    'DevOps':              { accent: '#EF4444', glow: 'rgba(239,68,68,0.25)',   label: 'CI/CD.OPS' },
    'AI & Integration':    { accent: '#3B82F6', glow: 'rgba(59,130,246,0.25)', label: 'AI.MODULE' },
  }
  const theme = categoryColors[article.category] || { accent: '#06B6D4', glow: 'rgba(6,182,212,0.25)', label: 'TECH.DOC' }

  const modal = (
    <div className="arm-backdrop" onClick={handleClose} role="dialog" aria-modal="true" aria-label={article.title}>
      <div className="arm-container" onClick={e => e.stopPropagation()}>

        {/* Top HUD bar */}
        <div className="arm-hud-bar" style={{ '--accent': theme.accent, '--glow': theme.glow }}>
          <div className="arm-hud-left">
            <span className="arm-hud-label" style={{ color: theme.accent }}>// {theme.label}</span>
            <span className="arm-hud-sep">|</span>
            <span className="arm-hud-read"><FiClock /> {article.readTime}</span>
            <span className="arm-hud-sep">|</span>
            <span className="arm-hud-date"><FiCalendar /> {article.date}</span>
          </div>
          <div className="arm-hud-right">
            <span className="arm-article-counter">{currentIndex + 1} / {articles.length}</span>
            <button className="arm-close-btn" onClick={handleClose} title="Close (Esc)">
              <FiX />
            </button>
          </div>
        </div>

        {/* Hero Banner */}
        <div className="arm-hero" style={{ background: article.gradient }}>
          <div className="arm-hero-noise" />
          <div className="arm-hero-grid" />
          <div className="arm-hero-glow" style={{ background: `radial-gradient(ellipse at 30% 50%, ${theme.glow}, transparent 70%)` }} />
          <div className="arm-hero-content">
            <div className="arm-category-pill" style={{ borderColor: theme.accent, color: theme.accent, background: `rgba(0,0,0,0.5)` }}>
              <FiBookOpen /> {article.category}
            </div>
            <h1 className="arm-title">{article.title}</h1>
            <p className="arm-snippet">{article.snippet}</p>
          </div>
          <div className="arm-hero-scan-line" />
        </div>

        {/* Body */}
        <div className="arm-body">
          {/* Sidebar */}
          <aside className="arm-sidebar">
            <div className="arm-sidebar-block" style={{ '--accent': theme.accent }}>
              <div className="arm-sidebar-label"><FiUser /> Author</div>
              <div className="arm-sidebar-author">
                <img src="/LOGO.png" alt="HA" className="arm-author-avatar" style={{ borderColor: theme.accent }} />
                <div>
                  <div className="arm-author-name">Hassan Abdikadir Adam</div>
                  <div className="arm-author-role">Software Engineer · Admas University</div>
                </div>
              </div>
            </div>

            <div className="arm-sidebar-block" style={{ '--accent': theme.accent }}>
              <div className="arm-sidebar-label"><FiTag /> Category</div>
              <div className="arm-sidebar-category" style={{ color: theme.accent, borderColor: theme.accent }}>
                {article.category}
              </div>
            </div>

            <div className="arm-sidebar-block" style={{ '--accent': theme.accent }}>
              <div className="arm-sidebar-label"><FiClock /> Reading Time</div>
              <div className="arm-sidebar-value">{article.readTime}</div>
            </div>

            <div className="arm-sidebar-block" style={{ '--accent': theme.accent }}>
              <div className="arm-sidebar-label"><FiCalendar /> Published</div>
              <div className="arm-sidebar-value">{article.date}</div>
            </div>

            <div className="arm-sidebar-block" style={{ '--accent': theme.accent }}>
              <div className="arm-sidebar-label">// Tags</div>
              <div className="arm-tags">
                {['Engineering', 'FullStack', 'Production'].map(t => (
                  <span key={t} className="arm-tag" style={{ borderColor: theme.accent, color: theme.accent }}>#{t}</span>
                ))}
              </div>
            </div>
          </aside>

          {/* Main article content */}
          <main className="arm-main" style={{ '--accent': theme.accent }}>
            <div className="arm-content-text">
              <ArticleContent content={article.content} />
            </div>

            {/* Footer nav */}
            <div className="arm-nav-footer">
              {prevArticle ? (
                <button className="arm-nav-btn arm-nav-prev" onClick={() => { onClose(); setTimeout(() => document.dispatchEvent(new CustomEvent('openArticle', { detail: prevArticle })), 50) }}>
                  <FiArrowLeft /> <span><small>Previous</small><strong>{prevArticle.title.substring(0, 42)}…</strong></span>
                </button>
              ) : <div />}
              {nextArticle ? (
                <button className="arm-nav-btn arm-nav-next" onClick={() => { onClose(); setTimeout(() => document.dispatchEvent(new CustomEvent('openArticle', { detail: nextArticle })), 50) }}>
                  <span><small>Next</small><strong>{nextArticle.title.substring(0, 42)}…</strong></span> <FiArrowRight />
                </button>
              ) : <div />}
            </div>
          </main>
        </div>

        {/* Bottom accent line */}
        <div className="arm-bottom-line" style={{ background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)` }} />
      </div>
    </div>
  )

  return createPortal(modal, document.body)
}
