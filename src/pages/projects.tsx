import ProjectCard from "@/components/project/project-card";
import { useGetApiProjectsQuery } from "@/store/services/apis";

const Projects = () => {
  const { data: projects } = useGetApiProjectsQuery();

  return (
    <div className="flex h-full w-full flex-col items-start justify-start gap-5 overflow-y-auto">
      <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
        {projects?.data.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
