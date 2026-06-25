import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";
import type { Resolver } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { JsonObjectField } from "@/components/ui/json-object-field";
import { MarkdownField } from "@/components/ui/markdown-field";
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

const STORY_MARKDOWN_FIELDS = [
  { name: "problem" as const, label: "Problem" },
  { name: "context" as const, label: "Context" },
  { name: "strategy" as const, label: "Strategy" },
  { name: "architecture" as const, label: "Architecture" },
  { name: "execution" as const, label: "Execution" },
  { name: "challenges" as const, label: "Challenges" },
  { name: "solution" as const, label: "Solution" },
  { name: "measurableImpact" as const, label: "Measurable Impact" },
];

export type ProjectFormStepStoryProps = {
  initialValues?: Partial<StoryFormValues>;
  onStepSubmit: (data: StoryFormValues) => void;
  onPrev?: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  submitLabel?: string;
  isSubmitting?: boolean;
};

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
  }, [initialValues, form]);

  const { control } = form;
  const errors = form.formState.errors;

  const handleSubmit = form.handleSubmit((data) => {
    onStepSubmit(data);
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="flex max-h-[calc(100vh-164px)] w-full flex-col items-start justify-start gap-5 overflow-y-auto"
    >
      {STORY_MARKDOWN_FIELDS.map(({ name, label }) => (
        <Field key={name}>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>
          <MarkdownField control={control} name={name} id={name} height={180} />
          <FieldError errors={errors[name] ? [errors[name]] : undefined} />
        </Field>
      ))}
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
