import { Link } from "react-router-dom";
import ProjectCard from "@/components/project/project-card";
import ProjectSkeleton from "@/components/skeleton/project-skeleton";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGetApiProjectsQuery } from "@/store/services/apis";

const Projects = () => {
  const { data: projects, isLoading } = useGetApiProjectsQuery();

  return (
    <div className="flex h-full w-full flex-col items-start justify-start gap-5 overflow-y-auto">
      {isLoading ? (
        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <ProjectSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
          <div className="sticky top-0 z-40 col-span-1 flex w-full items-center justify-end border-b bg-background pb-5 md:col-span-2">
            <Link
              to="/projects/new"
              className={cn(
                buttonVariants({
                  variant: "default",
                }),
              )}
            >
              Create Project
            </Link>
          </div>
          {projects?.data.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
