import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import Comercios from './Comercios.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Comercios />
  </StrictMode>,
)
