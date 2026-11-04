import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte(), tailwindcss()],
  base: '/BudgetWise/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
