import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-4 w-72" />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {[1, 2].map((i) => (
          <div key={i} className="flex items-center gap-4 rounded-xl border border-border bg-card p-6 shadow-sm">
            <Skeleton className="size-12 shrink-0 rounded-full" />
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-8 w-12" />
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="space-y-2">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="mt-6 h-32 w-full rounded-lg" />
      </div>
    </div>
  );
}
