import type { Dispatch, SetStateAction } from "react";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet";
import TestimonialForm from "./testimonial-form";

interface TestimonialSheetProps {
  open: boolean;
  testimonial?: {
    id: number;
    image: string | null;
    company: string;
    content: string;
    designation: string;
    client_name: string;
  };
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const TestimonialSheet = ({ open, testimonial, setOpen }: TestimonialSheetProps) => {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="flex flex-col items-start justify-start gap-0">
        <SheetHeader className="border-b">
          <SheetTitle>{testimonial ? "Edit" : "Add"} Testimonial</SheetTitle>
          <SheetDescription>
            {testimonial ? "Make changes to your testimonial here" : "Add a new testimonial here"}. Click save when
            you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="h-full w-full overflow-y-auto p-4">
          <TestimonialForm testimonial={testimonial} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default TestimonialSheet;
