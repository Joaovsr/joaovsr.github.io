import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/ask': 'http://127.0.0.1:8000',
      '/admin': 'http://127.0.0.1:8000',
      '/portfolio': 'http://127.0.0.1:8000'
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/styles/scss/_variables.scss"; @import "@/assets/styles/scss/_mixins.scss";`,
        silenceDeprecations: ['import', 'legacy-js-api']
      }
    }
  }
})
