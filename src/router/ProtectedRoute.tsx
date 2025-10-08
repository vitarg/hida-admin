import { Navigate, Outlet, useLocation } from 'react-router-dom'

/**
 * Temporary guard that always allows access until authentication is implemented.
 * Replace the `isAuthenticated` logic once auth is wired up.
 */
export function ProtectedRoute() {
  const location = useLocation()
  const isAuthenticated = true

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}
