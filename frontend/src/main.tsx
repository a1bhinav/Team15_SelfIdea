import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId="1033962618468-0vjktlqe3c4joqt37jetl97fhhef7vhk.apps.googleusercontent.com">
    <StrictMode>
      <App />
    </StrictMode>
  </GoogleOAuthProvider>
)
