import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Launching } from "./pages/Launching.jsx"
import './index.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    < Launching />
  </StrictMode>,
)
