import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// Plain Vite + React SPA config — no SSR, no server target.
// Build output goes to dist/ for static hosting (e.g. Vercel).
export default defineConfig({
  plugins: [tsconfigPaths(), react(), tailwindcss()],
  build: {
    outDir: "dist",
  },
});
