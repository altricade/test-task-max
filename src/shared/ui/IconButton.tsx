import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../lib/cn.ts'

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string
  primary?: boolean
}

export function IconButton({ label, primary = false, type = 'button', className, ...props }: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-fg transition-colors disabled:cursor-default disabled:opacity-40',
        primary ? 'bg-accent hover:bg-accent-hover' : 'hover:bg-fill-hover',
        className,
      )}
      {...props}
    />
  )
}
