import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react({ include: /src\/.*\.(js|jsx)$/ })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  esbuild: {
    include: /src\/.*\.(js|jsx)$/,
    loader: 'jsx',
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
});
