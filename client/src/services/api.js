import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Response interceptor: auto-clear localStorage on 401 (expired/invalid token)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid — silently clean up stored credentials
      const wasLoggedIn = !!localStorage.getItem('hassan_portfolio_token')
      localStorage.removeItem('hassan_portfolio_token')
      localStorage.removeItem('hassan_portfolio_user')
      delete api.defaults.headers.common['Authorization']
      // Only warn if user was actually logged in (not just a normal unauthenticated request)
      if (wasLoggedIn && !error.config?.url?.includes('/auth/me')) {
        console.warn('[Auth] Session expired. Please log in again.')
      }
    }
    return Promise.reject(error)
  }
)

export default api
