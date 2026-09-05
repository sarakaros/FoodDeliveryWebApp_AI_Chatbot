import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175,        // <-- Đây chính là chỗ fix port
    strictPort: true   // Không nhảy sang port khác nếu 5175 bị chiếm
  }
})
