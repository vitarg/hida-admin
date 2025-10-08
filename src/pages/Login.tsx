import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { useLocation, useNavigate, type Location } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/stores/auth-context'

interface LocationState {
  from?: Location
}

export default function Login() {
  const { login, isAuthenticating } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const fromState = (location.state as LocationState | null)?.from
  const redirectPath = useMemo(() => fromState?.pathname ?? '/', [fromState?.pathname])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    try {
      await login({ email, password })
      navigate(redirectPath, { replace: true })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Не удалось выполнить вход'
      setError(message)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold">Добро пожаловать в Hida Admin</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Авторизуйтесь с помощью учетной записи, созданной в Supabase.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            {error ? (
              <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            <Button
              type="submit"
              className="w-full"
              disabled={isAuthenticating}
              aria-busy={isAuthenticating}
            >
              {isAuthenticating ? 'Выполняем вход...' : 'Войти'}
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-muted-foreground">
            При входе вы подтверждаете, что обладаете правами администратора Hida.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
