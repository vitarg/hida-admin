import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Users() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Пользователи</h1>
          <p className="text-muted-foreground">
            Управление пользователями системы
          </p>
        </div>
        <Button>Добавить пользователя</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Поиск и фильтрация</CardTitle>
          <CardDescription>Найдите нужных пользователей</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input placeholder="Поиск по имени или email..." className="flex-1" />
            <Button variant="outline">Фильтры</Button>
            <Button>Найти</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Список пользователей</CardTitle>
          <CardDescription>Всего найдено: 2,350 пользователей</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Mock user data */}
            {[1, 2, 3, 4, 5].map((index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    U{index}
                  </div>
                  <div>
                    <p className="font-medium">Пользователь {index}</p>
                    <p className="text-sm text-muted-foreground">user{index}@example.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    Активен
                  </span>
                  <Button variant="outline" size="sm">Редактировать</Button>
                  <Button variant="destructive" size="sm">Заблокировать</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}