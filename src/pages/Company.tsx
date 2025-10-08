import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CompanyDetails } from '@/components/company/CompanyDetails'
import { LoadingState } from '@/components/ui/loading'
import { useCompanyProfile } from '@/hooks/useCompanyProfile'
import { useAuth } from '@/stores/auth-context'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function CompanyPage() {
  const { user, isInitializing } = useAuth()
  const { company, stats, isLoading, isError, error, refetch } = useCompanyProfile({ userId: user?.id })

  if (isInitializing) {
    return <LoadingState className="min-h-[60vh]" message="Загружаем профиль пользователя..." />
  }

  if (isLoading) {
    return <LoadingState className="min-h-[60vh]" message="Загружаем профиль компании..." />
  }

  if (isError) {
    return (
      <div className="space-y-4">
        <div className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          Не удалось загрузить профиль компании: {error?.message}
        </div>
        <Button type="button" onClick={() => void refetch()}>
          Попробовать снова
        </Button>
      </div>
    )
  }

  if (!company || !stats) {
    return (
      <div className="space-y-4">
        <div className="rounded-md border border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
          Для текущего пользователя не найдена компания. Создайте профиль компании в Supabase перед работой с панелью
          поставщика.
        </div>
      </div>
    )
  }

  const lastUpdated = company.updatedAt ? new Date(company.updatedAt).toLocaleString('ru-RU') : null
  const initials = getCompanyInitials(company.name)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Профиль компании</h1>
          <p className="text-muted-foreground">
            Основная информация о поставщике воды и статус работы на платформе.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline">Просмотр в каталоге</Button>
          <Button>Редактировать профиль</Button>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20 rounded-xl border border-border text-lg">
              {company.logoUrl ? (
                <AvatarImage src={company.logoUrl} alt={company.name} />
              ) : null}
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <CardTitle className="text-2xl font-semibold leading-none tracking-tight">
                  {company.name}
                </CardTitle>
                <Badge variant="secondary">Активный поставщик</Badge>
              </div>
              <CardDescription className="max-w-2xl text-base leading-relaxed">
                {company.description ?? 'Описание компании пока не заполнено.'}
              </CardDescription>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div>
                  <span className="font-medium text-foreground">Email:</span> {company.email}
                </div>
                {company.phone ? (
                  <div>
                    <span className="font-medium text-foreground">Телефон:</span> {company.phone}
                  </div>
                ) : null}
                {company.address ? (
                  <div>
                    <span className="font-medium text-foreground">Адрес:</span> {company.address}
                  </div>
                ) : null}
              </div>
              {lastUpdated ? (
                <p className="text-xs text-muted-foreground">Последнее обновление: {lastUpdated}</p>
              ) : null}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CompanyDetails company={company} stats={stats} />
        </CardContent>
      </Card>
    </div>
  )
}

function getCompanyInitials(name: string) {
  const trimmed = name.trim()
  if (trimmed.length === 0) {
    return '—'
  }

  const words = trimmed.split(/\s+/)

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase()
  }

  return `${words[0][0] ?? ''}${words[1][0] ?? ''}`.toUpperCase()
}
