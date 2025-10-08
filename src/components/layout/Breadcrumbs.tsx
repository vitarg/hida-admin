import { Fragment } from 'react'
import { Link, useMatches } from 'react-router-dom'
import clsx from 'clsx'

interface BreadcrumbHandle {
  breadcrumb?: string
}

export function Breadcrumbs() {
  const matches = useMatches()

  const crumbs = matches
    .filter((match) => Boolean((match.handle as BreadcrumbHandle | undefined)?.breadcrumb))
    .map((match) => ({
      pathname: match.pathname,
      label: (match.handle as BreadcrumbHandle).breadcrumb ?? '',
    }))

  if (crumbs.length === 0) {
    return null
  }

  return (
    <nav aria-label="Хлебные крошки" className="text-sm text-muted-foreground">
      <ol className="flex items-center gap-2">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1

          return (
            <Fragment key={crumb.pathname}>
              <li>
                {isLast ? (
                  <span className="font-medium text-foreground" aria-current="page">
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    to={crumb.pathname}
                    className={clsx(
                      'transition-colors',
                      'hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring rounded-sm',
                    )}
                  >
                    {crumb.label}
                  </Link>
                )}
              </li>
              {isLast ? null : <span className="text-xs text-border">/</span>}
            </Fragment>
          )
        })}
      </ol>
    </nav>
  )
}
