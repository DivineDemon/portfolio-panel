import { Loader2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import ProjectForm from "@/components/project/project-form";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGetApiProjectsByIdQuery } from "@/store/services/apis";

const ProjectDetails = () => {
  const { id } = useParams();
  const { data: projectData, isLoading } = useGetApiProjectsByIdQuery(
    { id: id as string },
    {
      skip: !id,
    },
  );
  const project = projectData?.data;

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-116px)] w-full items-center justify-center">
        <Loader2 className="size-10 animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex h-[calc(100vh-116px)] w-full flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Project not found.</p>
        <Link to="/projects" className={cn(buttonVariants({ variant: "outline" }))}>
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="relative z-10 flex h-[calc(100vh-116px)] w-full flex-col items-start justify-start gap-6 overflow-y-auto px-5 pb-5 xl:px-0">
      <div className="flex w-full flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full flex-col items-start justify-start gap-1">
          <h1 className="w-full text-left font-bold text-2xl">Edit Project</h1>
          <span className="w-full text-left text-muted-foreground text-sm md:text-base">{project.title}</span>
        </div>
        <Link to="/projects" className={cn(buttonVariants({ variant: "outline" }))}>
          Back to Projects
        </Link>
      </div>
      <ProjectForm project={project} />
    </div>
  );
};

export default ProjectDetails;
