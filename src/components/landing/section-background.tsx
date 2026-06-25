import { cn } from "@/lib/utils";

type SectionBackgroundVariant = "mesh" | "dots" | "glow" | "grid";

interface SectionBackgroundProps {
  variant?: SectionBackgroundVariant;
  className?: string;
}

export function SectionBackground({ variant = "mesh", className }: SectionBackgroundProps) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {variant === "mesh" && (
        <>
          <div className="absolute -top-24 -left-24 size-80 rounded-full bg-primary/10 blur-3xl dark:bg-primary/15" />
          <div className="absolute -right-16 -bottom-16 size-72 rounded-full bg-accent/25 blur-3xl dark:bg-accent/15" />
          <div className="absolute inset-0 bg-linear-to-b from-background via-transparent to-background" />
        </>
      )}

      {variant === "dots" && (
        <>
          <div
            className="absolute inset-0 opacity-40 dark:opacity-25"
            style={{
              backgroundImage: "radial-gradient(circle, var(--border) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="absolute inset-0 bg-linear-to-b from-background via-background/80 to-background" />
        </>
      )}

      {variant === "glow" && (
        <>
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />
          <div className="absolute top-1/2 left-1/2 size-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/8 blur-3xl dark:bg-primary/12" />
          <div className="absolute inset-0 bg-linear-to-b from-muted/40 via-background to-muted/40" />
        </>
      )}

      {variant === "grid" && (
        <>
          <div
            className="absolute inset-0 opacity-[0.35] dark:opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 20%, transparent 100%)",
            }}
          />
          <div className="absolute inset-0 bg-background/60" />
        </>
      )}
    </div>
  );
}

interface SectionHeaderProps {
  badge: string;
  title: string;
  description: string;
  className?: string;
}

export function SectionHeader({ badge, title, description, className }: SectionHeaderProps) {
  return (
    <div className={cn("mx-auto mb-12 max-w-2xl text-center", className)}>
      <span className="mb-4 inline-flex rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-medium text-primary text-xs tracking-wide">
        {badge}
      </span>
      <h2 className="text-balance font-semibold text-2xl tracking-tight sm:text-3xl lg:text-4xl">{title}</h2>
      <p className="mt-4 text-balance text-base text-muted-foreground sm:text-lg">{description}</p>
    </div>
  );
}
