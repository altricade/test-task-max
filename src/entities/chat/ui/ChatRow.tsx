import { Link } from 'react-router'
import { cn } from '../../../shared/lib/cn.ts'
import { formatChatDate } from '../../../shared/lib/date.ts'
import { Avatar } from '../../../shared/ui/Avatar.tsx'
import type { Chat } from '../chatSlice.ts'

type ChatRowProps = {
  chat: Chat
  active: boolean
}

export function ChatRow({ chat, active }: ChatRowProps) {
  const lastMessage = chat.messages.at(-1)

  return (
    <Link
      to={`/chat/${chat.id}`}
      className={cn('flex h-20.5 items-center gap-3 px-4', active ? 'bg-selected' : 'hover:bg-fill-hover')}
    >
      <Avatar name={chat.name} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="flex-1 truncate text-[15px] font-medium">{chat.name}</h3>
          {lastMessage ? (
            <span className="text-[13px] text-fg-muted">{formatChatDate(lastMessage.timestamp)}</span>
          ) : null}
        </div>
        <div className="mt-0.5 flex items-start gap-2">
          <p className="line-clamp-2 flex-1 text-[15px] leading-5 text-fg-muted">
            {lastMessage ? lastMessage.text : 'Сообщений пока нет'}
          </p>
          {chat.unread > 0 ? (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-xs font-semibold">
              {chat.unread}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  )
}
