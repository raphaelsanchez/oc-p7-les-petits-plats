// vite.config.js
import { defineConfig } from "vite"

const isProduction = process.env.NODE_ENV === "production"

export default defineConfig({
  base: isProduction ? "/oc-p7-les-petits-plats/" : "/",
})
