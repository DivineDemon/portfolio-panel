import { LayoutDashboard, PenLine, Rocket } from "lucide-react";

import { SectionHeader } from "@/components/landing/section-background";

const steps = [
  {
    icon: LayoutDashboard,
    step: "01",
    title: "Sign in securely",
    description: "Access your private admin panel with a single password. No accounts, no complexity.",
  },
  {
    icon: PenLine,
    step: "02",
    title: "Create & edit content",
    description:
      "Use guided wizards for projects and quick sheets for testimonials. Markdown, media, and SEO built in.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Publish instantly",
    description: "Flip featured and published toggles when you're ready. Your live portfolio updates right away.",
  },
] as const;

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative px-4 py-24 sm:px-6 sm:py-28">
      <div className="relative mx-auto max-w-6xl">
        <SectionHeader
          badge="Workflow"
          title="From draft to live in three steps"
          description="Portfolio Panel keeps the path short — sign in, shape your content, and ship it without leaving the dashboard."
        />

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map(({ icon: Icon, step, title, description }, index) => (
            <div key={step} className="group relative">
              {index < steps.length - 1 && (
                <div
                  aria-hidden
                  className="absolute top-10 left-[calc(50%+2.5rem)] hidden h-px w-[calc(100%-5rem)] bg-linear-to-r from-primary/30 to-transparent md:block"
                />
              )}

              <div className="relative flex flex-col items-center rounded-2xl border border-border/50 bg-card/85 p-8 text-center shadow-sm backdrop-blur-md transition-all duration-300 group-hover:border-primary/25 group-hover:shadow-md dark:bg-card/75">
                <span className="mb-4 font-mono text-primary/60 text-xs tracking-widest">{step}</span>
                <span className="mb-5 flex size-14 items-center justify-center rounded-2xl border border-primary/15 bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-6" />
                </span>
                <h3 className="font-semibold text-lg">{title}</h3>
                <p className="mt-3 text-muted-foreground text-sm leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
