import type { Dispatch, SetStateAction } from "react";

import { Testimonial } from "@/lib/schema";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import TestimonialForm from "./testimonial-form";

interface TestimonialSheetProps {
  open: boolean;
  testimonial?: Testimonial;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const TestimonialSheet = ({
  open,
  testimonial,
  setOpen,
}: TestimonialSheetProps) => {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="flex flex-col items-start justify-start gap-4">
        <SheetHeader>
          <SheetTitle>{testimonial ? "Edit" : "Add"} Testimonial</SheetTitle>
          <SheetDescription>
            {testimonial
              ? "Make changes to your testimonial here"
              : "Add a new testimonial here"}
            . Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <TestimonialForm testimonial={testimonial} />
      </SheetContent>
    </Sheet>
  );
};

export default TestimonialSheet;
