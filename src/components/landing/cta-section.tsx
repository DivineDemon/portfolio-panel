import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="relative px-4 py-24 sm:px-6 sm:py-28">
      <div className="relative mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-3xl border border-primary/25 bg-card/80 p-8 text-center shadow-lg backdrop-blur-md sm:p-12 dark:border-primary/20 dark:bg-card/70">
          <div className="relative">
            <h2 className="text-balance font-semibold text-2xl tracking-tight sm:text-3xl lg:text-4xl">
              Ready to update your portfolio?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-balance text-foreground/75 sm:text-lg dark:text-muted-foreground">
              Jump into the dashboard and start shaping projects and testimonials that reflect your best work.
            </p>
            <Button asChild size="lg" className="mt-8 min-w-44 rounded-full shadow-md shadow-primary/25">
              <Link to="/login">
                Get started
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
