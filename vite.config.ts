import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Tailwind 4 runs through its own Vite plugin, so PostCSS has nothing to do.
  // An empty inline config also stops Vite from picking up a stray
  // postcss.config.* in a parent folder.
  css: { postcss: {} },
  assetsInclude: ["**/*.png", "**/*.jpg", "**/*.jpeg"],
  base: "/portfolio/",
});
