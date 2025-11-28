import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // 또는 '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // ⬅️ 이 줄 추가
  ],
})
