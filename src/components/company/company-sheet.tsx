import type { Dispatch, SetStateAction } from "react";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet";
import CompanyForm from "./company-form";

interface CompanySheetProps {
  open: boolean;
  company?: {
    id: number;
    hq: string;
    name: string;
    size: string;
    founded: number;
    revenue: string;
    industry: string;
    ceo_name: string;
    ceo_title: string;
  };
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const CompanySheet = ({ open, company, setOpen }: CompanySheetProps) => {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="flex flex-col items-start justify-start gap-0">
        <SheetHeader className="border-b">
          <SheetTitle>{company ? "Edit" : "Add"} Company</SheetTitle>
          <SheetDescription>
            {company ? "Make changes to your company here" : "Add a new company here"}. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="h-full w-full p-4">
          <CompanyForm company={company} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CompanySheet;
