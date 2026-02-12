import { Loader2, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "@/components/project/project-card";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useGetApiProjectsQuery } from "@/store/services/apis";

const Projects = () => {
  const [query, setQuery] = useState<string>("");
  const { data, isLoading } = useGetApiProjectsQuery();

  const filteredProjects = useMemo(() => {
    const projects = data?.data ?? [];
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return projects;
    }

    return projects.filter((project) =>
      [project.title, project.slug, project.tagline ?? "", project.role]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [data, query]);

  return (
    <div className="flex w-full flex-col items-start justify-start gap-5 px-5 pb-5 xl:px-0">
      <div className="flex w-full flex-col items-center justify-center gap-2.5 md:flex-row md:gap-0">
        <span className="w-full text-left font-bold text-xl md:w-auto md:flex-1">Projects List</span>
        <div className="flex w-full items-center justify-center gap-2.5 md:w-auto">
          <Link to="/projects/new" className={cn(buttonVariants({ variant: "outline" }))}>
            <Plus /> <span className="hidden md:flex">Add Project</span>
          </Link>
          <Input
            type="text"
            value={query}
            className="h-[36.5px] w-full md:w-64"
            placeholder="Search projects"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div
        className={cn("grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3", {
          "h-[calc(100vh-175px)]": isLoading,
        })}
      >
        {isLoading ? (
          <div className="col-span-1 flex h-full w-full items-center justify-center md:col-span-2 xl:col-span-3">
            <Loader2 className="size-10 animate-spin" />
          </div>
        ) : filteredProjects.length > 0 ? (
          filteredProjects.map((project) => <ProjectCard key={project.id} className="col-span-1" project={project} />)
        ) : (
          <div className="col-span-1 rounded-lg border border-dashed p-8 text-center text-muted-foreground md:col-span-2 xl:col-span-3">
            No projects found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
