import { Outlet } from "react-router-dom";

import { DashboardNavbar } from "@/components/layout/dashboard-navbar";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export function DashboardShell() {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <DashboardNavbar />
        <div className="flex flex-1 flex-col overflow-auto">
          <div className="mx-auto w-full max-w-6xl flex-1 p-4 sm:p-6">
            <Outlet />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
