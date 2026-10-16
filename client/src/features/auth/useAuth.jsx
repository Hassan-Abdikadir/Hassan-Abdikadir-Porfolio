import { useState, useEffect, createContext, useContext } from 'react'
import api from '../../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('hassan_portfolio_user')
      return saved ? JSON.parse(saved) : null
    } catch { return null }
  })
  const [token, setToken] = useState(() => localStorage.getItem('hassan_portfolio_token') || null)
  const [loading, setLoading] = useState(false)

  // Sync axios default header whenever token changes
  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      delete api.defaults.headers.common['Authorization']
    }
  }, [token])

  const register = async ({ name, email, password, company, role }) => {
    setLoading(true)
    try {
      const res = await api.post('/auth/register', { name, email, password, company, role })
      const { token: t, user: u } = res.data.data
      localStorage.setItem('hassan_portfolio_token', t)
      localStorage.setItem('hassan_portfolio_user', JSON.stringify(u))
      setToken(t)
      setUser(u)
      return { success: true, message: res.data.message, user: u }
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Registration failed.' }
    } finally {
      setLoading(false)
    }
  }

  const login = async ({ email, password }) => {
    setLoading(true)
    try {
      const res = await api.post('/auth/login', { email, password })
      const { token: t, user: u } = res.data.data
      localStorage.setItem('hassan_portfolio_token', t)
      localStorage.setItem('hassan_portfolio_user', JSON.stringify(u))
      setToken(t)
      setUser(u)
      return { success: true, message: res.data.message, user: u }
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Login failed.' }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('hassan_portfolio_token')
    localStorage.removeItem('hassan_portfolio_user')
    setToken(null)
    setUser(null)
    delete api.defaults.headers.common['Authorization']
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, register, login, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
