import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Content() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Контент</h1>
          <p className="text-muted-foreground">
            Управление контентом и публикациями
          </p>
        </div>
        <Button>Создать публикацию</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Всего публикаций</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,234</div>
            <p className="text-sm text-muted-foreground">+5% с прошлой недели</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>На модерации</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">23</div>
            <p className="text-sm text-muted-foreground">Требуют проверки</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Опубликовано сегодня</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">47</div>
            <p className="text-sm text-muted-foreground">+12% от вчера</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Поиск контента</CardTitle>
          <CardDescription>Найдите публикации по названию, автору или категории</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input placeholder="Поиск публикаций..." className="flex-1" />
            <Button variant="outline">Категории</Button>
            <Button variant="outline">Статус</Button>
            <Button>Найти</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Недавние публикации</CardTitle>
          <CardDescription>Последние добавленные материалы</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="flex items-start justify-between p-4 border rounded-lg">
                <div className="flex space-x-4">
                  <div className="w-16 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-md"></div>
                  <div>
                    <h3 className="font-semibold">Заголовок публикации {index}</h3>
                    <p className="text-sm text-muted-foreground">Автор: Пользователь {index}</p>
                    <p className="text-xs text-muted-foreground">Создано: {new Date().toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    index % 3 === 0 ? 'bg-yellow-100 text-yellow-800' :
                    index % 3 === 1 ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {index % 3 === 0 ? 'На модерации' :
                     index % 3 === 1 ? 'Опубликовано' :
                     'Отклонено'}
                  </span>
                  <Button variant="outline" size="sm">Редактировать</Button>
                  <Button variant="destructive" size="sm">Удалить</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}