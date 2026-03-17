import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";
import type { Resolver } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { JsonObjectField } from "@/components/ui/json-object-field";
import { Textarea } from "@/components/ui/textarea";
import { type StoryFormValues, storyFormSchema } from "@/lib/form-schemas";

const DEFAULTS: StoryFormValues = {
  problem: "",
  context: "",
  strategy: "",
  architecture: "",
  execution: "",
  challenges: "",
  solution: "",
  measurableImpact: "",
  metrics: "{}",
};

export type ProjectFormStepStoryProps = {
  initialValues?: Partial<StoryFormValues>;
  onStepSubmit: (data: StoryFormValues) => void;
  onPrev?: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  submitLabel?: string;
  isSubmitting?: boolean;
};

/**
 * Step 2: Story & content — owns form with storyFormSchema; onSubmit stores to parent state.
 */
export function ProjectFormStepStory({
  initialValues,
  onStepSubmit,
  onPrev,
  isFirstStep,
  isLastStep,
  submitLabel = "Submit",
  isSubmitting = false,
}: ProjectFormStepStoryProps) {
  const form = useForm<StoryFormValues>({
    resolver: zodResolver(storyFormSchema) as Resolver<StoryFormValues>,
    defaultValues: { ...DEFAULTS, ...initialValues },
  });

  useEffect(() => {
    if (initialValues) form.reset({ ...DEFAULTS, ...initialValues });
  }, [initialValues, form]); // eslint-disable-line react-hooks/exhaustive-deps

  const { register, control } = form;
  const errors = form.formState.errors;

  const handleSubmit = form.handleSubmit((data) => {
    onStepSubmit(data);
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="flex max-h-[calc(100vh-164px)] w-full flex-col items-start justify-start gap-5 overflow-y-auto"
    >
      <Field>
        <FieldLabel htmlFor="problem">Problem</FieldLabel>
        <Textarea id="problem" placeholder="Problem" required {...register("problem")} />
        <FieldError errors={errors.problem ? [errors.problem] : undefined} />
      </Field>
      <Field>
        <FieldLabel htmlFor="context">Context</FieldLabel>
        <Textarea id="context" placeholder="Context" required {...register("context")} />
        <FieldError errors={errors.context ? [errors.context] : undefined} />
      </Field>
      <Field>
        <FieldLabel htmlFor="strategy">Strategy</FieldLabel>
        <Textarea id="strategy" placeholder="Strategy" required {...register("strategy")} />
        <FieldError errors={errors.strategy ? [errors.strategy] : undefined} />
      </Field>
      <Field>
        <FieldLabel htmlFor="architecture">Architecture</FieldLabel>
        <Textarea id="architecture" placeholder="Architecture" required {...register("architecture")} />
        <FieldError errors={errors.architecture ? [errors.architecture] : undefined} />
      </Field>
      <Field>
        <FieldLabel htmlFor="execution">Execution</FieldLabel>
        <Textarea id="execution" placeholder="Execution" required {...register("execution")} />
        <FieldError errors={errors.execution ? [errors.execution] : undefined} />
      </Field>
      <Field>
        <FieldLabel htmlFor="challenges">Challenges</FieldLabel>
        <Textarea id="challenges" placeholder="Challenges" required {...register("challenges")} />
        <FieldError errors={errors.challenges ? [errors.challenges] : undefined} />
      </Field>
      <Field>
        <FieldLabel htmlFor="solution">Solution</FieldLabel>
        <Textarea id="solution" placeholder="Solution" required {...register("solution")} />
        <FieldError errors={errors.solution ? [errors.solution] : undefined} />
      </Field>
      <Field>
        <FieldLabel htmlFor="measurableImpact">Measurable Impact</FieldLabel>
        <Textarea id="measurableImpact" placeholder="Measurable Impact" required {...register("measurableImpact")} />
        <FieldError errors={errors.measurableImpact ? [errors.measurableImpact] : undefined} />
      </Field>
      <JsonObjectField<StoryFormValues>
        name="metrics"
        control={control}
        label="Metrics (JSON object)"
        placeholder='{"conversionRate": 0.15, "usersReached": 1000}'
        rows={8}
        error={errors.metrics}
      />
      <div className="mt-auto flex w-full items-center justify-end gap-4 border-t pt-4">
        {!isFirstStep && onPrev && (
          <Button type="button" variant="outline" onClick={onPrev} disabled={isSubmitting}>
            <ChevronLeft className="size-4" />
            Previous
          </Button>
        )}
        {isLastStep ? (
          <Button type="submit" disabled={isSubmitting}>
            {submitLabel}
          </Button>
        ) : (
          <Button type="submit" disabled={isSubmitting}>
            Next
            <ChevronRight className="size-4" />
          </Button>
        )}
      </div>
    </form>
  );
}
