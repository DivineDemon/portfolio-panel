import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { GetApiTestimonialsApiResponse, useDeleteApiTestimonialsByIdMutation } from "@/store/services/apis";
import { Button } from "../ui/button";
import { WarningModal } from "../warning-dialog";
import TestimonialSheet from "./testimonial-sheet";

interface TestimonialCardProps {
  testimonial: GetApiTestimonialsApiResponse["data"][number];
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  const [warn, setWarn] = useState<boolean>(false);
  const [deleteTestimonial, { isLoading }] = useDeleteApiTestimonialsByIdMutation();

  const handleDelete = async () => {
    const response = await deleteTestimonial({ id: `${testimonial.id}` });

    if (response.error) {
      // @ts-expect-error - response.error.data.message is not typed
      toast.error(response.error.data.message || "Something went wrong");
    } else {
      toast.success(response.data.message);
    }
  };

  return (
    <>
      <WarningModal
        open={warn}
        loading={isLoading}
        onOpenChange={setWarn}
        onConfirm={handleDelete}
        title="Delete Testimonial"
        subtitle="Are you sure you want to delete this testimonial?"
      />
      <article
        className={cn(
          "flex w-full shrink-0 flex-col rounded-xl border border-border bg-card p-5 shadow-sm",
          "transition-shadow duration-200 hover:shadow-md",
        )}
      >
        <div className="mb-4 flex items-center gap-3 border-border/80 border-b pb-4">
          {testimonial.image ? (
            <img
              alt="dp"
              src={testimonial.image}
              className="size-10 shrink-0 rounded-full border border-border object-cover"
            />
          ) : (
            <div
              className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-muted font-medium font-mono text-muted-foreground text-sm"
              aria-hidden
            >
              {testimonial.client_name.charAt(0)}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium font-mono text-foreground text-sm">{testimonial.client_name}</p>
            <p className="truncate font-mono text-muted-foreground text-xs">
              {testimonial.designation}
              {testimonial.company && ` · ${testimonial.company}`}
            </p>
          </div>
        </div>
        <p className="line-clamp-3 font-mono text-foreground text-sm leading-relaxed" title={testimonial.content}>
          {testimonial.content}
        </p>
        <div className="mt-5 grid w-full grid-cols-2 items-center justify-center gap-2.5 border-t pt-5">
          <TestimonialSheet id={testimonial.id} />
          <Button type="button" variant="destructive" className="w-full" onClick={() => setWarn(true)}>
            Delete
          </Button>
        </div>
      </article>
    </>
  );
};

export default TestimonialCard;
