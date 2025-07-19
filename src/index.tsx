import { StrictMode } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import HomePage from './pages/HomePage.tsx'
import settings from './settings.json'
import EditorPage from './pages/EditorPage.tsx'
import './index.css'
import DataContextProvider from './DataContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DataContextProvider>
      <App />
      <BrowserRouter basename={settings.baseUrl}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="/editor/:guid" element={<EditorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DataContextProvider>
  </StrictMode>
)
