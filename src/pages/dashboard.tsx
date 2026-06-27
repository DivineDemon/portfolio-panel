import { BarChart3, FolderKanban, GitBranch, MessageSquareQuote } from "lucide-react";
import { Link } from "react-router-dom";

import DashboardSkeleton from "@/components/skeleton/dashboard-skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PRIMARY_KEY_EVENTS } from "@/lib/analytics-events";
import { useGetApiClientsQuery, useGetApiN8NWorkflowsQuery, useGetApiProjectsQuery } from "@/store/services/apis";

export default function DashboardPage() {
  const { data: projects, isLoading: projectsLoading } = useGetApiProjectsQuery();
  const { data: workflows, isLoading: workflowsLoading } = useGetApiN8NWorkflowsQuery();
  const { data: clients, isLoading: clientsLoading } = useGetApiClientsQuery();

  if (projectsLoading || workflowsLoading || clientsLoading) {
    return <DashboardSkeleton />;
  }

  const projectCount = projects?.data.length ?? 0;
  const workflowCount = workflows?.data.length ?? 0;
  const clientCount = clients?.data.length ?? 0;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-semibold text-2xl tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-sm">Overview of your portfolio content.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
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
              <GitBranch className="size-6" />
            </div>
            <div className="min-w-0 flex-1">
              <CardDescription>Workflows</CardDescription>
              <CardTitle className="text-3xl tabular-nums">{workflowCount}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Link to="/dashboard/workflows" className="text-primary text-sm hover:underline">
              View all workflows
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
          <CardDescription>
            {PRIMARY_KEY_EVENTS.length} primary GA4 key events tracked on the public site. View the full catalog and
            PostHog setup.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link to="/dashboard/analytics">Open analytics</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
