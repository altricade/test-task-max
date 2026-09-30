import { Navigate } from 'react-router'
import { LoginForm } from '../features/auth/LoginForm.tsx'
import { useAppSelector } from '../shared/model/hooks.ts'
import { AuthLayout } from '../widgets/AuthLayout.tsx'

export function LoginPage() {
  const credentials = useAppSelector((state) => state.session.credentials)

  if (credentials !== null) {
    return <Navigate to="/chat" replace />
  }

  return (
    <AuthLayout
      footer={
        <p className="text-[13px] text-fg-muted">
          Данные инстанса есть в{' '}
          <a href="https://console.green-api.com/" target="_blank" rel="noreferrer" className="whitespace-nowrap text-fg hover:underline">
            личном кабинете GREEN-API
          </a>
        </p>
      }
    >
      <LoginForm />
    </AuthLayout>
  )
}
