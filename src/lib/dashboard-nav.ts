import { FolderKanban, LayoutDashboard, type LucideIcon, MessageSquareQuote } from "lucide-react";

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
    title: "Testimonials",
    href: "/dashboard/testimonials",
    icon: MessageSquareQuote,
  },
];
