import './index.css'
import { StrictMode } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import HomePage from './pages/HomePage.tsx'
import EditorPage from './pages/EditorPage.tsx'
import ListPage from './pages/ListPage.tsx'

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator)
  navigator.serviceWorker.register('/syncpad/sw.js')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter
      basename={process.env.NODE_ENV === 'production' ? '/syncpad' : ''}
    >
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/editor/:name/:index" element={<EditorPage />} />
          <Route path="/list/:name" element={<ListPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
