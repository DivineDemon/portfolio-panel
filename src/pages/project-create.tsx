import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { PROJECT_FORM_STEP_LABELS } from "@/components/project/project-form-config";
import { ProjectFormStepBasics } from "@/components/project/project-form-step-basics";
import { ProjectFormStepSeoLinks } from "@/components/project/project-form-step-seo-links";
import { ProjectFormStepStoryLazy } from "@/components/project/project-form-step-story-lazy";
import { ProjectFormStepTechMedia } from "@/components/project/project-form-step-tech-media";
import type { FullStepData, StepData } from "@/lib/project-form-steps";
import { mergeStepDataToApiBody } from "@/lib/project-form-steps";
import { usePostApiProjectsMutation } from "@/store/services/apis";

const TOTAL_STEPS = 4;

function getMutationErrorMessage(error: unknown): string {
  if (typeof error === "object" && error !== null && "data" in error) {
    const data = (error as { data?: { message?: string } }).data;
    if (data?.message) return data.message;
  }
  return "Something went wrong";
}

export default function ProjectCreatePage() {
  const navigate = useNavigate();
  const [currentStep, setStep] = useState(0);
  const [stepData, setStepData] = useState<StepData>({});
  const [postProject, { isLoading: isSubmitting }] = usePostApiProjectsMutation();

  const handleFinalSubmit = async (fullData: FullStepData) => {
    try {
      const body = await mergeStepDataToApiBody(fullData);
      const response = await postProject({ body });

      if ("error" in response && response.error) {
        toast.error(getMutationErrorMessage(response.error));
      } else {
        toast.success("Project created successfully!");
        navigate("/dashboard/projects");
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
        <h1 className="font-semibold text-2xl tracking-tight">New project</h1>
        <p className="text-muted-foreground text-sm">Create a new portfolio project entry.</p>
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
            isEdit={false}
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
            submitLabel="Create project"
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  );
}
