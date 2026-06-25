import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PUBLIC_PORTFOLIO_URL } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative flex min-h-svh items-center justify-center px-4 sm:px-6">
      <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <Badge variant="secondary" className="mb-6 bg-primary px-3 py-1 font-medium text-background">
          Content management
        </Badge>

        <h1 className="text-balance font-semibold text-4xl text-foreground tracking-tight drop-shadow-sm sm:text-5xl lg:text-6xl dark:drop-shadow-none">
          Manage your&nbsp;
          <span className="bg-linear-to-r from-teal-800 via-teal-600 to-teal-700 bg-clip-text text-transparent dark:from-primary dark:via-primary dark:to-accent-foreground">
            portfolio content
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-balance text-foreground/75 text-lg sm:text-xl dark:text-muted-foreground">
          Create rich project case studies, collect client testimonials, and publish updates — all from one focused
          admin panel built for speed.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="min-w-40 rounded-full shadow-md shadow-primary/25">
            <Link to="/login">
              Sign in
              <ArrowRight />
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="lg"
            className="min-w-40 rounded-full border-foreground/15 bg-background/90 shadow-sm backdrop-blur-sm dark:border-border dark:bg-transparent dark:shadow-none"
          >
            <a href={PUBLIC_PORTFOLIO_URL} target="_blank" rel="noopener noreferrer">
              View portfolio
              <ExternalLink />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
