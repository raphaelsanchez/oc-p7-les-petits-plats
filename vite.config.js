// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/oc-p7-les-petits-plats/' : '/',
  // autres options de configuration...
})
