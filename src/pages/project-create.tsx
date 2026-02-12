import ProjectForm from "@/components/project/project-form";

const ProjectCreate = () => {
  return (
    <div className="relative z-10 flex h-[calc(100vh-116px)] w-full flex-col items-start justify-start gap-6 overflow-y-auto px-5 pb-5 xl:px-0">
      <h1 className="w-full text-left font-bold text-2xl">New Project</h1>
      <ProjectForm />
    </div>
  );
};

export default ProjectCreate;
