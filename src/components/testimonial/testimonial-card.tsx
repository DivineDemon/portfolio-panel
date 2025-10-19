import { Edit, Loader2, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { useDeleteApiTestimonialsByIdMutation } from "@/store/services/apis";
import { Button } from "../ui/button";
import WarningModal from "../warning-modal";
import TestimonialSheet from "./testimonial-sheet";

interface TestimonialCardProps {
  className?: string;
  testimonial: {
    id: number;
    image: string | null;
    company: string;
    content: string;
    designation: string;
    client_name: string;
  };
}

const TestimonialCard = ({ className, testimonial }: TestimonialCardProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [warn, setWarn] = useState<boolean>(false);
  const [deleteTestimonial, { isLoading }] = useDeleteApiTestimonialsByIdMutation();

  const handleDelete = async () => {
    const response = await deleteTestimonial({ id: `${testimonial.id}` });

    if (response.error) {
      toast.error("Failed to Delete Testimonial!");
    } else {
      toast.success("Testimonial Deleted Successfully!");
      setWarn(false);
    }
  };

  return (
    <>
      <WarningModal
        open={warn}
        setOpen={setWarn}
        title="Delete Testimonial"
        text="Are you sure you want to delete this testimonial?"
        cta={handleDelete}
        isLoading={isLoading}
      />
      <TestimonialSheet open={open} setOpen={setOpen} testimonial={testimonial} />
      <div
        className={cn(
          "flex w-full flex-col items-center justify-center gap-2.5 rounded-lg border p-2.5 backdrop-blur-sm transition-all duration-200 hover:bg-white/5 hover:shadow-md",
          className,
        )}
      >
        <div className="flex w-full items-center justify-center gap-3.5">
          <img src={testimonial.image ?? ""} alt="avatar" className="aspect-square size-10 rounded-full" />
          <div className="flex flex-1 flex-col items-center justify-center">
            <span className="w-full text-left font-semibold text-lg">{testimonial.client_name}</span>
            <span className="w-full text-left text-gray-500 text-sm">
              {testimonial.designation}&nbsp;@&nbsp;{testimonial.company}
            </span>
          </div>
        </div>
        <p className="line-clamp-4 w-full text-pretty border-t pt-2.5 text-justify text-sm">{testimonial.content}</p>
        <div className="mt-auto flex w-full items-center justify-between">
          <Button onClick={() => setWarn(true)} variant="destructive" size="icon">
            {isLoading ? <Loader2 className="animate-spin" /> : <Trash className="size-[1.2rem]" />}
          </Button>
          <Button type="button" onClick={() => setOpen(true)} variant="default" size="icon">
            <Edit className="size-[1.2rem]" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default TestimonialCard;
