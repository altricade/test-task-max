import { useState, type KeyboardEvent, type SubmitEvent } from 'react'
import { messageAdded, messageFailed, messageSent } from '../../entities/chat/chatSlice.ts'
import { sendMessage, type Credentials } from '../../shared/api/greenApi.ts'
import { useAppDispatch } from '../../shared/model/hooks.ts'
import { IconButton } from '../../shared/ui/IconButton.tsx'
import { SendIcon } from '../../shared/ui/icons.tsx'

type ComposerProps = {
  chatId: string
  chatName: string
  credentials: Credentials
}

export function Composer({ chatId, chatName, credentials }: ComposerProps) {
  const dispatch = useAppDispatch()
  const [text, setText] = useState('')

  async function send() {
    const message = text.trim()
    if (message === '') {
      return
    }
    setText('')

    const tempId = crypto.randomUUID()
    dispatch(
      messageAdded({
        chatId,
        name: chatName,
        message: { id: tempId, text: message, type: 'outgoing', timestamp: Date.now(), status: 'sending' },
      }),
    )

    try {
      const id = await sendMessage(credentials, chatId, message)
      dispatch(messageSent({ chatId, tempId, id }))
    } catch {
      dispatch(messageFailed({ chatId, id: tempId }))
    }
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    void send()
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      void send()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-composer px-4 pb-4">
      <div className="flex items-end gap-1 rounded-field bg-surface p-1">
        <textarea
          rows={1}
          aria-label="Сообщение"
          placeholder="Сообщение"
          value={text}
          onChange={(event) => {
            setText(event.target.value)
          }}
          onKeyDown={handleKeyDown}
          className="max-h-40 min-h-10 flex-1 resize-none bg-transparent px-3 py-2.5 text-base leading-5 text-fg outline-none field-sizing-content placeholder:text-fg-placeholder"
        />
        <IconButton label="Отправить" type="submit" primary disabled={text.trim() === ''}>
          <SendIcon size={22} />
        </IconButton>
      </div>
    </form>
  )
}
