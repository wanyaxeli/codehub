import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills(),
  ],
  define: {
    global: 'window', // Define global for Simple-Peer
  },
  resolve: {
    alias: {
      buffer: 'buffer', // Ensure buffer is available
    },
  },
});