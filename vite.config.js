import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    nodePolyfills(),
    visualizer({
      filename: "dist/stats.html",
      template: "treemap",
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  define: {
    global: "window",
  },
  resolve: {
    alias: {
      buffer: "buffer",
    },
  },
  build: {
    minify: "terser",
    terserOptions: {
      format: {
        comments: false, // remove all comments
      },
      compress: {
        drop_console: true,  // remove console.* calls
        drop_debugger: true, // remove debugger statements
        dead_code: true,     // remove unused code
      },
    },
    rollupOptions: {
      treeshake: true, // aggressively remove unused imports
      output: {
        manualChunks: {
          vendor: [
            "react",
            "react-dom",
            "react-router-dom",
            "axios",
            "simple-peer",
          ],
        },
      },
    },
  },
});
