import { createRoot } from "react-dom/client";

import "@/assets/css/index.css";

import App from "./App.tsx";
import Providers from "./components/providers.tsx";

createRoot(document.getElementById("root")!).render(
  <Providers>
    <App />
  </Providers>
);
