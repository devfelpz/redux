import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, PluginOption } from 'vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss() as unknown as PluginOption,
, react()],
})
