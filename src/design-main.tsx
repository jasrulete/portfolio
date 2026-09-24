import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import DesignLabPage from "./components/design-lab-page";

// Second Vite HTML entry (see vite.config.ts build.rollupOptions.input), not a
// route: /portfolio/design/ ships the 3D demos to the people who ask for them
// and nobody else. There is no router and no shared shell with App.tsx.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DesignLabPage />
  </StrictMode>,
);
