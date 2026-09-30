import { useState, type SubmitEvent } from 'react'
import { useNavigate } from 'react-router'
import { signedIn } from '../../entities/session/sessionSlice.ts'
import { getErrorMessage, getStateInstance } from '../../shared/api/greenApi.ts'
import { useAppDispatch } from '../../shared/model/hooks.ts'
import { Button } from '../../shared/ui/Button.tsx'
import { Logo } from '../../shared/ui/Logo.tsx'
import { TextField } from '../../shared/ui/TextField.tsx'

export function LoginForm() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [apiUrl, setApiUrl] = useState('')
  const [idInstance, setIdInstance] = useState('')
  const [apiTokenInstance, setApiTokenInstance] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const canSubmit = apiUrl.trim() !== '' && idInstance.trim() !== '' && apiTokenInstance.trim() !== '' && !loading

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const credentials = {
      apiUrl: apiUrl.trim().replace(/\/+$/, ''),
      idInstance: idInstance.trim(),
      apiTokenInstance: apiTokenInstance.trim(),
    }

    setLoading(true)
    setError('')
    try {
      const state = await getStateInstance(credentials)
      if (state !== 'authorized') {
        setError('Инстанс не авторизован. Отсканируйте QR-код в личном кабинете GREEN-API')
        return
      }
      dispatch(signedIn(credentials))
      void navigate('/chat')
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={(event) => {
        void handleSubmit(event)
      }}
      className="flex w-full flex-col items-center pt-5 card:pt-12"
    >
      <Logo className="mb-12 hidden card:inline-flex" />
      <h1 className="text-center text-xl font-semibold">Вход через GREEN-API</h1>
      <p className="mt-2 text-center text-[15px] text-fg-muted">Введите данные вашего инстанса GREEN-API</p>

      <div className="mt-6 flex w-full flex-col gap-3">
        <TextField
          label="apiUrl"
          placeholder="apiUrl"
          type="url"
          value={apiUrl}
          onChange={(event) => {
            setApiUrl(event.target.value)
          }}
        />
        <TextField
          label="idInstance"
          placeholder="idInstance"
          inputMode="numeric"
          value={idInstance}
          onChange={(event) => {
            setIdInstance(event.target.value)
          }}
        />
        <TextField
          label="apiTokenInstance"
          placeholder="apiTokenInstance"
          type="password"
          value={apiTokenInstance}
          onChange={(event) => {
            setApiTokenInstance(event.target.value)
          }}
        />
      </div>

      <p role="alert" className="min-h-4 w-full px-3 pt-1 text-[13px] text-danger">
        {error}
      </p>

      <Button type="submit" disabled={!canSubmit} className="mt-4">
        {loading ? 'Проверка…' : 'Продолжить'}
      </Button>
    </form>
  )
}
