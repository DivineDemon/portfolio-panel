import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import ProjectCard from "@/components/project/project-card";
import ProjectSkeleton from "@/components/skeleton/project-skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetApiProjectsQuery } from "@/store/services/apis";

function getMutationErrorMessage(error: unknown): string {
  if (typeof error === "object" && error !== null && "data" in error) {
    const data = (error as { data?: { message?: string } }).data;
    if (data?.message) return data.message;
  }
  return "Failed to load projects";
}

export default function ProjectsPage() {
  const { data: projects, isLoading, isError, error } = useGetApiProjectsQuery();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-semibold text-2xl tracking-tight">Projects</h1>
          <p className="text-muted-foreground text-sm">Manage portfolio case studies and project entries.</p>
        </div>
        <Button asChild>
          <Link to="/dashboard/projects/new">
            <Plus className="size-4" />
            New project
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <ProjectSkeleton key={i} />
          ))}
        </div>
      ) : isError ? (
        <Card>
          <CardHeader>
            <CardTitle>Unable to load projects</CardTitle>
            <CardDescription>{getMutationErrorMessage(error)}</CardDescription>
          </CardHeader>
        </Card>
      ) : projects?.data.length === 0 ? (
        <Card className="max-w-lg">
          <CardHeader>
            <CardTitle>No projects yet</CardTitle>
            <CardDescription>Create your first project to start building your portfolio content.</CardDescription>
          </CardHeader>
          <div className="px-6 pb-6">
            <Button asChild>
              <Link to="/dashboard/projects/new">
                <Plus className="size-4" />
                Create your first project
              </Link>
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
          {projects?.data.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
