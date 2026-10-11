import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks: {
          'three-vendor': ['three', '@react-three/fiber'],
          'react-vendor': ['react', 'react-dom']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: false
  }
})
