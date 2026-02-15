import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "@/store";
import { Toaster } from "../ui/sonner";
import { ThemeProvider } from "./theme-provider";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <Toaster richColors={true} duration={1500} position="top-right" />
          {children}
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default Providers;
