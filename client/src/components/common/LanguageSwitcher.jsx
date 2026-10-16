import './LanguageSwitcher.css'

export default function LanguageSwitcher({ lang, switchLang }) {
  return (
    <div className="lang-switcher" title="Switch Language">
      <button
        className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
        onClick={() => switchLang('en')}
        data-hover
      >
        EN
      </button>
      <span className="lang-sep">|</span>
      <button
        className={`lang-btn ${lang === 'so' ? 'active' : ''}`}
        onClick={() => switchLang('so')}
        data-hover
      >
        SO
      </button>
    </div>
  )
}
