import { BarChart3, FolderKanban, MessageSquareQuote } from "lucide-react";
import { Link } from "react-router-dom";

import DashboardSkeleton from "@/components/skeleton/dashboard-skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetApiClientsQuery, useGetApiProjectsQuery } from "@/store/services/apis";

export default function DashboardPage() {
  const { data: projects, isLoading: projectsLoading } = useGetApiProjectsQuery();
  const { data: clients, isLoading: clientsLoading } = useGetApiClientsQuery();

  if (projectsLoading || clientsLoading) {
    return <DashboardSkeleton />;
  }

  const projectCount = projects?.data.length ?? 0;
  const clientCount = clients?.data.length ?? 0;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-semibold text-2xl tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-sm">Overview of your portfolio content.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <FolderKanban className="size-6" />
            </div>
            <div className="min-w-0 flex-1">
              <CardDescription>Projects</CardDescription>
              <CardTitle className="text-3xl tabular-nums">{projectCount}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Link to="/dashboard/projects" className="text-primary text-sm hover:underline">
              View all projects
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <MessageSquareQuote className="size-6" />
            </div>
            <div className="min-w-0 flex-1">
              <CardDescription>Clients</CardDescription>
              <CardTitle className="text-3xl tabular-nums">{clientCount}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Link to="/dashboard/clients" className="text-primary text-sm hover:underline">
              View all clients
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="size-5" />
            Analytics
          </CardTitle>
          <CardDescription>Traffic and engagement insights for your portfolio.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex min-h-32 items-center justify-center rounded-lg border border-dashed bg-muted/30 px-6 py-10 text-center">
            <p className="text-muted-foreground text-sm">Analytics coming soon.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
