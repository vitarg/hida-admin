import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import Login from '@/pages/Login'
import { AuthProvider } from '@/stores/auth-context'

describe('Login page', () => {
  const renderLogin = () =>
    render(
      <AuthProvider initialUser={null}>
        <MemoryRouter initialEntries={['/login']}>
          <Login />
        </MemoryRouter>
      </AuthProvider>,
    )

  it('показывает подсказку с демо-учетными данными', () => {
    renderLogin()

    expect(
      screen.getByText(/admin@hida\.app \/ admin123/i, { exact: false }),
    ).toBeInTheDocument()
  })

  it('отображает ошибку при неправильных учетных данных', async () => {
    renderLogin()

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'wrong@hida.app' } })
    fireEvent.change(screen.getByLabelText(/Пароль/i), { target: { value: 'wrongpwd' } })
    fireEvent.click(screen.getByRole('button', { name: /Войти/i }))

    expect(
      await screen.findByText('Неверный email или пароль', undefined, { timeout: 1500 }),
    ).toBeInTheDocument()
  })
})
