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
  cardOutcome: "",
  displayOrder: "",
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
  }, [initialValues, form]);

  const { register, control } = form;
  const errors = form.formState.errors;

  const handleSubmit = form.handleSubmit((data) => {
    onStepSubmit(data);
  });

  return (
    <form onSubmit={handleSubmit} className="flex min-h-0 w-full flex-1 flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="grid w-full grid-cols-1 items-start justify-start gap-5 pb-5 md:grid-cols-2">
          <Field className="md:col-span-2">
            <FieldLabel htmlFor="cardOutcome">Card Outcome</FieldLabel>
            <Input
              id="cardOutcome"
              type="text"
              placeholder='e.g. "0 → 4 live portals billing real customers in 16 months"'
              {...register("cardOutcome")}
            />
            <p className="text-muted-foreground text-xs">
              One-line business outcome shown on homepage cards and llms.txt. Leave blank to use headline result.
            </p>
            <FieldError errors={errors.cardOutcome ? [errors.cardOutcome] : undefined} />
          </Field>
          <Field>
            <FieldLabel htmlFor="displayOrder">Display Order</FieldLabel>
            <Input
              id="displayOrder"
              type="number"
              placeholder="Homepage sort order (1 = first)"
              min={1}
              {...register("displayOrder")}
            />
            <FieldError errors={errors.displayOrder ? [errors.displayOrder] : undefined} />
          </Field>
          <Field>
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
            <Input
              id="repositoryUrl"
              type="text"
              placeholder="Repository URL"
              required
              {...register("repositoryUrl")}
            />
            <FieldError errors={errors.repositoryUrl ? [errors.repositoryUrl] : undefined} />
          </Field>
          <Field>
            <FieldLabel htmlFor="demoUrl">Demo URL</FieldLabel>
            <Input id="demoUrl" type="text" placeholder="Demo URL" required {...register("demoUrl")} />
            <FieldError errors={errors.demoUrl ? [errors.demoUrl] : undefined} />
          </Field>
          <Field>
            <FieldLabel htmlFor="featured">Featured</FieldLabel>
            <div className="flex h-[36px] w-full items-center justify-start rounded-md border pl-2.5">
              <Controller
                name="featured"
                control={control}
                render={({ field }) => <Switch id="featured" checked={field.value} onCheckedChange={field.onChange} />}
              />
            </div>
            <FieldError errors={errors.featured ? [errors.featured] : undefined} />
          </Field>
          <Field>
            <FieldLabel htmlFor="published">Published</FieldLabel>
            <div className="flex h-[36px] w-full items-center justify-start rounded-md border pl-2.5">
              <Controller
                name="published"
                control={control}
                render={({ field }) => <Switch id="published" checked={field.value} onCheckedChange={field.onChange} />}
              />
            </div>
            <FieldError errors={errors.published ? [errors.published] : undefined} />
          </Field>
        </div>
      </div>

      <div className="flex w-full shrink-0 items-center justify-end gap-4 border-t pt-4">
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
