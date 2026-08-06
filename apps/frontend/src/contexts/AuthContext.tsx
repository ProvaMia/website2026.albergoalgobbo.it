import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

interface AuthContextValue {
  isAuthenticated: boolean
  isLoading: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  error: string | null
}

const AuthContext = createContext<AuthContextValue | null>(null)

const MOCK_USERNAME = 'admin'
const MOCK_PASSWORD = 'admin'
const STORAGE_KEY = 'admin_token'
const MOCK_TOKEN = 'mock-admin-token'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === MOCK_TOKEN) {
      setToken(stored)
    }
    setIsLoading(false)
  }, [])

  const login = async (username: string, password: string) => {
    setError(null)

    if (username !== MOCK_USERNAME || password !== MOCK_PASSWORD) {
      setError('Credenziali non valide')
      throw new Error('Invalid credentials')
    }

    localStorage.setItem(STORAGE_KEY, MOCK_TOKEN)
    setToken(MOCK_TOKEN)
  }

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY)
    setToken(null)
    setError(null)
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: token === MOCK_TOKEN,
        isLoading,
        login,
        logout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
