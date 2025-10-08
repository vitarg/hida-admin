import clsx from 'clsx'

const sizeToClassName: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-10 w-10 border-[3px]',
}

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  return (
    <div
      className={clsx(
        'inline-flex items-center justify-center rounded-full border-current border-solid border-r-transparent animate-spin',
        sizeToClassName[size],
        className,
      )}
      aria-hidden="true"
    />
  )
}

interface LoadingStateProps {
  message?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function LoadingState({ message = 'Загрузка...', className, size = 'md' }: LoadingStateProps) {
  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center gap-3 text-muted-foreground text-sm',
        className,
      )}
      aria-live="polite"
      aria-busy="true"
    >
      <LoadingSpinner size={size} />
      <span>{message}</span>
    </div>
  )
}
