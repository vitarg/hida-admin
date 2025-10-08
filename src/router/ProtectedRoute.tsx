import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useAuth } from '@/stores/auth-context'

export function ProtectedRoute() {
  const location = useLocation()
  const { isAuthenticated, isInitializing } = useAuth()

  if (isInitializing) {
    return (
      <div className="flex h-full items-center justify-center py-16 text-muted-foreground">
        Проверяем права доступа...
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}
