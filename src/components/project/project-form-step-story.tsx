import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";
import type { Resolver } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { MarkdownField } from "@/components/ui/markdown-field";
import { MetricsKeyValueField } from "@/components/ui/metrics-key-value-field";
import { type StoryFormValues, storyFormSchema } from "@/lib/form-schemas";

const DEFAULTS: StoryFormValues = {
  problem: "",
  situation: "",
  beforeAfter: "",
  approach: "",
  whatMadeThisHard: "",
  businessOutcome: "",
  results: "",
  clientTestimonial: "",
  architecture: "",
  execution: "",
  whatWeBuilt: "",
  metrics: "{}",
};

const STORY_MARKDOWN_FIELDS = [
  { name: "clientTestimonial" as const, label: "Client Testimonial", optional: true },
  { name: "problem" as const, label: "Problem" },
  { name: "situation" as const, label: "Situation" },
  { name: "beforeAfter" as const, label: "Before / After", optional: true },
  { name: "approach" as const, label: "Approach" },
  { name: "whatMadeThisHard" as const, label: "What Made This Hard" },
  { name: "businessOutcome" as const, label: "Business Outcome", optional: true },
  { name: "results" as const, label: "Results" },
  { name: "whatWeBuilt" as const, label: "What We Built" },
  { name: "architecture" as const, label: "Architecture" },
  { name: "execution" as const, label: "Execution" },
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
      <MetricsKeyValueField<StoryFormValues>
        key={initialValues?.metrics ?? "new-metrics"}
        name="metrics"
        control={control}
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
