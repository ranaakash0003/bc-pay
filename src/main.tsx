import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { PenaltyProvider } from "./context/PenaltyContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PenaltyProvider>
      <App />
    </PenaltyProvider>
  </StrictMode>
);
