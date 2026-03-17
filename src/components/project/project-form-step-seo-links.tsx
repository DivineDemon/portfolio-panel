import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";
import { Controller, type Resolver, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { type SeoLinksFormValues, seoLinksFormSchema } from "@/lib/form-schemas";

const DEFAULTS: SeoLinksFormValues = {
  seoTitle: "",
  seoDescription: "",
  repositoryUrl: "",
  demoUrl: "",
  featured: false,
  published: false,
};

export type ProjectFormStepSeoLinksProps = {
  initialValues?: Partial<SeoLinksFormValues>;
  onStepSubmit: (data: SeoLinksFormValues) => void;
  onPrev?: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  submitLabel?: string;
  isSubmitting?: boolean;
};

/**
 * Step 4: SEO & links — owns form with seoLinksFormSchema; onSubmit stores to parent state.
 */
export function ProjectFormStepSeoLinks({
  initialValues,
  onStepSubmit,
  onPrev,
  isFirstStep,
  isLastStep,
  submitLabel = "Submit",
  isSubmitting = false,
}: ProjectFormStepSeoLinksProps) {
  const form = useForm<SeoLinksFormValues>({
    resolver: zodResolver(seoLinksFormSchema) as Resolver<SeoLinksFormValues>,
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
      className="grid max-h-[calc(100vh-164px)] w-full grid-cols-1 items-start justify-start gap-5 overflow-y-auto md:grid-cols-2"
    >
      <Field className="md:col-span-2">
        <FieldLabel htmlFor="seoTitle">SEO Title</FieldLabel>
        <Input id="seoTitle" type="text" placeholder="SEO Title" required {...register("seoTitle")} />
        <FieldError errors={errors.seoTitle ? [errors.seoTitle] : undefined} />
      </Field>
      <Field className="md:col-span-2">
        <FieldLabel htmlFor="seoDescription">SEO Description</FieldLabel>
        <Textarea id="seoDescription" placeholder="SEO Description" required {...register("seoDescription")} />
        <FieldError errors={errors.seoDescription ? [errors.seoDescription] : undefined} />
      </Field>
      <Field>
        <FieldLabel htmlFor="repositoryUrl">Repository URL</FieldLabel>
        <Input id="repositoryUrl" type="text" placeholder="Repository URL" required {...register("repositoryUrl")} />
        <FieldError errors={errors.repositoryUrl ? [errors.repositoryUrl] : undefined} />
      </Field>
      <Field>
        <FieldLabel htmlFor="demoUrl">Demo URL</FieldLabel>
        <Input id="demoUrl" type="text" placeholder="Demo URL" required {...register("demoUrl")} />
        <FieldError errors={errors.demoUrl ? [errors.demoUrl] : undefined} />
      </Field>
      <Field>
        <FieldLabel htmlFor="featured">Featured</FieldLabel>
        <Controller
          name="featured"
          control={control}
          render={({ field }) => <Switch id="featured" checked={field.value} onCheckedChange={field.onChange} />}
        />
        <FieldError errors={errors.featured ? [errors.featured] : undefined} />
      </Field>
      <Field>
        <FieldLabel htmlFor="published">Published</FieldLabel>
        <Controller
          name="published"
          control={control}
          render={({ field }) => <Switch id="published" checked={field.value} onCheckedChange={field.onChange} />}
        />
        <FieldError errors={errors.published ? [errors.published] : undefined} />
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
