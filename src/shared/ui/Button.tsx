import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../lib/cn.ts'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost'
}

export function Button({ variant = 'primary', type = 'button', className, ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex cursor-pointer items-center justify-center font-medium transition-colors disabled:cursor-default',
        variant === 'primary'
          ? 'h-15 w-full rounded-button bg-accent text-[17px] text-fg hover:bg-accent-hover disabled:bg-fill-disabled disabled:text-fg-disabled'
          : 'h-10 rounded-xl px-3 text-base text-accent hover:bg-fill-hover',
        className,
      )}
      {...props}
    />
  )
}
