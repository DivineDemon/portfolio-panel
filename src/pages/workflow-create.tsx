import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { WORKFLOW_FORM_STEP_LABELS } from "@/components/workflow/workflow-form-config";
import { WorkflowFormStepBasics } from "@/components/workflow/workflow-form-step-basics";
import { WorkflowFormStepPublish } from "@/components/workflow/workflow-form-step-publish";
import { WorkflowFormStepStory } from "@/components/workflow/workflow-form-step-story";
import type { FullWorkflowStepData, WorkflowStepData } from "@/lib/workflow-form-steps";
import { mergeWorkflowStepDataToApiBody } from "@/lib/workflow-form-steps";
import { usePostApiN8NWorkflowsMutation } from "@/store/services/apis";

const TOTAL_STEPS = 3;

function getMutationErrorMessage(error: unknown): string {
  if (typeof error === "object" && error !== null && "data" in error) {
    const data = (error as { data?: { message?: string } }).data;
    if (data?.message) return data.message;
  }
  return "Something went wrong";
}

export default function WorkflowCreatePage() {
  const navigate = useNavigate();
  const [currentStep, setStep] = useState(0);
  const [stepData, setStepData] = useState<WorkflowStepData>({});
  const [postWorkflow, { isLoading: isSubmitting }] = usePostApiN8NWorkflowsMutation();

  const handleFinalSubmit = async (fullData: FullWorkflowStepData) => {
    try {
      const body = mergeWorkflowStepDataToApiBody(fullData);
      const response = await postWorkflow({ body });

      if ("error" in response && response.error) {
        toast.error(getMutationErrorMessage(response.error));
      } else {
        toast.success("Workflow created successfully!");
        navigate("/dashboard/workflows");
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
        <h1 className="font-semibold text-2xl tracking-tight">New workflow</h1>
        <p className="text-muted-foreground text-sm">Create a new n8n workflow showcase entry.</p>
      </div>

      <div className="flex shrink-0 items-center gap-2 text-muted-foreground text-sm">
        <span>
          Step {currentStep + 1} of {TOTAL_STEPS}
        </span>
        <span aria-hidden>·</span>
        <span className="font-medium text-foreground">{WORKFLOW_FORM_STEP_LABELS[currentStep]}</span>
      </div>

      <div key={currentStep} className="flex min-h-0 flex-1 flex-col">
        {currentStep === 0 && (
          <WorkflowFormStepBasics
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
          <WorkflowFormStepStory
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
          <WorkflowFormStepPublish
            initialValues={stepData.publish}
            onStepSubmit={(data) => {
              const full: FullWorkflowStepData = {
                basics: stepData.basics!,
                story: stepData.story!,
                publish: data,
              };
              void handleFinalSubmit(full);
            }}
            onPrev={() => setStep(1)}
            isFirstStep={false}
            isLastStep={true}
            submitLabel="Create workflow"
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  );
}
