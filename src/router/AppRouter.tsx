import { Suspense, lazy } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { Layout } from '@/components/layout/Layout'
import { LoadingState } from '@/components/ui/loading'

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
    handle: { breadcrumb: 'Главная' },
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            handle: { breadcrumb: 'Dashboard' },
            element: (
              <Suspense fallback={<RouteFallback />}>
                <DashboardPage />
              </Suspense>
            ),
          },
          {
            path: 'users',
            handle: { breadcrumb: 'Пользователи' },
            element: (
              <Suspense fallback={<RouteFallback />}>
                <UsersPage />
              </Suspense>
            ),
          },
          {
            path: 'content',
            handle: { breadcrumb: 'Контент' },
            element: (
              <Suspense fallback={<RouteFallback />}>
                <ContentPage />
              </Suspense>
            ),
          },
          {
            path: 'settings',
            handle: { breadcrumb: 'Настройки' },
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
        handle: { breadcrumb: 'Страница не найдена' },
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
        handle: { breadcrumb: 'Вход' },
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
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <LoadingState className="rounded-md border border-border bg-background px-8 py-6 shadow-sm" message="Загружаем панель администратора..." />
    </div>
  )
}

function RouteFallback() {
  return <LoadingState className="h-full py-16" />
}
