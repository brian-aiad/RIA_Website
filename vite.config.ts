// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  base: "/",

  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    target: "es2015",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          animations: ["framer-motion", "lenis"],
          ui: ["lucide-react"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },

  server: {
    port: 3002,
    strictPort: true,
    open: true,
  },

  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
