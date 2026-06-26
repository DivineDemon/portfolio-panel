import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { PROJECT_FORM_STEP_LABELS } from "@/components/project/project-form-config";
import { ProjectFormStepBasics } from "@/components/project/project-form-step-basics";
import { ProjectFormStepSeoLinks } from "@/components/project/project-form-step-seo-links";
import { ProjectFormStepStoryLazy } from "@/components/project/project-form-step-story-lazy";
import { ProjectFormStepTechMedia } from "@/components/project/project-form-step-tech-media";
import { Skeleton } from "@/components/ui/skeleton";
import type { FullStepData, StepData } from "@/lib/project-form-steps";
import { mergeStepDataToApiBody, projectResponseToStepData } from "@/lib/project-form-steps";
import {
  type GetApiProjectsByIdApiResponse,
  useGetApiProjectsByIdQuery,
  usePutApiProjectsByIdMutation,
} from "@/store/services/apis";

const TOTAL_STEPS = 4;

function getMutationErrorMessage(error: unknown): string {
  if (typeof error === "object" && error !== null && "data" in error) {
    const data = (error as { data?: { message?: string } }).data;
    if (data?.message) return data.message;
  }
  return "Something went wrong";
}

function ProjectDetailsForm({ project }: { project: GetApiProjectsByIdApiResponse }) {
  const [stepData, setStepData] = useState<StepData>(() => projectResponseToStepData(project));
  const [currentStep, setStep] = useState(0);
  const [putProject, { isLoading: isSubmitting }] = usePutApiProjectsByIdMutation();

  useEffect(() => {
    setStepData(projectResponseToStepData(project));
  }, [project]);

  const handleFinalSubmit = async (fullData: FullStepData) => {
    try {
      const body = await mergeStepDataToApiBody(fullData);
      const response = await putProject({ id: String(project.data.id), body });

      if ("error" in response && response.error) {
        toast.error(getMutationErrorMessage(response.error));
      } else {
        toast.success("Project updated successfully!");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    }
  };

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === TOTAL_STEPS - 1;

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-6">
      <div className="shrink-0">
        <h1 className="font-semibold text-2xl tracking-tight">Edit project</h1>
        <p className="text-muted-foreground text-sm">Update {project.data.title}.</p>
      </div>

      <div className="flex shrink-0 items-center gap-2 text-muted-foreground text-sm">
        <span>
          Step {currentStep + 1} of {TOTAL_STEPS}
        </span>
        <span aria-hidden>·</span>
        <span className="font-medium text-foreground">{PROJECT_FORM_STEP_LABELS[currentStep]}</span>
      </div>

      <div key={currentStep} className="flex min-h-0 flex-1 flex-col">
        {currentStep === 0 && (
          <ProjectFormStepBasics
            initialValues={stepData.basics}
            onStepSubmit={(data) => {
              setStepData((prev) => ({ ...prev, basics: data }));
              setStep(1);
            }}
            onPrev={isFirstStep ? undefined : () => setStep(0)}
            isFirstStep={isFirstStep}
            isLastStep={isLastStep}
            isSubmitting={isSubmitting}
            autoSlug={false}
          />
        )}
        {currentStep === 1 && (
          <ProjectFormStepStoryLazy
            initialValues={stepData.story}
            onStepSubmit={(data) => {
              setStepData((prev) => ({ ...prev, story: data }));
              setStep(2);
            }}
            onPrev={() => setStep(0)}
            isFirstStep={false}
            isLastStep={isLastStep}
            isSubmitting={isSubmitting}
          />
        )}
        {currentStep === 2 && (
          <ProjectFormStepTechMedia
            initialValues={stepData.tech}
            onStepSubmit={(data) => {
              setStepData((prev) => ({ ...prev, tech: data }));
              setStep(3);
            }}
            onPrev={() => setStep(1)}
            isFirstStep={false}
            isLastStep={isLastStep}
            isSubmitting={isSubmitting}
            isEdit
          />
        )}
        {currentStep === 3 && (
          <ProjectFormStepSeoLinks
            initialValues={stepData.seo}
            onStepSubmit={(data) => {
              const full: FullStepData = {
                basics: stepData.basics!,
                story: stepData.story!,
                tech: stepData.tech!,
                seo: data,
              };
              void handleFinalSubmit(full);
            }}
            onPrev={() => setStep(2)}
            isFirstStep={false}
            isLastStep={true}
            submitLabel="Update project"
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  );
}

function ProjectDetailsSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>
      <Skeleton className="h-4 w-40" />
      <div className="grid gap-5 md:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    </div>
  );
}

export default function ProjectDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const {
    data: project,
    isLoading,
    isError,
  } = useGetApiProjectsByIdQuery({ id: id ?? "" }, { skip: !id, refetchOnMountOrArgChange: true });

  if (isLoading || !project) {
    return <ProjectDetailsSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex flex-col gap-2">
        <h1 className="font-semibold text-2xl tracking-tight">Edit project</h1>
        <p className="text-destructive text-sm">Unable to load project details.</p>
      </div>
    );
  }

  return <ProjectDetailsForm project={project} />;
}
