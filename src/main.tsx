import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BoardProvider } from './context/boardcontext.tsx'
import { OverlayProvider } from './context/overlaycontext.tsx'
import { NotificationProvider } from './context/notificationcontext.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BoardProvider>
      <OverlayProvider>
        <NotificationProvider>
          <App />
        </NotificationProvider>
      </OverlayProvider>
    </BoardProvider>
  </React.StrictMode>,
)
