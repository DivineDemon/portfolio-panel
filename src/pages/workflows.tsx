import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import WorkflowSkeleton from "@/components/skeleton/workflow-skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import WorkflowCard from "@/components/workflow/workflow-card";
import { useGetApiN8NWorkflowsQuery } from "@/store/services/apis";

function getMutationErrorMessage(error: unknown): string {
  if (typeof error === "object" && error !== null && "data" in error) {
    const data = (error as { data?: { message?: string } }).data;
    if (data?.message) return data.message;
  }
  return "Failed to load workflows";
}

export default function WorkflowsPage() {
  const { data: workflows, isLoading, isError, error } = useGetApiN8NWorkflowsQuery();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-semibold text-2xl tracking-tight">Workflows</h1>
          <p className="text-muted-foreground text-sm">Manage n8n workflow showcases and case studies.</p>
        </div>
        <Button asChild>
          <Link to="/dashboard/workflows/create">
            <Plus className="size-4" />
            New workflow
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <WorkflowSkeleton key={i} />
          ))}
        </div>
      ) : isError ? (
        <Card>
          <CardHeader>
            <CardTitle>Unable to load workflows</CardTitle>
            <CardDescription>{getMutationErrorMessage(error)}</CardDescription>
          </CardHeader>
        </Card>
      ) : workflows?.data.length === 0 ? (
        <Card className="max-w-lg">
          <CardHeader>
            <CardTitle>No workflows yet</CardTitle>
            <CardDescription>Create your first workflow to showcase n8n automations on your portfolio.</CardDescription>
          </CardHeader>
          <div className="px-6 pb-6">
            <Button asChild>
              <Link to="/dashboard/workflows/create">
                <Plus className="size-4" />
                Create your first workflow
              </Link>
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
          {workflows?.data.map((workflow) => (
            <WorkflowCard key={workflow.id} workflow={workflow} />
          ))}
        </div>
      )}
    </div>
  );
}
