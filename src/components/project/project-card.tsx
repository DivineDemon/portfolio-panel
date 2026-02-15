import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { GetApiProjectsApiResponse } from "@/store/services/apis";

interface ProjectCardProps {
  project: GetApiProjectsApiResponse["data"][number];
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Link
      to={`/projects/${project.id}`}
      className={cn(
        "group col-span-1 flex h-full shrink-0 flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm",
        "transition-all duration-200 hover:border-border/80 hover:shadow-md focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
      )}
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
          <div className="pt- flex flex-wrap gap-1.5">
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
  );
};

export default ProjectCard;
