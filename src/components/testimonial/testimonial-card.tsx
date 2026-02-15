import { cn } from "@/lib/utils";
import { GetApiTestimonialsApiResponse } from "@/store/services/apis";
import { Button } from "../ui/button";

interface TestimonialCardProps {
  testimonial: GetApiTestimonialsApiResponse["data"][number];
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <article
      className={cn(
        "flex min-w-[320px] max-w-[360px] shrink-0 flex-col rounded-xl border border-border bg-card p-5 shadow-sm",
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
        <Button type="button" variant="outline" className="w-full">
          Edit
        </Button>
        <Button type="button" variant="destructive" className="w-full">
          Delete
        </Button>
      </div>
    </article>
  );
};

export default TestimonialCard;
