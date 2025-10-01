import { render, screen } from '@testing-library/react'

import Dashboard from '@/pages/Dashboard'

describe('Dashboard', () => {
  it('отображает ключевой заголовок и карточки метрик', () => {
    render(<Dashboard />)

    expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument()
    expect(screen.getByText('Добро пожаловать в административную панель Hida')).toBeInTheDocument()
    expect(screen.getByText('Всего пользователей')).toBeInTheDocument()
    expect(screen.getByText('Активные сессии')).toBeInTheDocument()
  })
})
