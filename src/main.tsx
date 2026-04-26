import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/600.css";
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ErrorBoundary from "./components/ErrorBoundary.tsx"
import TopNavbar from './components/TopNavbar.tsx';
import IssuesPage from './pages/IssuesPage.tsx';
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import Bookmarks from './pages/Bookmarks.tsx';
import Login from './pages/Login.tsx';
import { Analytics } from "@vercel/analytics/react"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Theme>
        <ErrorBoundary>
          <TopNavbar />
          <Routes>
            <Route path="/*" element={<App />} />
            <Route path="/issues" element={<IssuesPage />} />
            <Route path="/bookmark" element={<Bookmarks />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </ErrorBoundary>
      </Theme>
      <Analytics />
    </BrowserRouter>
  </StrictMode>,
)

