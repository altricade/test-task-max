import { cn } from '../lib/cn.ts'
import { UserIcon } from './icons.tsx'

type AvatarProps = {
  name: string
  small?: boolean
}

export function Avatar({ name, small = false }: AvatarProps) {
  const letter = name.trim().charAt(0).toUpperCase()
  const isLetter = /\p{L}/u.test(letter)

  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full bg-linear-to-b from-avatar-from to-avatar-to font-semibold text-fg',
        small ? 'size-10 text-base' : 'size-16 text-2xl',
      )}
    >
      {isLetter ? letter : <UserIcon size={small ? 22 : 32} />}
    </span>
  )
}
