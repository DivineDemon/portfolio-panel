import { Outlet } from "react-router-dom";

import { DashboardNavbar } from "@/components/layout/dashboard-navbar";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export function DashboardShell() {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset className="min-h-0">
        <DashboardNavbar />
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
          <div className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col p-5">
            <Outlet />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
