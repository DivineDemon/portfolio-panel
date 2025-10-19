import type { Dispatch, SetStateAction } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet";
import CaseStudyForm from "./case-study-form";

interface CaseStudySheetProps {
  open: boolean;
  caseStudy?: {
    id: number;
    project_id: number;
    title: string;
    description: string;
    challenge: string;
    results: string;
    onboarding_improved: string;
    retention_increase: string;
    time_spent_increase: string;
    research: string;
    architecture: string;
    wireframing: string;
    testing: string;
    design: string;
    images?: string;
    tech_stack_urls?: string;
    ceo_statement: string;
    conclusion: string;
  };
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const CaseStudySheet = ({ open, caseStudy, setOpen }: CaseStudySheetProps) => {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="flex flex-col items-start justify-start gap-0">
        <SheetHeader className="border-b">
          <SheetTitle>{caseStudy ? "Edit" : "Add"} Case Study</SheetTitle>
          <SheetDescription>
            {caseStudy ? "Make changes to your case study here" : "Add a new case study here"}. Click save when you're
            done.
          </SheetDescription>
        </SheetHeader>
        <div className="h-full w-full p-4">
          <CaseStudyForm caseStudy={caseStudy} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CaseStudySheet;
