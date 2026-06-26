import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { WORKFLOW_FORM_STEP_LABELS } from "@/components/workflow/workflow-form-config";
import { WorkflowFormStepBasics } from "@/components/workflow/workflow-form-step-basics";
import { WorkflowFormStepPublish } from "@/components/workflow/workflow-form-step-publish";
import { WorkflowFormStepStory } from "@/components/workflow/workflow-form-step-story";
import type { FullWorkflowStepData, WorkflowStepData } from "@/lib/workflow-form-steps";
import { mergeWorkflowStepDataToApiBody, workflowResponseToStepData } from "@/lib/workflow-form-steps";
import {
  type GetApiN8NWorkflowsByIdApiResponse,
  useGetApiN8NWorkflowsByIdQuery,
  usePutApiN8NWorkflowsByIdMutation,
} from "@/store/services/apis";

const TOTAL_STEPS = 3;

function getMutationErrorMessage(error: unknown): string {
  if (typeof error === "object" && error !== null && "data" in error) {
    const data = (error as { data?: { message?: string } }).data;
    if (data?.message) return data.message;
  }
  return "Something went wrong";
}

function WorkflowDetailsForm({ workflow }: { workflow: GetApiN8NWorkflowsByIdApiResponse }) {
  const [stepData, setStepData] = useState<WorkflowStepData>(() => workflowResponseToStepData(workflow));
  const [currentStep, setStep] = useState(0);
  const [putWorkflow, { isLoading: isSubmitting }] = usePutApiN8NWorkflowsByIdMutation();

  useEffect(() => {
    setStepData(workflowResponseToStepData(workflow));
  }, [workflow]);

  const handleFinalSubmit = async (fullData: FullWorkflowStepData) => {
    try {
      const body = mergeWorkflowStepDataToApiBody(fullData);
      const response = await putWorkflow({ id: String(workflow.data.id), body });

      if ("error" in response && response.error) {
        toast.error(getMutationErrorMessage(response.error));
      } else {
        toast.success("Workflow updated successfully!");
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
        <h1 className="font-semibold text-2xl tracking-tight">Edit workflow</h1>
        <p className="text-muted-foreground text-sm">Update {workflow.data.title}.</p>
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
            autoSlug={false}
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
            submitLabel="Update workflow"
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  );
}

function WorkflowDetailsSkeleton() {
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

export default function WorkflowDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const {
    data: workflow,
    isLoading,
    isError,
  } = useGetApiN8NWorkflowsByIdQuery({ id: id ?? "" }, { skip: !id, refetchOnMountOrArgChange: true });

  if (isLoading || !workflow) {
    return <WorkflowDetailsSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex flex-col gap-2">
        <h1 className="font-semibold text-2xl tracking-tight">Edit workflow</h1>
        <p className="text-destructive text-sm">Unable to load workflow details.</p>
      </div>
    );
  }

  return <WorkflowDetailsForm workflow={workflow} />;
}
