import { Link } from "react-router-dom";

import { AppLogoIcon } from "@/components/brand/app-logo";
import { Button } from "@/components/ui/button";
import { PUBLIC_PORTFOLIO_URL } from "@/lib/constants";

export function LandingFooter() {
  return (
    <footer className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 p-4 sm:flex-row sm:p-6">
      <div className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
        <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <AppLogoIcon className="mb-0.5 ml-0.5 size-8" />
          <p className="font-medium text-sm">Portfolio Panel</p>
        </Link>
        <p className="text-black text-sm dark:text-muted-foreground">Manage content, publish with confidence.</p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button asChild variant="ghost" size="sm" className="rounded-full">
          <a href={PUBLIC_PORTFOLIO_URL} target="_blank" rel="noopener noreferrer">
            View portfolio
          </a>
        </Button>
        <Button asChild variant="secondary" size="sm" className="rounded-full">
          <Link to="/login">Sign in</Link>
        </Button>
      </div>
    </footer>
  );
}
