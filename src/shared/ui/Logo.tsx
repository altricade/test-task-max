import { cn } from '../lib/cn.ts'

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" width={36} height={36} className="size-9" />
      <span className="text-[28px] leading-none font-bold">MAX</span>
    </span>
  )
}
