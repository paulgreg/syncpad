import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import HomePage from './pages/HomePage.tsx'
import settings from './settings.json'
import EditorPage from './pages/EditorPage.tsx'
import ListPage from './pages/ListPage.tsx'

if ('serviceWorker' in navigator)
  navigator.serviceWorker.register(`${settings.baseUrl}sw.js`)

createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename={settings.baseUrl}>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="/editor/:guid/:index" element={<EditorPage />} />
        <Route path="/list/:guid" element={<ListPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
