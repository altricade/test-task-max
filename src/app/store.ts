import { configureStore } from '@reduxjs/toolkit'
import { chatSlice } from '../entities/chat/chatSlice.ts'
import { sessionSlice } from '../entities/session/sessionSlice.ts'

export const store = configureStore({
  reducer: {
    session: sessionSlice.reducer,
    chats: chatSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
