import { createRoot } from "react-dom/client";

import "@/assets/css/index.css";
import App from "./App";

import Providers from "./components/providers";

createRoot(document.getElementById("root")!).render(
  <Providers>
    <App />
  </Providers>,
);
