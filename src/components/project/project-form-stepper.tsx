import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import type { ProjectFormOutputValues, ProjectFormValues } from "@/lib/form-schemas";
import {
  PROJECT_FORM_STEP_FIELDS,
  PROJECT_FORM_STEP_LABELS,
  ProjectFormStepBasics,
  ProjectFormStepSeoLinks,
  ProjectFormStepStory,
  ProjectFormStepTechMedia,
} from "./project-form-steps";

const STEPS = [ProjectFormStepBasics, ProjectFormStepStory, ProjectFormStepTechMedia, ProjectFormStepSeoLinks] as const;

type ProjectFormStepperProps = {
  form: UseFormReturn<ProjectFormValues>;
  onSubmit: (data: ProjectFormOutputValues) => void | Promise<void>;
  submitLabel: string;
  isSubmitting?: boolean;
  isEdit?: boolean;
};

export function ProjectFormStepper({
  form,
  onSubmit,
  submitLabel,
  isSubmitting = false,
  isEdit = false,
}: ProjectFormStepperProps) {
  const [currentStep, setStep] = useState(0);

  const totalSteps = STEPS.length;
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  const handleNext = async (e: React.MouseEvent) => {
    e.preventDefault();
    const { trigger } = form;
    const fields = PROJECT_FORM_STEP_FIELDS[currentStep];
    if (!fields) return;
    const valid = await trigger(fields as unknown as (keyof ProjectFormValues)[]);
    if (valid && currentStep < totalSteps - 1) setStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) setStep(currentStep - 1);
  };

  const StepContent = STEPS[currentStep];

  const handleFormSubmit = form.handleSubmit((data) => {
    if (currentStep === totalSteps - 1) {
      onSubmit(data as unknown as ProjectFormOutputValues);
    }
  });

  return (
    <form onSubmit={handleFormSubmit} className="flex h-full w-full flex-col gap-6 overflow-hidden">
      <div className="flex items-center gap-2 text-muted-foreground text-sm">
        <span>
          Step {currentStep + 1} of {totalSteps}
        </span>
        <span aria-hidden>·</span>
        <span className="font-medium text-foreground">{PROJECT_FORM_STEP_LABELS[currentStep]}</span>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">{StepContent && <StepContent form={form} isEdit={isEdit} />}</div>

      <div className="flex w-full items-center justify-between gap-4 border-t pt-4">
        <div>
          {!isFirstStep && (
            <Button type="button" variant="outline" onClick={handlePrev} disabled={isSubmitting}>
              <ChevronLeft className="size-4" />
              Previous
            </Button>
          )}
        </div>
        <div className="flex gap-2">
          {!isLastStep ? (
            <Button type="button" onClick={handleNext} disabled={isSubmitting}>
              Next
              <ChevronRight className="size-4" />
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : submitLabel}
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}
