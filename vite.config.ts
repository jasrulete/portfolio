import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.png", "**/*.jpg", "**/*.jpeg"],
  base: "/portfolio/",
  build: {
    // Multi-page build, no router: the Design Lab is its own HTML entry, so
    // the homepage never downloads its 3D demos. Paths are relative to the
    // project root. Output: dist/index.html and dist/design/index.html.
    rollupOptions: {
      input: {
        main: "index.html",
        design: "design/index.html",
      },
    },
  },
});
