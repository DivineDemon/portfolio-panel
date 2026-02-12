import { Loader2 } from "lucide-react";
import { useGetApiProjectsQuery, useGetApiTestimonialsQuery } from "@/store/services/apis";

const Dashboard = () => {
  const { data: projects, isLoading: pLoading } = useGetApiProjectsQuery();
  const { data: testimonials, isLoading: tLoading } = useGetApiTestimonialsQuery();
  const projectsCount = projects?.data?.length ?? 0;
  const testimonialsCount = testimonials?.data?.length ?? 0;

  return (
    <div className="flex w-full flex-col items-start justify-start gap-6 px-5 pb-5 xl:px-0">
      <h1 className="w-full text-left font-bold text-2xl">Overview</h1>
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl border bg-background p-5">
          <p className="text-muted-foreground text-sm">Projects</p>
          {pLoading ? (
            <div className="mt-3 flex items-center gap-2">
              <Loader2 className="size-5 animate-spin" />
              <span className="text-muted-foreground text-sm">Loading count...</span>
            </div>
          ) : (
            <p className="mt-3 font-bold text-3xl">{projectsCount}</p>
          )}
        </div>
        <div className="rounded-xl border bg-background p-5">
          <p className="text-muted-foreground text-sm">Testimonials</p>
          {tLoading ? (
            <div className="mt-3 flex items-center gap-2">
              <Loader2 className="size-5 animate-spin" />
              <span className="text-muted-foreground text-sm">Loading count...</span>
            </div>
          ) : (
            <p className="mt-3 font-bold text-3xl">{testimonialsCount}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
