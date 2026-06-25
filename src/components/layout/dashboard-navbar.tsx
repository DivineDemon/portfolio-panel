import { LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "@/components/providers/auth-provider";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useDashboardBreadcrumbs } from "@/hooks/use-dashboard-breadcrumbs";

export function DashboardNavbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const breadcrumbs = useDashboardBreadcrumbs();

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  return (
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur supports-backdrop-filter:bg-background/60">
      <SidebarTrigger className="-ml-1" />

      <Breadcrumb className="min-w-0 flex-1">
        <BreadcrumbList>
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;

            return (
              <span key={`${crumb.label}-${index}`} className="contents">
                {index > 0 ? <BreadcrumbSeparator /> : null}
                <BreadcrumbItem>
                  {isLast || !crumb.href ? (
                    <BreadcrumbPage className="truncate">{crumb.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link to={crumb.href}>{crumb.label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </span>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex shrink-0 items-center gap-1">
        <AnimatedThemeToggler variant="ghost" size="icon" className="size-8" />

        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full outline-none ring-ring focus-visible:ring-2">
            <Avatar size="sm">
              <AvatarFallback className="bg-primary/10 font-medium text-primary text-xs">A</AvatarFallback>
            </Avatar>
            <span className="sr-only">Open user menu</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Admin</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={() => void handleLogout()}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
