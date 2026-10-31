import { useState, useEffect, createContext, useContext, useCallback } from 'react'
import api from '../../services/api'

const AuthContext = createContext(null)

// Restore token into axios immediately on module load (before React renders)
const storedToken = localStorage.getItem('hassan_portfolio_token')
if (storedToken) {
  api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('hassan_portfolio_user')
      return saved ? JSON.parse(saved) : null
    } catch { return null }
  })
  const [token, setToken] = useState(() => localStorage.getItem('hassan_portfolio_token') || null)
  const [loading, setLoading] = useState(false)
  const [sessionChecked, setSessionChecked] = useState(false)

  // Sync axios Authorization header whenever token changes
  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      delete api.defaults.headers.common['Authorization']
    }
  }, [token])

  // On mount: validate stored token against /auth/me to ensure it's still valid
  useEffect(() => {
    const validateSession = async () => {
      const savedToken = localStorage.getItem('hassan_portfolio_token')
      if (!savedToken) {
        setSessionChecked(true)
        return
      }
      try {
        api.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`
        const res = await api.get('/auth/me')
        if (res.data?.success) {
          const freshUser = res.data.data
          setUser(freshUser)
          setToken(savedToken)
          localStorage.setItem('hassan_portfolio_user', JSON.stringify(freshUser))
        } else {
          _clearSession()
        }
      } catch {
        // Token expired or invalid — clear it silently
        _clearSession()
      } finally {
        setSessionChecked(true)
      }
    }
    validateSession()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const _clearSession = () => {
    localStorage.removeItem('hassan_portfolio_token')
    localStorage.removeItem('hassan_portfolio_user')
    delete api.defaults.headers.common['Authorization']
    setToken(null)
    setUser(null)
  }

  const register = async ({ name, email, password, company, role }) => {
    setLoading(true)
    try {
      const res = await api.post('/auth/register', { name, email, password, company: company || '', role })
      const { token: t, user: u } = res.data.data
      localStorage.setItem('hassan_portfolio_token', t)
      localStorage.setItem('hassan_portfolio_user', JSON.stringify(u))
      api.defaults.headers.common['Authorization'] = `Bearer ${t}`
      setToken(t)
      setUser(u)
      return { success: true, message: res.data.message, user: u }
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Registration failed. Please try again.' }
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
      api.defaults.headers.common['Authorization'] = `Bearer ${t}`
      setToken(t)
      setUser(u)
      return { success: true, message: res.data.message, user: u }
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Login failed. Check your credentials.' }
    } finally {
      setLoading(false)
    }
  }

  const logout = useCallback(() => {
    _clearSession()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const refreshUser = useCallback(async () => {
    try {
      const res = await api.get('/auth/me')
      if (res.data?.success) {
        const freshUser = res.data.data
        setUser(freshUser)
        localStorage.setItem('hassan_portfolio_user', JSON.stringify(freshUser))
        return freshUser
      }
    } catch {
      _clearSession()
    }
    return null
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const updateProfile = useCallback(async ({ name, company, bio }) => {
    setLoading(true)
    try {
      const res = await api.put('/auth/profile', { name, company, bio })
      if (res.data?.success) {
        const updated = { ...user, name, company, bio }
        setUser(updated)
        localStorage.setItem('hassan_portfolio_user', JSON.stringify(updated))
        return { success: true, message: res.data.message }
      }
      return { success: false, message: res.data.message }
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Profile update failed.' }
    } finally {
      setLoading(false)
    }
  }, [user])

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      sessionChecked,
      isLoggedIn: !!user && !!token,
      register,
      login,
      logout,
      refreshUser,
      updateProfile,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
