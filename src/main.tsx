import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ErrorBoundary from "./components/ErrorBoundary.tsx"
import AuthCallback from "./components/AuthCallback.tsx"
import TopNavbar from './components/TopNavbar.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<TopNavbar/>}/>
          {/* <Route path="/auth/callback" element={<AuthCallback />} /> */}
          {/* <Route path="/*" element={<App />} /> */}
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>,
)

