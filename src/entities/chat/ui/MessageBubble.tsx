import { cn } from '../../../shared/lib/cn.ts'
import { formatTime } from '../../../shared/lib/date.ts'
import { CheckIcon, DoubleCheckIcon } from '../../../shared/ui/icons.tsx'
import type { Message } from '../chatSlice.ts'

export function MessageBubble({ message }: { message: Message }) {
  const outgoing = message.type === 'outgoing'

  return (
    <div className={cn('flex flex-col', outgoing ? 'items-end' : 'items-start')}>
      <div
        className={cn(
          'max-w-[85%] rounded-bubble px-2.5 pt-2 pb-1.5 card:max-w-[70%]',
          outgoing ? 'bg-bubble-outgoing' : 'bg-bubble-incoming',
          message.status === 'sending' && 'opacity-60',
        )}
      >
        <p className="text-base leading-5 break-words whitespace-pre-wrap">{message.text}</p>
        <p className="mt-0.5 flex items-center justify-end gap-0.5 text-[11px] text-fg-muted">
          {formatTime(message.timestamp)}
          {outgoing && message.status === 'sent' ? <CheckIcon size={14} aria-label="Отправлено" /> : null}
          {outgoing && message.status === 'delivered' ? <DoubleCheckIcon size={14} aria-label="Доставлено" /> : null}
          {outgoing && message.status === 'read' ? (
            <DoubleCheckIcon size={14} aria-label="Прочитано" className="text-fg" />
          ) : null}
        </p>
      </div>
      {message.status === 'error' ? <p className="mt-1 text-[13px] text-danger">Не отправлено</p> : null}
    </div>
  )
}
