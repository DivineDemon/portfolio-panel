import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { AppLogoIcon } from "@/components/brand/app-logo";
import { useAuth } from "@/components/providers/auth-provider";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#capabilities", label: "Capabilities" },
] as const;

const SCROLL_THRESHOLD = 32;

export function LandingHeader() {
  const { pathname } = useLocation();
  const { isAuthenticated } = useAuth();
  const isLoginPage = pathname === "/login";
  const authed = isAuthenticated === true;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:px-6">
      <div
        className={cn(
          "pointer-events-auto flex w-full items-center justify-between rounded-full p-2.5 backdrop-blur-xl transition-[max-width,padding-inline,box-shadow,background-color,border-color] duration-500 ease-in-out motion-reduce:transition-none",
          "border-border/80 bg-white/90 shadow-black/10 shadow-lg ring-1 ring-black/5",
          "dark:border-border/50 dark:bg-background/25 dark:shadow-black/5 dark:ring-white/5",
          scrolled ? "max-w-3xl shadow-md" : "max-w-6xl",
        )}
      >
        <div className="w-[187px]">
          <Link
            to="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
            aria-label="Portfolio Panel home"
          >
            <AppLogoIcon className="mb-0.5 ml-0.5 size-8" />
          </Link>
        </div>

        <nav className={cn("hidden items-center gap-0.5 md:flex", scrolled && "gap-0")}>
          {navLinks.map((link) => (
            <Button
              key={link.href}
              asChild
              variant="ghost"
              size="sm"
              className={cn(
                "rounded-full text-foreground/85 transition-[padding,color,background-color] duration-500 hover:bg-foreground/5 hover:text-foreground dark:text-foreground dark:hover:bg-accent",
                scrolled ? "px-2.5" : "px-3",
              )}
            >
              <Link to={link.href}>{link.label}</Link>
            </Button>
          ))}
        </nav>

        <div className="flex w-[187px] items-center justify-end gap-1.5 sm:gap-2">
          <AnimatedThemeToggler />
          {!isLoginPage ? (
            authed ? (
              <Button asChild size="sm" className={cn("rounded-full", scrolled && "px-3.5")}>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <Button asChild size="sm" className={cn("rounded-full shadow-sm", scrolled && "px-3.5")}>
                <Link to="/login">Get started</Link>
              </Button>
            )
          ) : null}
        </div>
      </div>
    </header>
  );
}
