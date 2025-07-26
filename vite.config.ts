import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginSvgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    build: {
      sourcemap: true,
    },
    base: './',
    plugins: [react(), vitePluginSvgr()],
    test: {
      include: ['**/*.test.js'],
      globals: true,
    },
  }
})
