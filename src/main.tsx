import { createRoot } from "react-dom/client";
import "@uiw/react-markdown-preview/markdown.css";
import "@uiw/react-md-editor/markdown-editor.css";

import "@/assets/css/index.css";
import App from "./app";

import Providers from "./components/providers";

createRoot(document.getElementById("root")!).render(
  <Providers>
    <App />
  </Providers>,
);
