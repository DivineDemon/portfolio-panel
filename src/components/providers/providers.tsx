import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { AuthProvider } from "@/components/providers/auth-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import store from "@/store";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <AuthProvider>
          <TooltipProvider>
            <Toaster richColors duration={1500} position="top-right" />
            {children}
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default Providers;
