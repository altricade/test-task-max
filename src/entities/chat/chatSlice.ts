import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type Message = {
  id: string
  text: string
  type: 'incoming' | 'outgoing'
  timestamp: number
  status: 'sending' | 'sent' | 'delivered' | 'read' | 'error'
}

export type Chat = {
  id: string
  phone: string | null
  name: string
  unread: number
  messages: Message[]
}

type ChatState = {
  list: Chat[]
}

const initialState: ChatState = {
  list: [],
}

function moveToTop(state: ChatState, chat: Chat) {
  state.list = [chat, ...state.list.filter((item) => item.id !== chat.id)]
}

export const chatSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    chatAdded(state, action: PayloadAction<{ id: string; phone: string; name: string }>) {
      if (!state.list.some((chat) => chat.id === action.payload.id)) {
        state.list.unshift({ ...action.payload, unread: 0, messages: [] })
      }
    },
    messageAdded(state, action: PayloadAction<{ chatId: string; name: string; message: Message }>) {
      const { chatId, name, message } = action.payload
      const chat = state.list.find((item) => item.id === chatId) ?? { id: chatId, phone: null, name, unread: 0, messages: [] }
      if (chat.messages.some((item) => item.id === message.id)) {
        return
      }
      chat.messages.push(message)
      if (message.type === 'incoming') {
        chat.unread += 1
      }
      moveToTop(state, chat)
    },
    messageSent(state, action: PayloadAction<{ chatId: string; tempId: string; id: string }>) {
      const { chatId, tempId, id } = action.payload
      const message = state.list.find((chat) => chat.id === chatId)?.messages.find((item) => item.id === tempId)
      if (message) {
        message.id = id
        message.status = 'sent'
      }
    },
    messageFailed(state, action: PayloadAction<{ chatId: string; id: string }>) {
      const { chatId, id } = action.payload
      const message = state.list.find((chat) => chat.id === chatId)?.messages.find((item) => item.id === id)
      if (message) {
        message.status = 'error'
      }
    },
    messageStatusChanged(state, action: PayloadAction<{ chatId: string; id: string; status: Message['status'] }>) {
      const { chatId, id, status } = action.payload
      const message = state.list.find((chat) => chat.id === chatId)?.messages.find((item) => item.id === id)
      if (message && !(message.status === 'read' && status === 'delivered')) {
        message.status = status
      }
    },
    chatRead(state, action: PayloadAction<string>) {
      const chat = state.list.find((item) => item.id === action.payload)
      if (chat) {
        chat.unread = 0
      }
    },
    chatsCleared(state) {
      state.list = []
    },
  },
})

export const { chatAdded, messageAdded, messageSent, messageFailed, messageStatusChanged, chatRead, chatsCleared } =
  chatSlice.actions
