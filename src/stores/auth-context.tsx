import {
  useCallback,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'

import type { AuthUser, LoginPayload } from '@/types/auth'

interface AuthContextValue {
  user: AuthUser | null
  isAuthenticated: boolean
  isInitializing: boolean
  isAuthenticating: boolean
  login: (payload: LoginPayload) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const AUTH_STORAGE_KEY = 'hida-auth'
const DEMO_USER: AuthUser = {
  id: 'admin',
  name: 'Администратор',
  email: 'admin@hida.app',
  role: 'admin',
}

interface AuthProviderProps {
  children: ReactNode
  /**
   * Позволяет тестам задавать стартовое состояние, обходя localStorage.
   */
  initialUser?: AuthUser | null
}

export function AuthProvider({ children, initialUser }: AuthProviderProps) {
  const isTestInitialised = useRef(initialUser !== undefined)
  const [user, setUser] = useState<AuthUser | null>(() => {
    if (initialUser !== undefined) {
      return initialUser
    }

    if (typeof window === 'undefined') {
      return null
    }

    const stored = window.localStorage.getItem(AUTH_STORAGE_KEY)
    if (!stored) {
      return null
    }

    try {
      return JSON.parse(stored) as AuthUser
    } catch {
      window.localStorage.removeItem(AUTH_STORAGE_KEY)
      return null
    }
  })
  const [isInitializing, setIsInitializing] = useState(!isTestInitialised.current)
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  useEffect(() => {
    if (isTestInitialised.current || typeof window === 'undefined') {
      return
    }

    setIsInitializing(true)
    const stored = window.localStorage.getItem(AUTH_STORAGE_KEY)

    if (stored) {
      try {
        const parsed = JSON.parse(stored) as AuthUser
        setUser(parsed)
      } catch {
        window.localStorage.removeItem(AUTH_STORAGE_KEY)
        setUser(null)
      }
    } else {
      setUser(null)
    }

    setIsInitializing(false)
  }, [])

  const login = useCallback(async ({ email, password }: LoginPayload) => {
    setIsAuthenticating(true)
    await new Promise((resolve) => setTimeout(resolve, 600))

    const isValidCredentials =
      email.trim().toLowerCase() === DEMO_USER.email && password === 'admin123'

    if (!isValidCredentials) {
      setIsAuthenticating(false)
      throw new Error('Неверный email или пароль')
    }

    setUser(DEMO_USER)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(DEMO_USER))
    }

    setIsAuthenticating(false)
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(AUTH_STORAGE_KEY)
    }
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isInitializing,
      isAuthenticating,
      login,
      logout,
    }),
    [user, isInitializing, isAuthenticating, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth должен использоваться внутри AuthProvider')
  }

  return context
}
