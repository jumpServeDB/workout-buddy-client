import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/workout-buddy-client",
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://workout-buddy-server-production.up.railway.app:4000",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
