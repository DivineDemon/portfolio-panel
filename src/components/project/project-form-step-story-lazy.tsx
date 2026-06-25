import { lazy, Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";

import type { ProjectFormStepStoryProps } from "./project-form-step-story";

const ProjectFormStepStory = lazy(() =>
  import("./project-form-step-story").then((module) => ({ default: module.ProjectFormStepStory })),
);

function StoryStepSkeleton() {
  return (
    <div className="flex flex-col gap-5">
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} className="h-[220px] w-full" />
      ))}
    </div>
  );
}

export function ProjectFormStepStoryLazy(props: ProjectFormStepStoryProps) {
  return (
    <Suspense fallback={<StoryStepSkeleton />}>
      <ProjectFormStepStory {...props} />
    </Suspense>
  );
}
