import { useTheme } from "next-themes";

import { Grainient, type GrainientProps } from "@/components/react-bits/grainient";
import { cn } from "@/lib/utils";

const LANDING_PRESET: { light: GrainientProps; dark: GrainientProps } = {
  light: {
    color1: "#ecfdf5",
    color2: "#2dd4bf",
    color3: "#0f766e",
    timeSpeed: 0.14,
    warpAmplitude: 56,
    warpSpeed: 1.5,
    grainAmount: 0.055,
    contrast: 1.28,
    saturation: 1.12,
    zoom: 0.82,
    centerY: 0,
    blendSoftness: 0.06,
  },
  dark: {
    color1: "#1e3a38",
    color2: "#115e59",
    color3: "#042f2e",
    timeSpeed: 0.1,
    warpAmplitude: 64,
    warpSpeed: 1.0,
    grainAmount: 0.045,
    contrast: 1.12,
    saturation: 0.78,
    zoom: 0.92,
    centerY: 0,
    blendSoftness: 0.1,
  },
};

/** One continuous Grainient canvas for the full landing page (main + footer). */
export function LandingGrainientBackdrop({ className }: { className?: string }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const preset = LANDING_PRESET[isDark ? "dark" : "light"];

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className={cn("size-full", isDark && "opacity-70")}>
        <Grainient {...preset} className="size-full" />
      </div>

      {/* Light: soft edge vignette. Dark: heavier scrim so teal stays subtle. */}
      <div
        className={cn(
          "absolute inset-0",
          isDark
            ? "bg-[radial-gradient(ellipse_130%_90%_at_50%_0%,transparent_25%,var(--background)/60_100%)]"
            : "bg-[radial-gradient(ellipse_120%_80%_at_50%_0%,transparent_40%,var(--background)/35_100%)]",
        )}
      />
      <div
        className={cn(
          "absolute inset-0",
          isDark
            ? "bg-linear-to-b from-background/50 via-background/65 to-background/75"
            : "bg-linear-to-b from-background/15 via-transparent to-background/30",
        )}
      />
    </div>
  );
}
