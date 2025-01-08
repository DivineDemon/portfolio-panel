import { type ReactNode } from "react";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";

import store from "@/store";

import { ThemeProvider } from "./theme-provider";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <Toaster richColors={true} />
          {children}
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default Providers;
