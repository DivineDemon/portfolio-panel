import { useState } from "react";
import { toast } from "sonner";
import TestimonialSheet from "@/components/testimonial/testimonial-sheet";
import { Button } from "@/components/ui/button";
import { WarningModal } from "@/components/warning-dialog";
import { cn } from "@/lib/utils";
import { type GetApiTestimonialsApiResponse, useDeleteApiTestimonialsByIdMutation } from "@/store/services/apis";

interface TestimonialCardProps {
  testimonial: GetApiTestimonialsApiResponse["data"][number];
}

function getMutationErrorMessage(error: unknown): string {
  if (typeof error === "object" && error !== null && "data" in error) {
    const data = (error as { data?: { message?: string } }).data;
    if (data?.message) return data.message;
  }
  return "Something went wrong";
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const [warn, setWarn] = useState(false);
  const [deleteTestimonial, { isLoading }] = useDeleteApiTestimonialsByIdMutation();

  const handleDelete = async () => {
    const response = await deleteTestimonial({ id: `${testimonial.id}` });

    if ("error" in response && response.error) {
      toast.error(getMutationErrorMessage(response.error));
    } else if ("data" in response && response.data) {
      toast.success(response.data.message);
      setWarn(false);
    }
  };

  return (
    <>
      <WarningModal
        open={warn}
        loading={isLoading}
        onOpenChange={setWarn}
        onConfirm={handleDelete}
        title="Delete testimonial"
        subtitle="Are you sure you want to delete this testimonial? This action cannot be undone."
        confirmText="Delete"
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
              alt={testimonial.client_name}
              src={testimonial.image}
              className="size-10 shrink-0 rounded-full border border-border object-cover"
            />
          ) : (
            <div
              className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-muted font-medium text-muted-foreground text-sm"
              aria-hidden
            >
              {testimonial.client_name.charAt(0)}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium text-foreground text-sm">{testimonial.client_name}</p>
            <p className="truncate text-muted-foreground text-xs">
              {testimonial.designation}
              {testimonial.company && ` · ${testimonial.company}`}
            </p>
          </div>
        </div>
        <p className="line-clamp-3 text-foreground text-sm leading-relaxed" title={testimonial.content}>
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
}
