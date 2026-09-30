import { useState } from 'react'
import { chatsCleared, type Chat } from '../entities/chat/chatSlice.ts'
import { ChatRow } from '../entities/chat/ui/ChatRow.tsx'
import { signedOut } from '../entities/session/sessionSlice.ts'
import { NewChatDialog } from '../features/create-chat/NewChatDialog.tsx'
import type { Credentials } from '../shared/api/greenApi.ts'
import { useAppDispatch } from '../shared/model/hooks.ts'
import { IconButton } from '../shared/ui/IconButton.tsx'
import { LogoutIcon, PlusIcon } from '../shared/ui/icons.tsx'

type ChatSidebarProps = {
  chats: Chat[]
  activeChatId: string | undefined
  credentials: Credentials
  error: string
}

export function ChatSidebar({ chats, activeChatId, credentials, error }: ChatSidebarProps) {
  const dispatch = useAppDispatch()
  const [dialogOpen, setDialogOpen] = useState(false)

  function logout() {
    dispatch(signedOut())
    dispatch(chatsCleared())
  }

  return (
    <aside className="flex h-full flex-col bg-surface">
      <div className="flex flex-col gap-4 px-4 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Чаты</h1>
          <div className="flex gap-1">
            <IconButton label="Выйти" onClick={logout}>
              <LogoutIcon size={20} />
            </IconButton>
            <IconButton
              label="Новый чат"
              primary
              onClick={() => {
                setDialogOpen(true)
              }}
            >
              <PlusIcon size={20} />
            </IconButton>
          </div>
        </div>
        {error === '' ? null : <p className="text-[13px] text-danger">{error}</p>}
      </div>

      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <ChatRow key={chat.id} chat={chat} active={chat.id === activeChatId} />
        ))}
        {chats.length === 0 ? (
          <p className="px-6 pt-10 text-center text-[15px] text-fg-muted">Чатов пока нет. Нажмите +, чтобы начать</p>
        ) : null}
      </div>

      <NewChatDialog
        open={dialogOpen}
        credentials={credentials}
        onClose={() => {
          setDialogOpen(false)
        }}
      />
    </aside>
  )
}
