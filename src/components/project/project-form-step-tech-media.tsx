import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";
import { Controller, type Resolver, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { type TechMediaFormValues, techMediaFormSchema } from "@/lib/form-schemas";
import { resolveProjectFormImages } from "@/lib/utils";

const DEFAULTS: TechMediaFormValues = {
  keywords: "",
  techStack: "",
  infrastructure: "",
  integrations: "",
  coverImage: undefined,
  galleryImages: [],
};

export type ProjectFormStepTechMediaProps = {
  initialValues?: Partial<TechMediaFormValues>;
  onStepSubmit: (data: TechMediaFormValues) => void;
  onPrev?: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  submitLabel?: string;
  isSubmitting?: boolean;
  isEdit?: boolean;
};

/**
 * Step 3: Tech & media — owns form with techMediaFormSchema; onSubmit stores to parent state.
 */
export function ProjectFormStepTechMedia({
  initialValues,
  onStepSubmit,
  onPrev,
  isFirstStep,
  isLastStep,
  submitLabel = "Submit",
  isSubmitting = false,
  isEdit = false,
}: ProjectFormStepTechMediaProps) {
  const form = useForm<TechMediaFormValues>({
    resolver: zodResolver(techMediaFormSchema) as Resolver<TechMediaFormValues>,
    defaultValues: { ...DEFAULTS, ...initialValues },
  });

  useEffect(() => {
    if (initialValues) form.reset({ ...DEFAULTS, ...initialValues });
  }, [initialValues, form]); // eslint-disable-line react-hooks/exhaustive-deps

  const { register, control } = form;
  const errors = form.formState.errors;
  const coverValue = form.watch("coverImage");
  const galleryValue = form.watch("galleryImages");

  const handleSubmit = form.handleSubmit(async (data) => {
    const resolved = await resolveProjectFormImages({
      coverImage: data.coverImage,
      galleryImages: data.galleryImages,
    });
    const normalized: TechMediaFormValues = {
      ...data,
      coverImage: resolved.coverImage ?? "",
      galleryImages: resolved.galleryImages,
    };
    onStepSubmit(normalized);
  });

  const coverPreview =
    typeof coverValue === "string" && coverValue
      ? coverValue
      : coverValue instanceof FileList && coverValue.length > 0
        ? URL.createObjectURL(coverValue[0]!)
        : null;
  const galleryPreviews: string[] =
    Array.isArray(galleryValue) && galleryValue.length > 0
      ? galleryValue.filter((v): v is string => typeof v === "string" && v.length > 0)
      : galleryValue instanceof FileList
        ? Array.from(galleryValue).map((f) => URL.createObjectURL(f))
        : [];

  return (
    <form
      onSubmit={handleSubmit}
      className="grid max-h-[calc(100vh-164px)] w-full grid-cols-1 items-start justify-start gap-5 overflow-y-auto md:grid-cols-2"
    >
      <Field>
        <FieldLabel htmlFor="keywords">Keywords (comma-separated)</FieldLabel>
        <Input id="keywords" type="text" placeholder="Keywords" {...register("keywords")} />
        <FieldError errors={errors.keywords ? [errors.keywords] : undefined} />
      </Field>
      <Field>
        <FieldLabel htmlFor="techStack">Tech Stack (comma-separated)</FieldLabel>
        <Input id="techStack" type="text" placeholder="Tech Stack" {...register("techStack")} />
        <FieldError errors={errors.techStack ? [errors.techStack] : undefined} />
      </Field>
      <Field>
        <FieldLabel htmlFor="infrastructure">Infrastructure (comma-separated)</FieldLabel>
        <Input id="infrastructure" type="text" placeholder="Infrastructure" {...register("infrastructure")} />
        <FieldError errors={errors.infrastructure ? [errors.infrastructure] : undefined} />
      </Field>
      <Field>
        <FieldLabel htmlFor="integrations">Integrations (comma-separated)</FieldLabel>
        <Input id="integrations" type="text" placeholder="Integrations" {...register("integrations")} />
        <FieldError errors={errors.integrations ? [errors.integrations] : undefined} />
      </Field>
      <Field>
        <FieldLabel htmlFor="coverImage">Cover Image</FieldLabel>
        <Controller
          name="coverImage"
          control={control}
          render={({ field: { value, onChange, onBlur, ref } }) => (
            <div className="space-y-2">
              {coverPreview && (
                <div className="relative aspect-video w-full max-w-md overflow-hidden rounded-md border bg-muted">
                  <img src={coverPreview} alt="Cover preview" className="h-full w-full object-cover" />
                </div>
              )}
              <Input
                ref={ref}
                type="file"
                id="coverImage"
                accept="image/*"
                onChange={(e) => onChange(e.target.files?.length ? e.target.files : undefined)}
                onBlur={onBlur}
                required={!isEdit && !value}
                className="p-0 file:mr-2.5 file:h-9 file:bg-primary file:px-2.5 file:py-0"
              />
            </div>
          )}
        />
        <FieldError errors={errors.coverImage ? [errors.coverImage] : undefined} />
      </Field>
      <Field>
        <FieldLabel htmlFor="galleryImages">Gallery Images</FieldLabel>
        <Controller
          name="galleryImages"
          control={control}
          render={({ field: { value, onChange, onBlur, ref } }) => (
            <div className="space-y-2">
              {galleryPreviews.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {galleryPreviews.map((url, i) => (
                    <div key={i} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md border bg-muted">
                      <img src={url} alt={`Gallery ${i + 1}`} className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
              <Input
                ref={ref}
                type="file"
                id="galleryImages"
                accept="image/*"
                multiple
                onChange={(e) => onChange(e.target.files?.length ? e.target.files : undefined)}
                onBlur={onBlur}
                required={!isEdit && (!value || (Array.isArray(value) && value.length === 0))}
                className="p-0 file:mr-2.5 file:h-9 file:bg-primary file:px-2.5 file:py-0"
              />
            </div>
          )}
        />
        <FieldError errors={errors.galleryImages ? [errors.galleryImages] : undefined} />
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
