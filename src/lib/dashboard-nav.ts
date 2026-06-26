import { FolderKanban, GitBranch, LayoutDashboard, Link2, type LucideIcon, MessageSquareQuote } from "lucide-react";

export interface DashboardNavItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

export const dashboardNavItems: DashboardNavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Projects",
    href: "/dashboard/projects",
    icon: FolderKanban,
  },
  {
    title: "Workflows",
    href: "/dashboard/workflows",
    icon: GitBranch,
  },
  {
    title: "Clients",
    href: "/dashboard/clients",
    icon: MessageSquareQuote,
  },
  {
    title: "Quick Link",
    href: "/dashboard/quick-link",
    icon: Link2,
  },
];
