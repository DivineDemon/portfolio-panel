import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { PROJECT_FORM_STEP_LABELS } from "@/components/project/project-form-config";
import { ProjectFormStepBasics } from "@/components/project/project-form-step-basics";
import { ProjectFormStepSeoLinks } from "@/components/project/project-form-step-seo-links";
import { ProjectFormStepStory } from "@/components/project/project-form-step-story";
import { ProjectFormStepTechMedia } from "@/components/project/project-form-step-tech-media";
import type { FullStepData, StepData } from "@/lib/project-form-steps";
import { mergeStepDataToApiBody, projectResponseToStepData } from "@/lib/project-form-steps";
import { useGetApiProjectsByIdQuery, usePutApiProjectsByIdMutation } from "@/store/services/apis";

const TOTAL_STEPS = 4;

function ProjectDetailsForm({
  project,
}: {
  project: NonNullable<ReturnType<typeof useGetApiProjectsByIdQuery>["data"]>;
}) {
  const [stepData, setStepData] = useState<StepData>(() => projectResponseToStepData(project));
  const [currentStep, setStep] = useState(0);
  const [putProject, { isLoading: isSubmitting }] = usePutApiProjectsByIdMutation();

  useEffect(() => {
    setStepData(projectResponseToStepData(project));
  }, [project]);

  const handleFinalSubmit = async (fullData: FullStepData) => {
    const body = await mergeStepDataToApiBody(fullData);
    const response = await putProject({ id: String(project.data.id), body });
    if (response.error) {
      // @ts-expect-error - response.error.data.message is not typed
      toast.error(response.error.data?.message ?? "Something went wrong");
    } else {
      toast.success("Project updated successfully!");
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
          submitLabel="Update Project"
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
          submitLabel="Update Project"
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
          submitLabel="Update Project"
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
          submitLabel="Update Project"
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}

const ProjectDetails = () => {
  const { id } = useParams();
  const { data: project } = useGetApiProjectsByIdQuery(
    { id: id ?? "" },
    { skip: !id, refetchOnMountOrArgChange: true },
  );

  if (!project) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-muted-foreground text-sm">Loading project details…</p>
      </div>
    );
  }

  return <ProjectDetailsForm project={project} />;
};

export default ProjectDetails;
