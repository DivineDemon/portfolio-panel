import { useState } from "react";

import { Edit, Loader2, Trash } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { useDeleteProjectMutation } from "@/store/services/project";

import { Button } from "../ui/button";
import WarningModal from "../warning-modal";
import ProjectSheet from "./project-sheet";

interface ProjectCardProps {
  className?: string;
  project: ProjectProps;
}

const ProjectCard = ({ className, project }: ProjectCardProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [warn, setWarn] = useState<boolean>(false);
  const [deleteProject, { isLoading }] = useDeleteProjectMutation();

  const handleDelete = async () => {
    const response = await deleteProject(`${project.id}`);

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
        message="delete this Project"
        cta={handleDelete}
      />
      <ProjectSheet open={open} setOpen={setOpen} project={project} />
      <div
        className={cn(
          "flex w-full flex-col items-center justify-center gap-2.5 rounded-lg border p-2.5 backdrop-blur-sm transition-all duration-200 hover:bg-white/5 hover:shadow-md",
          className
        )}
      >
        <div className="flex w-full items-center justify-center border-b pb-2.5">
          <span className="w-full text-left text-lg font-semibold">
            {project.project_name}
          </span>
          <span className="w-full text-right text-sm text-gray-500">
            &#8226;&nbsp;{project.start_year}&nbsp;&#8226;
          </span>
        </div>
        <ul className="flex w-full list-inside list-disc flex-col items-center justify-center gap-1.5 border-b pb-2.5">
          {project.features.split(",").map((item, idx) => (
            <li
              key={idx}
              className="w-full overflow-hidden truncate text-left text-sm text-gray-500"
            >
              {item}
            </li>
          ))}
        </ul>
        <div className="flex w-full items-center justify-center border-b pb-2.5">
          <span className="w-full overflow-hidden truncate text-left text-sm">
            {project.company}
          </span>
          <span className="w-full overflow-hidden truncate text-left text-sm text-gray-500">
            {project.link}
          </span>
        </div>
        <div className="flex w-full items-center justify-between">
          <Button
            onClick={() => setWarn(true)}
            variant="destructive"
            size="icon"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Trash className="size-[1.2rem]" />
            )}
          </Button>
          <Button
            type="button"
            onClick={() => setOpen(true)}
            variant="default"
            size="icon"
          >
            <Edit className="size-[1.2rem]" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
