// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// vite.config.js
export default defineConfig({
  plugins: [vue()],
  server: {
    headers: {
      "Content-Security-Policy": "connect-src 'self' blob: data: *; img-src 'self' blob: data: *;"
    }
  }
})