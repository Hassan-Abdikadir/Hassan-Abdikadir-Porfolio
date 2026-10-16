import { useState, createContext, useContext } from 'react'
import { translations } from '../constants/translations'

export const LanguageContext = createContext(null)

export function useLanguage() {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('hassan_portfolio_lang') || 'en'
  })

  const switchLang = (newLang) => {
    setLang(newLang)
    localStorage.setItem('hassan_portfolio_lang', newLang)
  }

  const t = translations[lang] || translations['en']

  return { lang, switchLang, t }
}
