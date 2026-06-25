import { FolderKanban, MessageSquareQuote, Zap } from "lucide-react";

import { SectionHeader } from "@/components/landing/section-background";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: FolderKanban,
    title: "Projects",
    description:
      "Build detailed case studies with a guided wizard — story, tech stack, media, and SEO fields in one flow.",
    accent: "from-primary/20 via-primary/5 to-transparent",
    ring: "group-hover:shadow-primary/10",
  },
  {
    icon: MessageSquareQuote,
    title: "Testimonials",
    description:
      "Add and edit client quotes in a quick slide-over panel. Keep social proof fresh without leaving the dashboard.",
    accent: "from-accent/30 via-accent/10 to-transparent",
    ring: "group-hover:shadow-accent/15",
  },
  {
    icon: Zap,
    title: "Fast publishing",
    description:
      "Toggle featured and published states instantly. Ship portfolio updates the moment your content is ready.",
    accent: "from-chart-2/25 via-chart-2/5 to-transparent",
    ring: "group-hover:shadow-chart-2/15",
  },
] as const;

export function Features() {
  return (
    <section id="features" className="relative px-4 py-24 sm:px-6 sm:py-28">
      <div className="relative mx-auto max-w-6xl">
        <SectionHeader
          badge="Features"
          title="Everything you need to stay current"
          description="A streamlined CMS for a personal portfolio — no clutter, no multi-user overhead, just the tools that matter."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description, accent, ring }) => (
            <Card
              key={title}
              className={cn(
                "group relative overflow-hidden border-border/60 bg-card/70 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-lg",
                ring,
              )}
            >
              <div
                aria-hidden
                className={cn(
                  "pointer-events-none absolute inset-0 bg-linear-to-br opacity-60 transition-opacity group-hover:opacity-100",
                  accent,
                )}
              />
              <CardHeader className="relative">
                <span className="mb-3 flex size-11 items-center justify-center rounded-xl border border-primary/15 bg-primary/10 text-primary shadow-sm transition-all group-hover:border-primary/30 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-md">
                  <Icon className="size-5" />
                </span>
                <CardTitle className="text-lg">{title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">{description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
