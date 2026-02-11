import { Loader2, Trash } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { GetApiProjectsApiResponse } from "@/store/services/apis";
import { useDeleteApiProjectsByIdMutation } from "@/store/services/apis";
import { Button, buttonVariants } from "../ui/button";
import WarningModal from "../warning-modal";

type Project = GetApiProjectsApiResponse["data"][number];

interface ProjectCardProps {
  className?: string;
  project: Project;
}

const ProjectCard = ({ className, project }: ProjectCardProps) => {
  const [warn, setWarn] = useState<boolean>(false);
  const [deleteProject, { isLoading }] = useDeleteApiProjectsByIdMutation();

  const handleDelete = async () => {
    const response = await deleteProject({ id: `${project.id}` });

    if (response.error) {
      toast.error("Failed to Delete Project!");
    } else {
      toast.success("Project Deleted Successfully!");
      setWarn(false);
    }
  };

  return (
    <>
      <WarningModal
        open={warn}
        setOpen={setWarn}
        title="Delete Project"
        text="Are you sure you want to delete this project?"
        cta={handleDelete}
        isLoading={isLoading}
      />
      <div
        className={cn(
          "flex w-full flex-col items-center justify-center gap-2.5 rounded-lg border p-2.5 backdrop-blur-sm transition-all duration-200 hover:bg-white/5 hover:shadow-md",
          className,
        )}
      >
        {project.coverImage ? (
          <img
            src={project.coverImage}
            alt={project.title}
            className="h-40 w-full rounded-t-lg border-b object-cover"
          />
        ) : (
          <div className="flex h-40 w-full items-center justify-center rounded-t-lg border-b bg-muted text-muted-foreground text-sm">
            No image
          </div>
        )}
        <div className="flex w-full flex-col gap-2">
          <span className="w-full text-left font-semibold text-lg">{project.title}</span>
          {project.tagline && (
            <span className="line-clamp-2 w-full text-left text-muted-foreground text-sm">{project.tagline}</span>
          )}
          {project.role && <span className="w-full text-left text-gray-500 text-sm">{project.role}</span>}
          {(project.techStack?.length ?? 0) > 0 && (
            <div className="flex w-full flex-wrap gap-1">
              {project.techStack.slice(0, 3).map((tech, idx) => (
                <span key={idx} className="rounded bg-muted px-1.5 py-0.5 text-xs">
                  {tech}
                </span>
              ))}
              {project.techStack.length > 3 && (
                <span className="text-muted-foreground text-xs">+{project.techStack.length - 3}</span>
              )}
            </div>
          )}
        </div>
        <div className="flex w-full items-center justify-between pt-2">
          <Button onClick={() => setWarn(true)} variant="destructive" size="icon">
            {isLoading ? <Loader2 className="animate-spin" /> : <Trash className="size-[1.2rem]" />}
          </Button>
          <Link to={`/projects/${project.id}`} className={cn(buttonVariants({ variant: "default" }))}>
            View
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
