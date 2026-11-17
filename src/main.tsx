import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Les balises SEO par défaut d'index.html sont retirées : chaque page pose les siennes (composant Seo)
document.querySelectorAll("[data-default-seo]").forEach((tag) => tag.remove());

createRoot(document.getElementById("root")!).render(<App />);
