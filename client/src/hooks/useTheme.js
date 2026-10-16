import { useState, useEffect } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('hassan_portfolio_theme') || 'dark-cyber'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('hassan_portfolio_theme', theme)
  }, [theme])

  const toggleTheme = (newTheme) => {
    setTheme(newTheme)
  }

  return { theme, toggleTheme }
}
