import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Normal build: dist/ with separate assets (served by the Express server).
// `SINGLE_FILE=1 npm run build` → one self-contained dist/index.html
// (handy for sharing a demo, or uploading to hosts that only take one file).
const singleFile = !!process.env.SINGLE_FILE;

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    ...(singleFile ? [viteSingleFile()] : []),
  ],
  base: "./", // relative assets so the built site works from any static path
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
})
