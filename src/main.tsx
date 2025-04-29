import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { UsersProvider } from './context/usersContext.tsx'
import { NotificationProvider } from './context/notificationContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NotificationProvider>
      <UsersProvider>
        <App />
      </UsersProvider>
    </NotificationProvider>

  </StrictMode>,
)
