import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { GetApiProjectsApiResponse, useDeleteApiProjectsByIdMutation } from "@/store/services/apis";
import { Button } from "../ui/button";
import { WarningModal } from "../warning-dialog";

interface ProjectCardProps {
  project: GetApiProjectsApiResponse["data"][number];
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [warn, setWarn] = useState<boolean>(false);
  const [deleteProject, { isLoading }] = useDeleteApiProjectsByIdMutation();

  const handleDelete = async () => {
    const response = await deleteProject({ id: `${project.id}` });

    if ("error" in response && response.error) {
      // @ts-expect-error - response.error.data.message is not typed
      toast.error(response.error.data.message || "Something went wrong");
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
        title="Delete Project"
        subtitle="Are you sure you want to delete this project?"
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
            className="absolute top-3 right-3 z-10 h-7 w-7 rounded-full border border-border/60 bg-background/80 font-mono text-xs"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setWarn(true);
            }}
          >
            ✕
          </Button>
          <Link
            to={`/projects/${project.id}`}
            className={cn("flex h-full flex-col overflow-hidden", "focus-visible:outline-none")}
          >
            <div className="relative aspect-16/10 w-full overflow-hidden bg-muted">
              <img
                alt={project.title}
                src={project.coverImage}
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
            <div className="flex flex-1 flex-col gap-2 p-4">
              <h3 className="font-mono font-semibold text-foreground text-lg transition-colors group-hover:text-foreground/90">
                {project.title}
              </h3>
              <p className="line-clamp-2 font-mono text-muted-foreground text-sm leading-relaxed">{project.tagline}</p>
              {project.industry && (
                <span className="mt-auto w-fit rounded border border-border/60 bg-muted/50 px-2 py-0.5 font-mono text-muted-foreground text-xs">
                  Industry: {project.industry}
                </span>
              )}
              {project.techStack && project.techStack.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.techStack.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="rounded border border-border/60 bg-muted/50 px-2 py-0.5 font-mono text-muted-foreground text-xs"
                    >
                      {tech}
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
};

export default ProjectCard;
