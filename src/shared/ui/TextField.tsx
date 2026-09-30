import type { InputHTMLAttributes } from 'react'
import { cn } from '../lib/cn.ts'

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
}

export function TextField({ label, className, ...props }: TextFieldProps) {
  return (
    <input
      aria-label={label}
      className={cn(
        'h-13 w-full rounded-field bg-fill px-4 text-[15px] text-fg outline-none placeholder:text-fg-placeholder focus:outline-2 focus:outline-focus',
        className,
      )}
      {...props}
    />
  )
}
