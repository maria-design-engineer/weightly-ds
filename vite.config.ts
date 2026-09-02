import { fileURLToPath } from 'node:url'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Режим библиотеки: сборка отдаёт пакет, а не сайт.
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: 'Ds',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'ds.js' : 'ds.cjs'),
    },
    rollupOptions: {
      // React приходит из приложения, внутрь пакета не уезжает.
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
  },
})
