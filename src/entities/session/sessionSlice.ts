import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Credentials } from '../../shared/api/greenApi.ts'

type SessionState = {
  credentials: Credentials | null
}

const initialState: SessionState = {
  credentials: null,
}

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    signedIn(state, action: PayloadAction<Credentials>) {
      state.credentials = action.payload
    },
    signedOut(state) {
      state.credentials = null
    },
  },
})

export const { signedIn, signedOut } = sessionSlice.actions
