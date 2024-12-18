import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000", // JSON server or backend URL
        changeOrigin: true, // Ensures the Host header is updated
        rewrite: (path) => path.replace(/^\/api/, ""), // Removes /api prefix before forwarding
      },
    },
  },
});
