import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AppStateProvider } from './Context/AppStateProvider.tsx'
import { GriffelProvider } from './Theme/GriffelProvider.tsx'
import './index.css' // Keep this for @fontsource imports and very basic resets if any

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GriffelProvider>
      <AppStateProvider>
        <App />
      </AppStateProvider>
    </GriffelProvider>
  </StrictMode>,
)
