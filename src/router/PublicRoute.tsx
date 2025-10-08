import { Navigate, Outlet, useLocation, type Location } from 'react-router-dom'

import { LoadingState } from '@/components/ui/loading'
import { useAuth } from '@/stores/auth-context'

export function PublicRoute() {
  const location = useLocation()
  const { isAuthenticated, isInitializing } = useAuth()

  if (isInitializing) {
    return <LoadingState className="h-full py-16" message="Загружаем..." />
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
