import { ImageIcon, Layers3, ShieldCheck, Sparkles } from "lucide-react";

import { SectionHeader } from "@/components/landing/section-background";
import { cn } from "@/lib/utils";

const highlights = [
  {
    icon: Layers3,
    title: "Multi-step project wizard",
    description: "34 fields organized across basics, story, tech & media, and SEO — never overwhelming.",
    placement: "md:col-span-2 md:row-span-2 md:col-start-1 md:row-start-1",
    featured: true,
  },
  {
    icon: ImageIcon,
    title: "ImgBB uploads",
    description: "Drop cover images and gallery shots directly from the panel.",
    placement: "md:col-start-3 md:row-start-1",
    featured: false,
  },
  {
    icon: ShieldCheck,
    title: "Private admin access",
    description: "JWT session cookies keep the dashboard locked down.",
    placement: "md:col-start-3 md:row-start-2",
    featured: false,
  },
  {
    icon: Sparkles,
    title: "Future Teal design",
    description: "Light and dark modes with a cohesive, modern aesthetic throughout.",
    placement: "md:col-span-3 md:row-start-3",
    featured: false,
  },
] as const;

export function Highlights() {
  return (
    <section id="capabilities" className="relative px-4 py-24 sm:px-6 sm:py-28">
      <div className="relative mx-auto max-w-6xl">
        <SectionHeader
          badge="Capabilities"
          title="Built for rich portfolio content"
          description="Every detail — from case study narratives to client quotes — has a purpose-built place in the panel."
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-[auto_auto_auto]">
          {highlights.map(({ icon: Icon, title, description, placement, featured }) => (
            <div
              key={title}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/75 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/25 hover:shadow-lg",
                featured && "min-h-64 bg-linear-to-br from-primary/10 via-card/80 to-card/80 md:min-h-0",
                placement,
              )}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-8 -bottom-8 size-32 rounded-full bg-primary/5 blur-2xl transition-opacity group-hover:bg-primary/10"
              />
              <span
                className={cn(
                  "mb-4 flex size-10 shrink-0 items-center justify-center rounded-lg border border-primary/15 bg-primary/10 text-primary",
                  featured && "size-12 rounded-xl",
                )}
              >
                <Icon className={featured ? "size-6" : "size-5"} />
              </span>
              <h3 className={cn("font-semibold", featured ? "text-xl" : "text-base")}>{title}</h3>
              <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
