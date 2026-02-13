import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],

  // 👇 sobe dois níveis: web → frontend → reumx
  envDir: path.resolve(__dirname, '../..'),
})
