import { cn } from "@/lib/utils";

const LOGO_PATH = "M4 6h10c5.52 0 10 4.48 10 10s-4.48 10-10 10h-4v10H4V6zm4 4v12h6c3.31 0 6-2.69 6-6s-2.69-6-6-6H8z";

const LOGO_LAYERS = [
  { fill: "#0F766E", transform: "translate(0, 0)" },
  { fill: "#14B8A6", transform: "translate(2, 2)" },
  { fill: "#2DD4BF", transform: "translate(4, 4)" },
] as const;

type AppLogoProps = {
  className?: string;
  iconClassName?: string;
  showWordmark?: boolean;
  wordmarkClassName?: string;
};

export function AppLogoIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
      className={cn("size-8 shrink-0", className)}
    >
      {LOGO_LAYERS.map((layer) => (
        <path key={layer.fill} fill={layer.fill} transform={layer.transform} d={LOGO_PATH} />
      ))}
    </svg>
  );
}

export function AppLogo({ className, iconClassName, showWordmark = false, wordmarkClassName }: AppLogoProps) {
  return (
    <div className={cn("flex min-w-0 items-center gap-2.5", className)}>
      <AppLogoIcon className={iconClassName} />
      {showWordmark ? (
        <div className={cn("grid min-w-0 flex-1 text-left text-sm leading-tight", wordmarkClassName)}>
          <span className="truncate font-semibold">Portfolio Panel</span>
          <span className="truncate text-muted-foreground text-xs">Content management</span>
        </div>
      ) : null}
    </div>
  );
}
