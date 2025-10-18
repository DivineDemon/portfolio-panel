import type { Dispatch, SetStateAction } from "react";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet";
import ProjectForm from "./project-form";

interface ProjectSheetProps {
  open: boolean;
  project?: {
    id: number;
    image: string | null;
    features: string;
    link: string;
    start_year: number;
    project_name: string;
    company_id: number;
    company_name: string | null;
  };
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ProjectSheet = ({ open, project, setOpen }: ProjectSheetProps) => {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="flex flex-col items-start justify-start gap-4">
        <SheetHeader>
          <SheetTitle>{project ? "Edit" : "Add"} Project</SheetTitle>
          <SheetDescription>
            {project ? "Make changes to your project here" : "Add a new project here"}. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <ProjectForm project={project} />
      </SheetContent>
    </Sheet>
  );
};

export default ProjectSheet;
