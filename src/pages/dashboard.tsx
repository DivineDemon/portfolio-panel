import { Package, Users } from "lucide-react";
import DashboardSkeleton from "@/components/skeleton/dashboard-skeleton";
import { useGetApiProjectsQuery, useGetApiTestimonialsQuery } from "@/store/services/apis";

const Dashboard = () => {
  const { data: projects, isLoading } = useGetApiProjectsQuery();
  const { data: testimonials, isLoading: tLoading } = useGetApiTestimonialsQuery();

  return isLoading || tLoading ? (
    <DashboardSkeleton />
  ) : (
    <div className="flex h-full w-full flex-col items-start justify-start gap-5">
      <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
        <div className="col-span-1 flex w-full items-center justify-start gap-2.5 rounded-lg border p-2.5 shadow">
          <div className="size-12 rounded-full bg-primary/20 p-3 text-primary">
            <Package className="size-full" />
          </div>
          <div className="flex flex-1 flex-col items-start justify-center gap-2">
            <span className="w-full font-semibold text-[18px] leading-[18px]">{projects?.data.length}</span>
            <span className="w-full text-[14px] text-muted-foreground leading-[14px]">Projects</span>
          </div>
        </div>
        <div className="col-span-1 flex w-full items-center justify-start gap-2.5 rounded-lg border p-2.5 shadow">
          <div className="size-12 rounded-full bg-primary/20 p-3 text-primary">
            <Users className="size-full" />
          </div>
          <div className="flex flex-1 flex-col items-start justify-center gap-2">
            <span className="w-full font-semibold text-[18px] leading-[18px]">{testimonials?.data.length}</span>
            <span className="w-full text-[14px] text-muted-foreground leading-[14px]">Testimonials</span>
          </div>
        </div>
      </div>
      <div className="flex h-full w-full items-center justify-center rounded-lg border shadow">
        Analytics Coming Soon...
      </div>
    </div>
  );
};

export default Dashboard;
