// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? process.env.BASE_URL : '/',
  // other config options...
})