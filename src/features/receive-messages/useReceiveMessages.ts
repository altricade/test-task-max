import { useEffect, useState } from 'react'
import { z } from 'zod'
import { messageAdded, messageStatusChanged } from '../../entities/chat/chatSlice.ts'
import {
  deleteNotification,
  getErrorMessage,
  receiveNotification,
  type Credentials,
} from '../../shared/api/greenApi.ts'
import { useAppDispatch } from '../../shared/model/hooks.ts'

const messageSchema = z.object({
  typeWebhook: z.enum(['incomingMessageReceived', 'outgoingMessageReceived']),
  idMessage: z.string(),
  timestamp: z.number(),
  senderData: z.object({
    chatId: z.string(),
    chatName: z.string().optional(),
    senderName: z.string().optional(),
  }),
  messageData: z.object({
    textMessageData: z.object({ textMessage: z.string() }).optional(),
    extendedTextMessageData: z.object({ text: z.string() }).optional(),
  }),
})

const statusSchema = z.object({
  typeWebhook: z.literal('outgoingMessageStatus'),
  chatId: z.string(),
  idMessage: z.string(),
  status: z.string(),
})

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function useReceiveMessages(credentials: Credentials) {
  const dispatch = useAppDispatch()
  const [error, setError] = useState('')

  useEffect(() => {
    let stopped = false

    async function poll() {
      while (!stopped) {
        try {
          const notification = await receiveNotification(credentials)
          setError('')
          if (notification === null) {
            await wait(3000)
            continue
          }

          const parsed = messageSchema.safeParse(notification.body)
          if (parsed.success) {
            const { typeWebhook, idMessage, timestamp, senderData, messageData } = parsed.data
            const incoming = typeWebhook === 'incomingMessageReceived'
            const text = messageData.textMessageData?.textMessage ?? messageData.extendedTextMessageData?.text
            if (text !== undefined) {
              dispatch(
                messageAdded({
                  chatId: senderData.chatId,
                  name: (incoming ? senderData.senderName : senderData.chatName) ?? senderData.chatId,
                  message: {
                    id: idMessage,
                    text,
                    type: incoming ? 'incoming' : 'outgoing',
                    timestamp: timestamp * 1000,
                    status: 'sent',
                  },
                }),
              )
            }
          }

          const statusUpdate = statusSchema.safeParse(notification.body)
          if (statusUpdate.success) {
            const { chatId, idMessage, status } = statusUpdate.data
            if (status === 'delivered' || status === 'read') {
              dispatch(messageStatusChanged({ chatId, id: idMessage, status }))
            } else if (status === 'failed' || status === 'noAccount') {
              dispatch(messageStatusChanged({ chatId, id: idMessage, status: 'error' }))
            }
          }

          await deleteNotification(credentials, notification.receiptId)
        } catch (err) {
          setError(getErrorMessage(err))
          await wait(5000)
        }
      }
    }

    void poll()
    return () => {
      stopped = true
    }
  }, [credentials, dispatch])

  return error
}
