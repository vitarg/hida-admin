import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { LoadingState } from '@/components/ui/loading'
import { useAuth } from '@/stores/auth-context'

export function ProtectedRoute() {
  const location = useLocation()
  const { isAuthenticated, isInitializing } = useAuth()

  if (isInitializing) {
    return <LoadingState className="h-full py-16" message="Проверяем права доступа..." />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}
