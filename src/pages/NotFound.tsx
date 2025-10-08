import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-4 py-16">
      <div className="rounded-full bg-blue-50 text-blue-600 px-4 py-2 text-sm font-medium">
        404
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Страница не найдена</h1>
        <p className="text-muted-foreground max-w-md">
          Страница, которую вы ищете, могла быть удалена, переименована или временно недоступна.
        </p>
      </div>
      <Link
        to="/"
        className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        Вернуться на главную
      </Link>
    </div>
  )
}
