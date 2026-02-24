import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'bc5b-103-3-221-59.ngrok-free.app' // Tambahkan link ngrok kamu di sini
    ]
  }
})