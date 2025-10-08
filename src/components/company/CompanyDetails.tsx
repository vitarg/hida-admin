import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { CompanyProfile, CompanyStats } from '@/types/company'

interface CompanyDetailsProps {
  company: CompanyProfile
  stats: CompanyStats
}

export function CompanyDetails({ company, stats }: CompanyDetailsProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <Card className="border-dashed">
        <CardContent className="grid gap-6 pt-6">
          <section className="space-y-3">
            <h2 className="text-sm font-semibold uppercase text-muted-foreground">Описание</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {company.description ?? 'Описание компании пока не заполнено.'}
            </p>
          </section>

          <section className="grid gap-3">
            <h2 className="text-sm font-semibold uppercase text-muted-foreground">Контакты</h2>
            <dl className="grid gap-3 text-sm text-muted-foreground">
              <div>
                <dt className="font-medium text-foreground">Email</dt>
                <dd>{company.email}</dd>
              </div>
              {company.phone ? (
                <div>
                  <dt className="font-medium text-foreground">Телефон</dt>
                  <dd>{company.phone}</dd>
                </div>
              ) : null}
              {company.address ? (
                <div>
                  <dt className="font-medium text-foreground">Адрес</dt>
                  <dd>{company.address}</dd>
                </div>
              ) : null}
            </dl>
          </section>

          <section className="grid gap-3">
            <h2 className="text-sm font-semibold uppercase text-muted-foreground">Зоны доставки</h2>
            {company.deliveryAreas?.length ? (
              <div className="flex flex-wrap gap-2">
                {company.deliveryAreas.map((area) => (
                  <Badge key={area} variant="outline">
                    {area}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Зоны доставки пока не указаны.</p>
            )}
          </section>

          <section className="grid gap-3">
            <h2 className="text-sm font-semibold uppercase text-muted-foreground">График работы</h2>
            <p className="text-sm text-muted-foreground">
              {company.workingHours ?? 'График работы не указан.'}
            </p>
          </section>
        </CardContent>
      </Card>

      <aside className="space-y-6">
        <Card>
          <CardContent className="grid gap-4 pt-6">
            <h2 className="text-sm font-semibold uppercase text-muted-foreground">Статистика</h2>
            <dl className="grid gap-3 text-sm">
              <StatItem label="Всего заказов" value={stats.totalOrders.toLocaleString('ru-RU')} />
              <StatItem label="Активные заказы" value={stats.activeOrders.toLocaleString('ru-RU')} />
              <StatItem label="Товаров в каталоге" value={stats.productsCount.toLocaleString('ru-RU')} />
              <StatItem
                label="Выручка"
                value={new Intl.NumberFormat('ru-RU', {
                  style: 'currency',
                  currency: 'RUB',
                  maximumFractionDigits: 0,
                }).format(stats.totalRevenue)}
              />
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="grid gap-4 pt-6 text-sm text-muted-foreground">
            <h2 className="text-sm font-semibold uppercase text-muted-foreground">История изменений</h2>
            <p>
              Будут отображаться последние изменения профиля: редактирование реквизитов, обновление логотипа,
              изменение зон доставки и другие действия.
            </p>
          </CardContent>
        </Card>
      </aside>
    </div>
  )
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="text-lg font-semibold text-foreground">{value}</dd>
    </div>
  )
}
