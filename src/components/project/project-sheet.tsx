import type { Dispatch, SetStateAction } from "react";
import type { GetApiProjectsByIdApiResponse } from "@/store/services/apis";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet";
import ProjectForm from "./project-form";

type Project = GetApiProjectsByIdApiResponse["data"];

interface ProjectSheetProps {
  open: boolean;
  project?: Project | null;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ProjectSheet = ({ open, project, setOpen }: ProjectSheetProps) => {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="flex flex-col items-start justify-start gap-0">
        <SheetHeader className="border-b">
          <SheetTitle>{project ? "Edit" : "Add"} Project</SheetTitle>
          <SheetDescription>
            {project ? "Make changes to your project here" : "Add a new project here"}. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="h-full w-full overflow-y-auto p-4">
          <ProjectForm project={project} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ProjectSheet;
