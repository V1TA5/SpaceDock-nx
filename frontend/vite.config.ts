import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import stylex from '@stylexjs/unplugin';
import { visualizer } from 'rollup-plugin-visualizer';

const backend = process.env.BACKEND_URL ?? 'http://backend:5000';

export default defineConfig(({ mode }) => ({
  plugins: [
    stylex.vite({ dev: mode === 'development', runtimeInjection: false }),
    react(),
    mode === 'production' && process.env.ANALYZE ? visualizer({ open: true }) : null,
  ].filter(Boolean),
  server: {
    host: true,
    port: 5173,
    watch: { usePolling: true },
    proxy: {
      '/api': { target: backend, changeOrigin: true },
      '/static': { target: backend, changeOrigin: true },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
  },
}));
