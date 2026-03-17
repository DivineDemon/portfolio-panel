import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";
import type { Resolver } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { type BasicsFormValues, basicsFormSchema } from "@/lib/form-schemas";

const DEFAULTS: BasicsFormValues = {
  slug: "",
  title: "",
  tagline: "",
  industry: "",
  projectType: "",
  status: "",
  role: "",
  engagementModel: "",
  teamSize: 1,
  durationInMonths: 1,
};

export type ProjectFormStepBasicsProps = {
  initialValues?: Partial<BasicsFormValues>;
  onStepSubmit: (data: BasicsFormValues) => void;
  onPrev?: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  submitLabel?: string;
  isSubmitting?: boolean;
};

/**
 * Step 1: Basics — owns form with basicsFormSchema; onSubmit stores to parent state.
 */
export function ProjectFormStepBasics({
  initialValues,
  onStepSubmit,
  onPrev,
  isFirstStep,
  isLastStep,
  submitLabel = "Submit",
  isSubmitting = false,
}: ProjectFormStepBasicsProps) {
  const form = useForm<BasicsFormValues>({
    resolver: zodResolver(basicsFormSchema) as Resolver<BasicsFormValues>,
    defaultValues: { ...DEFAULTS, ...initialValues },
  });

  useEffect(() => {
    if (initialValues) form.reset({ ...DEFAULTS, ...initialValues });
  }, [initialValues, form]); // eslint-disable-line react-hooks/exhaustive-deps

  const { register } = form;
  const errors = form.formState.errors;

  const handleSubmit = form.handleSubmit((data) => {
    onStepSubmit(data);
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="grid max-h-[calc(100vh-164px)] w-full grid-cols-1 items-start justify-start gap-5 overflow-y-auto md:grid-cols-2"
    >
      <Field>
        <FieldLabel htmlFor="slug">Slug</FieldLabel>
        <Input id="slug" type="text" placeholder="Slug" required {...register("slug")} />
        <FieldError errors={errors.slug ? [errors.slug] : undefined} />
      </Field>
      <Field>
        <FieldLabel htmlFor="title">Title</FieldLabel>
        <Input id="title" type="text" placeholder="Title" required {...register("title")} />
        <FieldError errors={errors.title ? [errors.title] : undefined} />
      </Field>
      <Field>
        <FieldLabel htmlFor="tagline">Tagline</FieldLabel>
        <Input id="tagline" type="text" placeholder="Tagline" required {...register("tagline")} />
        <FieldError errors={errors.tagline ? [errors.tagline] : undefined} />
      </Field>
      <Field>
        <FieldLabel htmlFor="industry">Industry</FieldLabel>
        <Input id="industry" type="text" placeholder="Industry" required {...register("industry")} />
        <FieldError errors={errors.industry ? [errors.industry] : undefined} />
      </Field>
      <Field>
        <FieldLabel htmlFor="projectType">Project Type</FieldLabel>
        <Input id="projectType" type="text" placeholder="Project Type" required {...register("projectType")} />
        <FieldError errors={errors.projectType ? [errors.projectType] : undefined} />
      </Field>
      <Field>
        <FieldLabel htmlFor="status">Status</FieldLabel>
        <Input id="status" type="text" placeholder="Status" required {...register("status")} />
        <FieldError errors={errors.status ? [errors.status] : undefined} />
      </Field>
      <Field>
        <FieldLabel htmlFor="role">Role</FieldLabel>
        <Input id="role" type="text" placeholder="Role" required {...register("role")} />
        <FieldError errors={errors.role ? [errors.role] : undefined} />
      </Field>
      <Field>
        <FieldLabel htmlFor="engagementModel">Engagement Model</FieldLabel>
        <Input
          id="engagementModel"
          type="text"
          placeholder="Engagement Model"
          required
          {...register("engagementModel")}
        />
        <FieldError errors={errors.engagementModel ? [errors.engagementModel] : undefined} />
      </Field>
      <Field>
        <FieldLabel htmlFor="teamSize">Team Size</FieldLabel>
        <Input id="teamSize" type="number" placeholder="Team Size" required min={1} {...register("teamSize")} />
        <FieldError errors={errors.teamSize ? [errors.teamSize] : undefined} />
      </Field>
      <Field>
        <FieldLabel htmlFor="durationInMonths">Duration (months)</FieldLabel>
        <Input
          id="durationInMonths"
          type="number"
          placeholder="Duration in months"
          required
          min={1}
          {...register("durationInMonths")}
        />
        <FieldError errors={errors.durationInMonths ? [errors.durationInMonths] : undefined} />
      </Field>
      <div className="col-span-2 mt-auto flex w-full items-center justify-end gap-4 border-t pt-4">
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
