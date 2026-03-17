import { useState } from "react";
import { toast } from "sonner";
import { PROJECT_FORM_STEP_LABELS } from "@/components/project/project-form-config";
import { ProjectFormStepBasics } from "@/components/project/project-form-step-basics";
import { ProjectFormStepSeoLinks } from "@/components/project/project-form-step-seo-links";
import { ProjectFormStepStory } from "@/components/project/project-form-step-story";
import { ProjectFormStepTechMedia } from "@/components/project/project-form-step-tech-media";
import type { FullStepData, StepData } from "@/lib/project-form-steps";
import { mergeStepDataToApiBody } from "@/lib/project-form-steps";
import { usePostApiProjectsMutation } from "@/store/services/apis";

const TOTAL_STEPS = 4;

const ProjectCreate = () => {
  const [currentStep, setStep] = useState(0);
  const [stepData, setStepData] = useState<StepData>({});
  const [postProject, { isLoading: isSubmitting }] = usePostApiProjectsMutation();

  const handleFinalSubmit = async (fullData: FullStepData) => {
    try {
      const body = await mergeStepDataToApiBody(fullData);
      const response = await postProject({ body });

      if ("error" in response && response.error) {
        // @ts-expect-error - response.error.data.message is not typed
        toast.error(response.error.data?.message ?? "Something went wrong");
      } else {
        toast.success("Project created successfully!");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    }
  };

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === TOTAL_STEPS - 1;

  return (
    <div className="flex h-full w-full flex-col gap-5 overflow-hidden">
      <div className="flex items-center gap-2 text-muted-foreground text-sm">
        <span>
          Step {currentStep + 1} of {TOTAL_STEPS}
        </span>
        <span aria-hidden>·</span>
        <span className="font-medium text-foreground">{PROJECT_FORM_STEP_LABELS[currentStep]}</span>
      </div>
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
          submitLabel="Create Project"
          isSubmitting={isSubmitting}
        />
      )}
      {currentStep === 1 && (
        <ProjectFormStepStory
          initialValues={stepData.story}
          onStepSubmit={(data) => {
            setStepData((prev) => ({ ...prev, story: data }));
            setStep(2);
          }}
          onPrev={() => setStep(0)}
          isFirstStep={false}
          isLastStep={isLastStep}
          submitLabel="Create Project"
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
          submitLabel="Create Project"
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
          submitLabel="Create Project"
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
};

export default ProjectCreate;
