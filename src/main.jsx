import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LazyMotion } from 'framer-motion'
import App from './App.jsx'

// Load animation features asynchronously to reduce initial bundle size
const loadFeatures = () => import('./utils/framerFeatures.js').then(res => res.default);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LazyMotion features={loadFeatures} strict>
      <App />
    </LazyMotion>
  </StrictMode>,
)
