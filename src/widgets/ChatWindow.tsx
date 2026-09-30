import { useEffect } from 'react'
import { Link } from 'react-router'
import { chatRead, type Chat } from '../entities/chat/chatSlice.ts'
import { MessageBubble } from '../entities/chat/ui/MessageBubble.tsx'
import { Composer } from '../features/send-message/Composer.tsx'
import type { Credentials } from '../shared/api/greenApi.ts'
import { formatDay, isSameDay } from '../shared/lib/date.ts'
import { useAppDispatch } from '../shared/model/hooks.ts'
import { Avatar } from '../shared/ui/Avatar.tsx'
import { ArrowLeftIcon } from '../shared/ui/icons.tsx'
import { PatternBackground } from '../shared/ui/PatternBackground.tsx'

type ChatWindowProps = {
  chat: Chat
  credentials: Credentials
}

export function ChatWindow({ chat, credentials }: ChatWindowProps) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (chat.unread > 0) {
      dispatch(chatRead(chat.id))
    }
  }, [chat.id, chat.unread, dispatch])

  return (
    <section className="relative isolate flex h-full flex-col">
      <PatternBackground />

      <header className="flex h-16 shrink-0 items-center gap-3 border-b border-divider bg-surface px-4">
        <Link
          to="/chat"
          aria-label="Назад к чатам"
          className="flex size-10 items-center justify-center rounded-full hover:bg-fill-hover"
        >
          <ArrowLeftIcon />
        </Link>
        <Avatar name={chat.name} small />
        <h2 className="truncate font-semibold">{chat.name}</h2>
      </header>

      <div className="flex flex-1 flex-col-reverse overflow-y-auto">
        <div className="mx-auto flex w-full max-w-thread flex-col gap-1 px-4 py-3">
          {chat.messages.map((message, index) => {
            const previous = chat.messages[index - 1]
            const newDay = previous === undefined || !isSameDay(previous.timestamp, message.timestamp)
            return (
              <div key={message.id}>
                {newDay ? (
                  <p className="my-2 text-center">
                    <span className="rounded-[10px] bg-chip px-1.5 py-px text-sm backdrop-blur-[25px]">
                      {formatDay(message.timestamp)}
                    </span>
                  </p>
                ) : null}
                <MessageBubble message={message} />
              </div>
            )
          })}
        </div>
      </div>

      <Composer key={chat.id} chatId={chat.id} chatName={chat.name} credentials={credentials} />
    </section>
  )
}
