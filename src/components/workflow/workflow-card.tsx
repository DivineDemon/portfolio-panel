import { X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WarningModal } from "@/components/warning-dialog";
import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/store/hooks";
import {
  appApis,
  type GetApiN8NWorkflowsApiResponse,
  useDeleteApiN8NWorkflowsByIdMutation,
} from "@/store/services/apis";

interface WorkflowCardProps {
  workflow: GetApiN8NWorkflowsApiResponse["data"][number];
}

function getMutationErrorMessage(error: unknown): string {
  if (typeof error === "object" && error !== null && "data" in error) {
    const data = (error as { data?: { message?: string } }).data;
    if (data?.message) return data.message;
  }
  return "Something went wrong";
}

export default function WorkflowCard({ workflow }: WorkflowCardProps) {
  const dispatch = useAppDispatch();
  const [warn, setWarn] = useState(false);
  const [deleteWorkflow, { isLoading }] = useDeleteApiN8NWorkflowsByIdMutation();

  const prefetchWorkflow = () => {
    void dispatch(appApis.util.prefetch("getApiN8NWorkflowsById", { id: `${workflow.id}` }, { ifOlderThan: 30 }));
  };

  const handleDelete = async () => {
    const response = await deleteWorkflow({ id: `${workflow.id}` });

    if ("error" in response && response.error) {
      toast.error(getMutationErrorMessage(response.error));
    } else if ("data" in response && response.data) {
      toast.success(response.data.message);
      setWarn(false);
    }
  };

  return (
    <>
      <WarningModal
        open={warn}
        loading={isLoading}
        onOpenChange={setWarn}
        onConfirm={handleDelete}
        title="Delete Workflow"
        subtitle="Are you sure you want to delete this workflow? This action cannot be undone."
        confirmText="Delete"
      />
      <article
        className={cn(
          "group col-span-1 flex h-full shrink-0 flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm",
          "transition-all duration-200 hover:border-border/80 hover:shadow-md",
        )}
      >
        <div className="relative">
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-3 right-3 z-10 h-7 w-7 rounded-full border border-border/60 bg-background/80"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setWarn(true);
            }}
          >
            <X className="size-4" />
          </Button>
          <Link
            to={`/dashboard/workflows/${workflow.id}`}
            onMouseEnter={prefetchWorkflow}
            onFocus={prefetchWorkflow}
            className={cn("flex h-full flex-col overflow-hidden", "focus-visible:outline-none")}
          >
            <div className="relative aspect-16/10 w-full overflow-hidden bg-muted">
              {workflow.coverImage ? (
                <img
                  alt={workflow.title}
                  src={workflow.coverImage}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-muted-foreground text-sm">
                  No cover image
                </div>
              )}
              <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                {workflow.featured && <Badge variant="secondary">Featured</Badge>}
                {workflow.published ? (
                  <Badge variant="default">Published</Badge>
                ) : (
                  <Badge variant="outline">Draft</Badge>
                )}
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-2 p-4">
              <h3 className="font-semibold text-foreground text-lg transition-colors group-hover:text-foreground/90">
                {workflow.title}
              </h3>
              <p className="line-clamp-2 text-muted-foreground text-sm leading-relaxed">
                {workflow.cardOutcome || workflow.headlineResult}
              </p>
              {workflow.integrations && workflow.integrations.length > 0 && (
                <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
                  {workflow.integrations.slice(0, 5).map((integration) => (
                    <span
                      key={integration}
                      className="rounded border border-border/60 bg-muted/50 px-2 py-0.5 text-muted-foreground text-xs"
                    >
                      {integration}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        </div>
      </article>
    </>
  );
}
