import { useMemo } from "react";
import { useLocation } from "react-router-dom";

export interface BreadcrumbSegment {
  label: string;
  href?: string;
}

const SEGMENT_LABELS: Record<string, string> = {
  projects: "Projects",
  testimonials: "Testimonials",
  new: "New project",
};

function isLikelyId(segment: string): boolean {
  return segment !== "new" && !SEGMENT_LABELS[segment];
}

export function useDashboardBreadcrumbs(): BreadcrumbSegment[] {
  const { pathname } = useLocation();

  return useMemo(() => {
    const segments = pathname
      .replace(/^\/dashboard\/?/, "")
      .split("/")
      .filter(Boolean);

    const crumbs: BreadcrumbSegment[] = [{ label: "Dashboard", href: "/dashboard" }];

    if (segments.length === 0) {
      return [{ label: "Dashboard" }];
    }

    let path = "/dashboard";

    for (let index = 0; index < segments.length; index++) {
      const segment = segments[index];
      path += `/${segment}`;
      const isLast = index === segments.length - 1;

      if (segment === "projects" || segment === "testimonials") {
        crumbs.push({
          label: SEGMENT_LABELS[segment],
          href: isLast ? undefined : path,
        });
        continue;
      }

      if (segment === "new") {
        crumbs.push({ label: SEGMENT_LABELS.new });
        continue;
      }

      if (isLikelyId(segment)) {
        const parent = segments[index - 1];
        crumbs.push({
          label: parent === "projects" ? "Edit project" : "Details",
        });
      }
    }

    return crumbs;
  }, [pathname]);
}
