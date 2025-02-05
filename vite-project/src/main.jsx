import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { LanguageProvider } from "./contexts/LanguageContext"; // Import du provider

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LanguageProvider>
      {/* Enveloppe l'application avec le provider */}
      <App />
    </LanguageProvider>
  </StrictMode>
);
