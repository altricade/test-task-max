import { Provider } from 'react-redux'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router'
import { ChatPage } from '../pages/ChatPage.tsx'
import { LoginPage } from '../pages/LoginPage.tsx'
import { store } from './store.ts'

const router = createBrowserRouter(
  [
    { path: '/', element: <LoginPage /> },
    { path: '/chat/:chatId?', element: <ChatPage /> },
    { path: '*', element: <Navigate to="/" replace /> },
  ],
  { basename: import.meta.env.BASE_URL },
)

export function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}
