import { Navigate, Outlet, useLocation, type Location } from 'react-router-dom'

import { useAuth } from '@/stores/auth-context'

export function PublicRoute() {
  const location = useLocation()
  const { isAuthenticated, isInitializing } = useAuth()

  if (isInitializing) {
    return (
      <div className="flex h-full items-center justify-center py-16 text-muted-foreground">
        Загружаем...
      </div>
    )
  }

  if (isAuthenticated) {
    const from = (location.state as { from?: Location } | null)?.from
    if (from) {
      return (
        <Navigate
          to={{ pathname: from.pathname, search: from.search, hash: from.hash }}
          replace
        />
      )
    }

    return <Navigate to="/" replace />
  }

  return <Outlet />
}
