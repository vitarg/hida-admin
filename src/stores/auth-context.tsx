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
import type { Session, User } from '@supabase/supabase-js'

import { supabase } from '@/lib/supabase'
import type { AuthUser, LoginPayload, UserRole } from '@/types/auth'

interface AuthContextValue {
  user: AuthUser | null
  isAuthenticated: boolean
  isInitializing: boolean
  isAuthenticating: boolean
  login: (payload: LoginPayload) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
  /**
   * Позволяет тестам задавать стартовое состояние, обходя Supabase.
   */
  initialUser?: AuthUser | null
}

export function AuthProvider({ children, initialUser }: AuthProviderProps) {
  const isTestInitialised = useRef(initialUser !== undefined)
  const [user, setUser] = useState<AuthUser | null>(initialUser ?? null)
  const [isInitializing, setIsInitializing] = useState(!isTestInitialised.current)
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  useEffect(() => {
    if (isTestInitialised.current) {
      return
    }

    let isMounted = true

    const initialiseSession = async () => {
      setIsInitializing(true)
      const { data, error } = await supabase.auth.getSession()

      if (!isMounted) {
        return
      }

      if (error) {
        console.error('Не удалось получить сессию Supabase', error)
        setUser(null)
      } else {
        setUser(mapSessionToUser(data.session))
      }

      setIsInitializing(false)
    }

    void initialiseSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) {
        return
      }

      setUser(mapSessionToUser(session))
      setIsInitializing(false)
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  const login = useCallback(async ({ email, password }: LoginPayload) => {
    setIsAuthenticating(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        if (error.message.toLowerCase().includes('invalid login credentials')) {
          throw new Error('Неверный email или пароль')
        }

        throw new Error(`Не удалось выполнить вход: ${error.message}`)
      }

      setUser(mapSessionToUser(data.session))
    } finally {
      setIsAuthenticating(false)
    }
  }, [])

  const logout = useCallback(async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      throw new Error(`Не удалось выйти из системы: ${error.message}`)
    }

    setUser(null)
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

function mapSessionToUser(session: Session | null): AuthUser | null {
  if (!session?.user) {
    return null
  }

  return mapSupabaseUser(session.user)
}

function mapSupabaseUser(user: User): AuthUser | null {
  if (!user.email) {
    return null
  }

  const metadata = (user.user_metadata ?? {}) as Record<string, unknown>
  const appMetadata = (user.app_metadata ?? {}) as Record<string, unknown>

  const firstLast = [metadata.first_name, metadata.last_name]
    .map((value) => (typeof value === 'string' ? value.trim() : ''))
    .filter((value) => value.length > 0)
    .join(' ')

  const nameCandidates = [metadata.full_name, metadata.name, firstLast, metadata.username]

  const resolvedName =
    nameCandidates
      .map((candidate) => (typeof candidate === 'string' ? candidate.trim() : ''))
      .find((candidate) => candidate.length > 0) ?? user.email

  const roleCandidate =
    (typeof appMetadata.role === 'string' && appMetadata.role) ||
    (typeof metadata.role === 'string' && metadata.role) ||
    'user'

  const resolvedRole = isValidUserRole(roleCandidate) ? roleCandidate : 'user'

  return {
    id: user.id,
    email: user.email,
    name: resolvedName,
    role: resolvedRole,
  }
}

function isValidUserRole(value: string): value is UserRole {
  return value === 'admin' || value === 'moderator' || value === 'user'
}
