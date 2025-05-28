import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import fs from 'fs';

export default defineConfig({
  base: '/codehub/',
  plugins: [
    react(),
    nodePolyfills(),
    {
      // 👇 This plugin copies 404.html to dist/ after build
      name: 'copy-404',
      closeBundle() {
        try {
          fs.copyFileSync('public/404.html', 'dist/404.html');
          console.log('404.html copied to dist/');
        } catch (err) {
          console.error('Failed to copy 404.html:', err);
        }
      },
    },
  ],
  define: {
    global: 'window', // Define global for Simple-Peer
  },
  resolve: {
    alias: {
      buffer: 'buffer',
    },
  },
});