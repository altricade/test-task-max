import { Navigate, useParams } from 'react-router'
import type { Credentials } from '../shared/api/greenApi.ts'
import { useReceiveMessages } from '../features/receive-messages/useReceiveMessages.ts'
import { cn } from '../shared/lib/cn.ts'
import { useAppSelector } from '../shared/model/hooks.ts'
import { PatternBackground } from '../shared/ui/PatternBackground.tsx'
import { ChatSidebar } from '../widgets/ChatSidebar.tsx'
import { ChatWindow } from '../widgets/ChatWindow.tsx'

export function ChatPage() {
  const credentials = useAppSelector((state) => state.session.credentials)

  if (credentials === null) {
    return <Navigate to="/" replace />
  }

  return <Chats credentials={credentials} />
}

function Chats({ credentials }: { credentials: Credentials }) {
  const { chatId } = useParams()
  const chats = useAppSelector((state) => state.chats.list)
  const error = useReceiveMessages(credentials)
  const activeChat = chats.find((chat) => chat.id === chatId)

  return (
    <div className="flex h-dvh overflow-hidden">
      <div
        className={cn(
          'h-full w-full shrink-0 card:block card:w-sidebar card:border-r card:border-divider',
          activeChat ? 'hidden' : 'block',
        )}
      >
        <ChatSidebar chats={chats} activeChatId={chatId} credentials={credentials} error={error} />
      </div>
      <main className={cn('relative isolate h-full min-w-0 flex-1 card:block', activeChat ? 'block' : 'hidden')}>
        {activeChat ? <ChatWindow chat={activeChat} credentials={credentials} /> : <PatternBackground />}
      </main>
    </div>
  )
}
