import { cn } from '../lib/cn.ts'

const mask = `url("${import.meta.env.BASE_URL}patternbg.svg")`

export function PatternBackground({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn('pointer-events-none absolute inset-0 -z-10 bg-chat', className)}>
      <div className="absolute inset-0 bg-pattern" style={{ maskImage: mask, WebkitMaskImage: mask }} />
    </div>
  )
}
