import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3024,
    allowedHosts: ['recruitment-home.ith18.site']
  },
  plugins: [
    vue(),
    vueJsx(),
  ],
  build: {
    sourcemap: false,
    minify: 'terser'
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
