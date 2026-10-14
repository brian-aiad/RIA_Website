// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { quoteEndpoint } from "./server/viteQuote";

// https://vitejs.dev/config/
export default defineConfig(({ isSsrBuild, mode }) => ({
  plugins: [react(), quoteEndpoint(mode)],

  base: "/",

  build: {
    outDir: mode === "review" ? "dist-review" : "dist",
    assetsDir: "assets",
    sourcemap: false,
    target: "es2015",
    rollupOptions: {
      output: {
        manualChunks: isSsrBuild ? undefined : {
          vendor: ["react", "react-dom", "react-router-dom"],
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
}));
