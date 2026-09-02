import { fileURLToPath } from 'node:url'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/**
 * Замер ветки для этапа 6: сколько весит то, что уедет в приложение
 * вместе с четырьмя узлами. React внешний, чужая библиотека — внутри.
 * Запуск: npx vite build --config src/probe-baseui/vite.measure.config.ts
 */
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist-measure-baseui',
    lib: {
      entry: fileURLToPath(new URL('./index.ts', import.meta.url)),
      name: 'ProbeBaseUi',
      formats: ['es'],
      fileName: () => 'probe-baseui.js',
    },
    rollupOptions: { external: ['react', 'react-dom', 'react/jsx-runtime'] },
  },
})
