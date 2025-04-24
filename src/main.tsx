import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { UsersProvider } from './context/usersContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UsersProvider>
      <App />
    </UsersProvider>

  </StrictMode>,
)
