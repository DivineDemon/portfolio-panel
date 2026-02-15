import { Skeleton } from "@/components/ui/skeleton";

const DashboardSkeleton = () => {
  return (
    <div className="flex h-full w-full flex-col items-start justify-start gap-5">
      <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
        <div className="col-span-1 flex w-full items-center justify-start gap-2.5 rounded-lg border p-2.5 shadow">
          <Skeleton className="size-12 shrink-0 rounded-full" />
          <div className="flex flex-1 flex-col items-start justify-center gap-2">
            <Skeleton className="h-[18px] w-8" />
            <Skeleton className="h-[14px] w-16" />
          </div>
        </div>
        <div className="col-span-1 flex w-full items-center justify-start gap-2.5 rounded-lg border p-2.5 shadow">
          <Skeleton className="size-12 shrink-0 rounded-full" />
          <div className="flex flex-1 flex-col items-start justify-center gap-2">
            <Skeleton className="h-[18px] w-8" />
            <Skeleton className="h-[14px] w-20" />
          </div>
        </div>
      </div>
      <div className="flex h-full min-h-[200px] w-full items-center justify-center rounded-lg border shadow">
        <Skeleton className="h-full min-h-[200px] w-full rounded-lg" />
      </div>
    </div>
  );
};

export default DashboardSkeleton;
