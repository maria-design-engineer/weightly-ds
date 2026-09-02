import { fileURLToPath } from 'node:url'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/**
 * Замер ветки для этапа 6: сколько весит то, что уедет в приложение
 * вместе с четырьмя узлами. React внешний, чужая библиотека — внутри.
 * Запуск: npx vite build --config src/probe-gravity/vite.measure.config.ts
 */
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist-measure-gravity',
    lib: {
      entry: fileURLToPath(new URL('./index.ts', import.meta.url)),
      name: 'ProbeGravity',
      formats: ['es'],
      fileName: () => 'probe-gravity.js',
    },
    rollupOptions: { external: ['react', 'react-dom', 'react/jsx-runtime'] },
  },
})
