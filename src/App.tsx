import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Hida Admin
          </h1>
          <p className="text-gray-600">
            Панель администрирования для приложения Hida
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Пользователи</CardTitle>
              <CardDescription>
                Управление пользователями системы
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Управление пользователями</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Контент</CardTitle>
              <CardDescription>
                Управление контентом приложения
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">Управление контентом</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Настройки</CardTitle>
              <CardDescription>
                Конфигурация системы
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="secondary">Настройки системы</Button>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Быстрый доступ</CardTitle>
            <CardDescription>
              Часто используемые функции
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="search">Поиск пользователя</Label>
                  <Input id="search" placeholder="Введите имя или email" />
                </div>
                <div className="flex items-end">
                  <Button>Найти</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default App
