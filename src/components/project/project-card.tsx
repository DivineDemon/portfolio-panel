import { Loader2, Trash } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useDeleteApiProjectsByIdMutation } from "@/store/services/apis";
import { Button, buttonVariants } from "../ui/button";
import WarningModal from "../warning-modal";

interface ProjectCardProps {
  className?: string;
  project: {
    id: number;
    image: string | null;
    features: string;
    link: string;
    start_year: number;
    project_name: string;
    company_id: number;
    company_name: string | null;
  };
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
        <div className="flex w-full items-center justify-center border-b pb-2.5">
          <span className="w-full text-left font-semibold text-lg">{project.project_name}</span>
          <span className="w-full text-right text-gray-500 text-sm">
            &#8226;&nbsp;{project.start_year}&nbsp;&#8226;
          </span>
        </div>
        <ul className="flex w-full list-inside list-disc flex-col items-center justify-center gap-1.5 border-b pb-2.5">
          {JSON.parse(project.features).map((item: string, idx: number) => (
            <li key={idx} className="w-full overflow-hidden truncate text-left text-gray-500 text-sm">
              {item}
            </li>
          ))}
        </ul>
        <div className="flex w-full items-center justify-center border-b pb-2.5">
          <span className="w-full overflow-hidden truncate text-left text-sm">{project.company_name}</span>
          <span className="w-full overflow-hidden truncate text-right text-gray-500 text-sm">{project.link}</span>
        </div>
        <div className="flex w-full items-center justify-between">
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
