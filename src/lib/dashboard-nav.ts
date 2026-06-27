import {
  BarChart3,
  FileText,
  FolderKanban,
  GitBranch,
  LayoutDashboard,
  Link2,
  type LucideIcon,
  Magnet,
  Megaphone,
  MessageSquareQuote,
  Newspaper,
  Settings2,
  Users,
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
    title: "Lead Magnets",
    href: "/dashboard/lead-magnets",
    icon: Magnet,
  },
  {
    title: "Leads",
    href: "/dashboard/leads",
    icon: Users,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Outreach",
    href: "/dashboard/outreach",
    icon: Megaphone,
  },
  {
    title: "Site Settings",
    href: "/dashboard/site-settings",
    icon: Settings2,
  },
  {
    title: "Quick Link",
    href: "/dashboard/quick-link",
    icon: Link2,
  },
];
