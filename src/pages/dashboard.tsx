import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

import ProjectCard from "@/components/project/project-card";
import TestimonialCard from "@/components/testimonial/testimonial-card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFetchProjectsQuery } from "@/store/services/project";

const Dashboard = () => {
  const { data: projects, isLoading } = useFetchProjectsQuery({});

  return (
    <div className="flex w-full flex-col items-start justify-start gap-5 px-5 pb-5 xl:px-0">
      <div className="flex w-full items-center justify-center">
        <span className="flex-1 text-left text-xl font-bold">Projects</span>
        <Link
          to="/projects"
          className={cn(
            buttonVariants({
              variant: "default",
              size: "sm",
            })
          )}
        >
          View All
        </Link>
      </div>
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {isLoading ? (
          <div className="col-span-1 flex w-full items-center justify-center md:col-span-2 xl:col-span-3">
            <Loader2 className="size-10 animate-spin" />
          </div>
        ) : (
          projects?.map((project) => (
            <ProjectCard
              key={project.id}
              className="col-span-1"
              project={project}
            />
          ))
        )}
      </div>
      <div className="flex w-full items-center justify-center border-t pt-5">
        <span className="flex-1 text-left text-xl font-bold">Testimonials</span>
        <Link
          to="/testimonials"
          className={cn(
            buttonVariants({
              variant: "default",
              size: "sm",
            })
          )}
        >
          View All
        </Link>
      </div>
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {[...Array(3)].map((_, idx) => (
          <TestimonialCard key={idx} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
