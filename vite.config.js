import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    host: true,
  },
  build: {
    // Completely disable module preloading. This prevents the browser from
    // downloading "react-vendor" and "framer-vendor" until they are actually
    // needed, solving the "Reduce unused JavaScript" Lighthouse warning.
    modulePreload: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'react-vendor';
            }
            if (id.includes('framer-motion')) {
              return 'framer-vendor';
            }
            return 'vendor';
          }
        }
      }
    }
  }
})
