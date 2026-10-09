import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'


// Vite config — https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  build: {
    sourcemap: false,
    minify: true,
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(path.dirname(import.meta.url).slice(7), './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 8443,
    strictPort: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 8443,
  },
})

