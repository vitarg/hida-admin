import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Настройки</h1>
        <p className="text-muted-foreground">
          Конфигурация и настройки системы
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Общие настройки</CardTitle>
            <CardDescription>Основные параметры приложения</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="app-name">Название приложения</Label>
              <Input id="app-name" placeholder="Hida Admin" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="app-description">Описание</Label>
              <Input id="app-description" placeholder="Административная панель Hida" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-email">Email администратора</Label>
              <Input id="admin-email" type="email" placeholder="admin@example.com" />
            </div>
            <Button>Сохранить изменения</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Настройки безопасности</CardTitle>
            <CardDescription>Параметры безопасности и доступа</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Двухфакторная аутентификация</Label>
                <p className="text-sm text-muted-foreground">Включить 2FA для админов</p>
              </div>
              <Button variant="outline" size="sm">Настроить</Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Время сессии</Label>
                <p className="text-sm text-muted-foreground">24 часа</p>
              </div>
              <Button variant="outline" size="sm">Изменить</Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Логирование действий</Label>
                <p className="text-sm text-muted-foreground">Включено</p>
              </div>
              <Button variant="outline" size="sm">Настройки</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Email настройки</CardTitle>
            <CardDescription>Конфигурация почтового сервера</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="smtp-server">SMTP сервер</Label>
              <Input id="smtp-server" placeholder="smtp.gmail.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtp-port">Порт</Label>
              <Input id="smtp-port" placeholder="587" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtp-username">Имя пользователя</Label>
              <Input id="smtp-username" placeholder="username@gmail.com" />
            </div>
            <Button>Сохранить настройки</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Интеграции</CardTitle>
            <CardDescription>Внешние сервисы и API</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">API</span>
                </div>
                <div>
                  <p className="font-medium">REST API</p>
                  <p className="text-sm text-muted-foreground">Основной API интерфейс</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Настроить</Button>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">WH</span>
                </div>
                <div>
                  <p className="font-medium">Webhooks</p>
                  <p className="text-sm text-muted-foreground">Уведомления о событиях</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Управление</Button>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">S3</span>
                </div>
                <div>
                  <p className="font-medium">Облачное хранилище</p>
                  <p className="text-sm text-muted-foreground">Загрузка файлов</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Подключить</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Резервное копирование</CardTitle>
          <CardDescription>Управление бэкапами системы</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Автоматическое резервное копирование</p>
              <p className="text-sm text-muted-foreground">
                Последний бэкап: {new Date().toLocaleDateString()} в 03:00
              </p>
            </div>
            <div className="space-x-2">
              <Button variant="outline">Создать бэкап</Button>
              <Button>Настройки бэкапа</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}