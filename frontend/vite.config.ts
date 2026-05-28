import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': {
        target: process.env.VITE_BACKEND_PROXY_URL ?? 'http://localhost:8001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/cms': {
        target: process.env.VITE_STRAPI_PROXY_URL ?? 'http://localhost:1337',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cms/, '/api'),
      },
      '/uploads': {
        target: process.env.VITE_STRAPI_PROXY_URL ?? 'http://localhost:1337',
        changeOrigin: true,
      },
    },
  },
})
