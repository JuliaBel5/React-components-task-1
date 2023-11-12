import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,ts,mts,cts,jsx,tsx}'],
    setupFiles: './setupTests.ts',
    coverage: {
      enabled: true,
      provider: 'v8',
      all: true,
      reporter: 'text',
      exclude: [
        'src/components/ErrorBoundary.tsx',
        'src/vite-env.d.ts',
        'eslint.cjs',
      ],
    },
    watch: true,
  },
})
