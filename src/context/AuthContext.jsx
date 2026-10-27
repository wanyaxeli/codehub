import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { API, setCsrf } from '../lib/api'

const AuthCtx = createContext(null)
export const useAuth = () => useContext(AuthCtx)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null) // { id, role }
  const [loading, setLoading] = useState(true)

  const loadMe = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API}/api/token/me/`)
      setCsrf(data.csrfToken)
      setUser({ id: data.id, role: data.role,name:data.name, email:data.email })
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadMe()
    const onLogout = () => setUser(null)
    window.addEventListener('auth:logout', onLogout)
    return () => window.removeEventListener('auth:logout', onLogout)
  }, [loadMe])

  const login = async (values) => {
    const { data } = await axios.post(`${API}/api/token/`, values)
    setCsrf(data.csrfToken)
    setUser({ role: data.role,id:data.id })
    return data.role
  }

  const logout = async () => {
  try {
    // await axios.post(`${API}/api/token/logout/`)
    await axios.post(`${API}/api/token/logout/`, null, { withCredentials: true })
  } catch { /* ignore */ }
  setCsrf(null)
  setUser(null)
  localStorage.removeItem('token') // legacy
}

  return (
    <AuthCtx.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthCtx.Provider>
  )
}