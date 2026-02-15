import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const TestimonialSkeleton = () => {
  return (
    <article className={cn("flex w-full shrink-0 flex-col rounded-xl border border-border bg-card p-5 shadow-sm")}>
      <div className="mb-4 flex items-center gap-3 border-border/80 border-b pb-4">
        <Skeleton className="size-10 shrink-0 rounded-full" />
        <div className="min-w-0 flex-1 space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-48" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
      <div className="mt-5 grid w-full grid-cols-2 items-center justify-center gap-2.5 border-t pt-5">
        <Skeleton className="h-9 w-full rounded-md" />
        <Skeleton className="h-9 w-full rounded-md" />
      </div>
    </article>
  );
};

export default TestimonialSkeleton;
