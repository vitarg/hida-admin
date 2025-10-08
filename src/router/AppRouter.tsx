import { Suspense, lazy } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { Layout } from '@/components/layout/Layout'

import { ProtectedRoute } from './ProtectedRoute'
import { PublicRoute } from './PublicRoute'

const DashboardPage = lazy(() => import('@/pages/Dashboard'))
const UsersPage = lazy(() => import('@/pages/Users'))
const ContentPage = lazy(() => import('@/pages/Content'))
const SettingsPage = lazy(() => import('@/pages/Settings'))
const LoginPage = lazy(() => import('@/pages/Login'))
const NotFoundPage = lazy(() => import('@/pages/NotFound'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<RouteFallback />}>
                <DashboardPage />
              </Suspense>
            ),
          },
          {
            path: 'users',
            element: (
              <Suspense fallback={<RouteFallback />}>
                <UsersPage />
              </Suspense>
            ),
          },
          {
            path: 'content',
            element: (
              <Suspense fallback={<RouteFallback />}>
                <ContentPage />
              </Suspense>
            ),
          },
          {
            path: 'settings',
            element: (
              <Suspense fallback={<RouteFallback />}>
                <SettingsPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<RouteFallback />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    element: <PublicRoute />,
    children: [
      {
        path: '/login',
        element: (
          <Suspense fallback={<RouteFallback />}>
            <LoginPage />
          </Suspense>
        ),
      },
    ],
  },
])

export function AppRouter() {
  return (
    <Suspense fallback={<AppFallback />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

function AppFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="rounded-md border border-gray-200 bg-white px-6 py-4 text-sm text-muted-foreground shadow-sm">
        Загружаем панель администратора...
      </div>
    </div>
  )
}

function RouteFallback() {
  return (
    <div className="flex h-full flex-1 items-center justify-center py-16 text-muted-foreground">
      Загрузка...
    </div>
  )
}
