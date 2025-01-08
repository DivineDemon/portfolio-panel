import { type ReactNode } from "react";

import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";

import { ThemeProvider } from "./theme-provider";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Toaster richColors={true} />
        {children}
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default Providers;
