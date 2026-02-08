import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const backendUrl = process.env.VITE_BACKEND_URL || 'http://localhost:5000';
const frontendUrl = process.env.VITE_FRONTEND_URL || 'http://localhost:5173';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
      port: 5173,
      proxy: {
        '/api': {
          target: backendUrl,
          changeOrigin: true,
        },
      },
    },
  preview: {
    allowedHosts: [
      backendUrl,
      frontendUrl
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
