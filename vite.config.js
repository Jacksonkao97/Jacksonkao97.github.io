import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { copyFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// GitHub Pages serves 404.html for any path without a file. Make it the app
// shell so unknown URLs still load the app, which shows its "Page not found"
// page. (scripts/prerender.js then overwrites index.html with the
// prerendered home page, leaving 404.html as the plain shell.)
function spaFallback() {
  let outDir;
  return {
    name: "spa-404-fallback",
    apply: "build",
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      copyFileSync(
        path.join(outDir, "index.html"),
        path.join(outDir, "404.html")
      );
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), spaFallback()],
  server: {
    host: true,
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
