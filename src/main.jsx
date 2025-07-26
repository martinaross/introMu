import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { launching } from "./pages/Launching"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Launching />
  </StrictMode>,
)
