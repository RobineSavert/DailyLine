import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueI18n from '@intlify/unplugin-vue-i18n/vite'
import { resolve } from 'path'


export default defineConfig({
  plugins: [
    vue(),
    vueI18n({
      include: resolve(__dirname, './src/i18n/messages/**')
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    https: false,
    port: 9000,
    hosts: true
  },
})
