import { useState, type SubmitEvent } from 'react'
import { useNavigate } from 'react-router'
import { chatAdded } from '../../entities/chat/chatSlice.ts'
import { checkAccount, getErrorMessage, type Credentials } from '../../shared/api/greenApi.ts'
import { formatPhone } from '../../shared/lib/phone.ts'
import { useAppDispatch } from '../../shared/model/hooks.ts'
import { Button } from '../../shared/ui/Button.tsx'
import { Dialog } from '../../shared/ui/Dialog.tsx'
import { PhoneField } from '../../shared/ui/PhoneField.tsx'

type NewChatDialogProps = {
  open: boolean
  credentials: Credentials
  onClose: () => void
}

export function NewChatDialog({ open, credentials, onClose }: NewChatDialogProps) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [digits, setDigits] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function close() {
    setDigits('')
    setError('')
    onClose()
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const phone = `7${digits}`

    setLoading(true)
    setError('')
    try {
      const account = await checkAccount(credentials, phone)
      if (!account.exist || account.chatId === undefined) {
        setError('Этот номер не зарегистрирован в MAX')
        return
      }
      dispatch(chatAdded({ id: account.chatId, phone, name: formatPhone(phone) }))
      close()
      void navigate(`/chat/${account.chatId}`)
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} title="Новый чат" onClose={close}>
      <form
        onSubmit={(event) => {
          void handleSubmit(event)
        }}
      >
        <PhoneField value={digits} onChange={setDigits} />
        <p className="min-h-4 px-4 pt-1 text-[13px] text-danger">{error}</p>
        <Button type="submit" disabled={digits.length !== 10 || loading} className="mt-4">
          {loading ? 'Поиск…' : 'Найти в MAX'}
        </Button>
      </form>
    </Dialog>
  )
}
