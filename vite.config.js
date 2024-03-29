import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      process: 'process/browser',
      buffer: 'buffer',
      stream: 'stream-browserify',
      zlib: 'browserify-zlib',
      util: 'util',
    },
  },
  build: {
    chunkSizeWarningLimit: 2500,
  },
  plugins: [react()],
});
