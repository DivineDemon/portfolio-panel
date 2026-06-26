import { useMemo } from "react";
import { useLocation } from "react-router-dom";

import { useGetApiProjectsByIdQuery } from "@/store/services/apis";

export interface BreadcrumbSegment {
  label: string;
  href?: string;
}

const SEGMENT_LABELS: Record<string, string> = {
  projects: "Projects",
  clients: "Clients",
  new: "New project",
};

function isLikelyId(segment: string): boolean {
  return segment !== "new" && !SEGMENT_LABELS[segment];
}

function getProjectIdFromPath(pathname: string): string | null {
  const match = pathname.match(/^\/dashboard\/projects\/([^/]+)$/);
  if (!match?.[1] || match[1] === "new") return null;
  return match[1];
}

export function useDashboardBreadcrumbs(): BreadcrumbSegment[] {
  const { pathname } = useLocation();
  const projectId = getProjectIdFromPath(pathname);
  const { data: project } = useGetApiProjectsByIdQuery({ id: projectId ?? "" }, { skip: !projectId });

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

      if (segment === "projects" || segment === "clients") {
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
          label: parent === "projects" ? (project?.data.title ?? "Edit project") : "Details",
        });
      }
    }

    return crumbs;
  }, [pathname, project?.data.title]);
}
