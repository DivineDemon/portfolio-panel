import {
  BarChart3,
  FileText,
  FolderKanban,
  GitBranch,
  LayoutDashboard,
  Link2,
  type LucideIcon,
  MessageSquareQuote,
  Newspaper,
} from "lucide-react";

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
    title: "Pages",
    href: "/dashboard/pages",
    icon: FileText,
  },
  {
    title: "Blog",
    href: "/dashboard/blog",
    icon: Newspaper,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Quick Link",
    href: "/dashboard/quick-link",
    icon: Link2,
  },
];
