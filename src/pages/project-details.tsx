import { Edit, Loader2 } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ProjectSheet from "@/components/project/project-sheet";
import { Button } from "@/components/ui/button";
import { useGetApiProjectsByIdQuery } from "@/store/services/apis";

const ProjectDetails = () => {
  const { id } = useParams();
  const [editProject, setEditProject] = useState<boolean>(false);
  const { data: projectData, isLoading } = useGetApiProjectsByIdQuery({ id: id as string });
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
      <div className="flex h-[calc(100vh-116px)] w-full items-center justify-center">
        <p className="text-muted-foreground">Project not found.</p>
      </div>
    );
  }

  return (
    <>
      <ProjectSheet open={editProject} project={project} setOpen={setEditProject} />
      <div className="relative z-10 flex h-[calc(100vh-116px)] w-full flex-col items-start justify-start gap-5 overflow-y-auto p-0 px-5 pb-5 md:gap-10 xl:px-0">
        <div className="flex w-full items-center justify-end gap-2.5">
          <Button type="button" variant="default" onClick={() => setEditProject(true)}>
            <Edit /> Project
          </Button>
        </div>
        <div className="mx-auto flex w-full flex-col items-center justify-center gap-2.5 md:gap-5">
          <h1 className="w-full text-left font-serif text-3xl md:text-5xl">{project.title}</h1>
          {project.tagline && (
            <p className="w-full text-left text-muted-foreground md:text-lg lg:text-xl">{project.tagline}</p>
          )}
          {(project.industry || project.projectType || project.role) && (
            <div className="flex w-full flex-wrap gap-2">
              {project.industry && <span className="rounded-md bg-muted px-2 py-1 text-sm">{project.industry}</span>}
              {project.projectType && (
                <span className="rounded-md bg-muted px-2 py-1 text-sm">{project.projectType}</span>
              )}
              {project.role && <span className="rounded-md bg-muted px-2 py-1 text-sm">{project.role}</span>}
            </div>
          )}
        </div>
        {project.coverImage && (
          <img
            src={project.coverImage}
            alt={project.title}
            className="max-h-[400px] w-full rounded-3xl object-cover shadow"
          />
        )}
        <div className="mx-auto flex w-full flex-col gap-6 md:gap-10">
          {project.problem && (
            <section>
              <h2 className="mb-2 w-full text-left font-serif text-xl md:text-2xl">Problem</h2>
              <p className="w-full text-left md:text-lg">{project.problem}</p>
            </section>
          )}
          {project.context && (
            <section>
              <h2 className="mb-2 w-full text-left font-serif text-xl md:text-2xl">Context</h2>
              <p className="w-full text-left md:text-lg">{project.context}</p>
            </section>
          )}
          {project.strategy && (
            <section>
              <h2 className="mb-2 w-full text-left font-serif text-xl md:text-2xl">Strategy</h2>
              <p className="w-full text-left md:text-lg">{project.strategy}</p>
            </section>
          )}
          {project.architecture && (
            <section>
              <h2 className="mb-2 w-full text-left font-serif text-xl md:text-2xl">Architecture</h2>
              <p className="w-full text-left md:text-lg">{project.architecture}</p>
            </section>
          )}
          {project.execution && (
            <section>
              <h2 className="mb-2 w-full text-left font-serif text-xl md:text-2xl">Execution</h2>
              <p className="w-full text-left md:text-lg">{project.execution}</p>
            </section>
          )}
          {project.challenges && (
            <section>
              <h2 className="mb-2 w-full text-left font-serif text-xl md:text-2xl">Challenges</h2>
              <p className="w-full text-left md:text-lg">{project.challenges}</p>
            </section>
          )}
          {project.solution && (
            <section>
              <h2 className="mb-2 w-full text-left font-serif text-xl md:text-2xl">Solution</h2>
              <p className="w-full text-left md:text-lg">{project.solution}</p>
            </section>
          )}
          {project.measurableImpact && (
            <section>
              <h2 className="mb-2 w-full text-left font-serif text-xl md:text-2xl">Measurable Impact</h2>
              <p className="w-full text-left md:text-lg">{project.measurableImpact}</p>
            </section>
          )}
          {(project.techStack?.length ?? 0) > 0 && (
            <section>
              <h2 className="mb-2 w-full text-left font-serif text-xl md:text-2xl">Tech Stack</h2>
              <div className="flex w-full flex-wrap gap-2">
                {project.techStack.map((tech, idx) => (
                  <span key={idx} className="rounded-md border px-2 py-1 text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          )}
          {(project.infrastructure?.length ?? 0) > 0 && (
            <section>
              <h2 className="mb-2 w-full text-left font-serif text-xl md:text-2xl">Infrastructure</h2>
              <div className="flex w-full flex-wrap gap-2">
                {project.infrastructure.map((item, idx) => (
                  <span key={idx} className="rounded-md border px-2 py-1 text-sm">
                    {item}
                  </span>
                ))}
              </div>
            </section>
          )}
          {(project.galleryImages?.length ?? 0) > 0 && (
            <section>
              <h2 className="mb-2 w-full text-left font-serif text-xl md:text-2xl">Gallery</h2>
              <div className="grid w-full grid-cols-2 gap-2.5 md:grid-cols-3 md:gap-5">
                {project.galleryImages.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`Gallery ${idx + 1}`}
                    className="aspect-square w-full rounded-xl object-cover shadow"
                  />
                ))}
              </div>
            </section>
          )}
          {(project.demoUrl || project.repositoryUrl) && (
            <section className="flex flex-wrap gap-3">
              {project.demoUrl && (
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                  View demo
                </a>
              )}
              {project.repositoryUrl && (
                <a
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  Repository
                </a>
              )}
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
