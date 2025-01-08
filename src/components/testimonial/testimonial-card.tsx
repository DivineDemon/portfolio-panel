import { useState } from "react";

import { Edit } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import TestimonialSheet from "./testimonial-sheet";

interface TestimonialCardProps {
  className?: string;
}

const TestimonialCard = ({ className }: TestimonialCardProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <TestimonialSheet open={open} setOpen={setOpen} />
      <div
        className={cn(
          "flex w-full flex-col items-center justify-center gap-2.5 rounded-lg border p-2.5 backdrop-blur-sm transition-all duration-200 hover:bg-white/5 hover:shadow-md",
          className
        )}
      >
        <div className="flex w-full items-center justify-center gap-3.5">
          <img
            src="https://ui.shadcn.com/avatars/04.png"
            alt="avatar"
            className="aspect-square size-10 rounded-full"
          />
          <div className="flex flex-1 flex-col items-center justify-center">
            <span className="w-full text-left text-lg font-semibold">
              Qasim Irshaad
            </span>
            <span className="w-full text-left text-sm text-gray-500">
              Tech Lead @ Digimark Developers
            </span>
          </div>
        </div>
        <p className="line-clamp-4 w-full text-pretty border-t pt-2.5 text-justify text-sm">
          Mushood's ability to create seamless user experiences is unmatched.
          Our company has seen a significant increase in conversions since
          launching the new design. We couldn't be happier.
        </p>
        <div className="flex w-full items-center justify-end border-t pt-2.5">
          <Button
            onClick={() => setOpen(true)}
            type="button"
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

export default TestimonialCard;
