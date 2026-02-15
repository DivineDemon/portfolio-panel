import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const ProjectSkeleton = () => {
  return (
    <div
      className={cn(
        "col-span-1 flex h-full shrink-0 flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm",
      )}
    >
      <Skeleton className="aspect-16/10 w-full rounded-none" />
      <div className="flex flex-1 flex-col gap-2 p-4">
        <Skeleton className="h-6 w-3/4 font-mono" />
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <Skeleton className="mt-auto h-5 w-24 rounded border border-border/60 px-2 py-0.5" />
        <div className="flex flex-wrap gap-1.5 pt-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-5 w-14 rounded px-2 py-0.5" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectSkeleton;
