import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";
import type { Resolver } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { type WorkflowBasicsFormValues, workflowBasicsFormSchema } from "@/lib/form-schemas";
import { resolveProjectFormImages } from "@/lib/upload";
import { slugifyTitle } from "@/lib/workflow-form-steps";
import { useGetApiClientsQuery } from "@/store/services/apis";

const DEFAULTS: WorkflowBasicsFormValues = {
  slug: "",
  title: "",
  headlineResult: "",
  clientId: "",
  integrations: "",
  coverImage: undefined,
};

export type WorkflowFormStepBasicsProps = {
  initialValues?: Partial<WorkflowBasicsFormValues>;
  onStepSubmit: (data: WorkflowBasicsFormValues) => void;
  onPrev?: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  submitLabel?: string;
  isSubmitting?: boolean;
  autoSlug?: boolean;
};

export function WorkflowFormStepBasics({
  initialValues,
  onStepSubmit,
  onPrev,
  isFirstStep,
  isLastStep,
  submitLabel = "Submit",
  isSubmitting = false,
  autoSlug = true,
}: WorkflowFormStepBasicsProps) {
  const slugManuallyEdited = useRef(false);
  const { data: clientsResponse } = useGetApiClientsQuery();
  const clients = clientsResponse?.data ?? [];

  const form = useForm<WorkflowBasicsFormValues>({
    resolver: zodResolver(workflowBasicsFormSchema) as Resolver<WorkflowBasicsFormValues>,
    defaultValues: { ...DEFAULTS, ...initialValues },
  });

  useEffect(() => {
    if (initialValues) form.reset({ ...DEFAULTS, ...initialValues });
  }, [initialValues, form]);

  const { register, setValue, watch, control } = form;
  const errors = form.formState.errors;
  const title = watch("title");
  const coverValue = watch("coverImage");

  useEffect(() => {
    if (!autoSlug || slugManuallyEdited.current) return;
    if (title) {
      setValue("slug", slugifyTitle(title), { shouldValidate: true });
    }
  }, [autoSlug, title, setValue]);

  const coverPreview =
    typeof coverValue === "string" && coverValue
      ? coverValue
      : coverValue instanceof FileList && coverValue.length > 0
        ? URL.createObjectURL(coverValue[0]!)
        : null;

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      const resolved = await resolveProjectFormImages({ coverImage: data.coverImage });
      onStepSubmit({
        ...data,
        coverImage: resolved.coverImage ?? "",
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Image upload failed");
    }
  });

  return (
    <form onSubmit={handleSubmit} className="flex min-h-0 w-full flex-1 flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="grid w-full grid-cols-1 items-start justify-start gap-5 pb-5 md:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="slug">Slug</FieldLabel>
            <Input
              id="slug"
              type="text"
              placeholder="workflow-slug"
              required
              {...register("slug", {
                onChange: () => {
                  slugManuallyEdited.current = true;
                },
              })}
            />
            <FieldError errors={errors.slug ? [errors.slug] : undefined} />
          </Field>
          <Field>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Input id="title" type="text" placeholder="Title" required {...register("title")} />
            <FieldError errors={errors.title ? [errors.title] : undefined} />
          </Field>
          <Field className="md:col-span-2">
            <FieldLabel htmlFor="headlineResult">Headline Result</FieldLabel>
            <Input
              id="headlineResult"
              type="text"
              placeholder="Outcome-led opener (e.g. Automated lead routing in under 30 seconds)"
              required
              {...register("headlineResult")}
            />
            <FieldError errors={errors.headlineResult ? [errors.headlineResult] : undefined} />
          </Field>
          <Field>
            <FieldLabel htmlFor="clientId">Client</FieldLabel>
            <Controller
              name="clientId"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value === "" ? "none" : String(field.value)}
                  onValueChange={(value) => field.onChange(value === "none" ? "" : Number(value))}
                >
                  <SelectTrigger id="clientId" className="w-full" aria-invalid={errors.clientId ? true : undefined}>
                    <SelectValue placeholder="Select client (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No client</SelectItem>
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={String(client.id)}>
                        {client.clientName}
                        {client.company ? ` · ${client.company}` : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError errors={errors.clientId ? [errors.clientId] : undefined} />
          </Field>
          <Field>
            <FieldLabel htmlFor="integrations">Integrations</FieldLabel>
            <Input
              id="integrations"
              type="text"
              placeholder="Slack, Gmail, HTTP Request (comma-separated)"
              {...register("integrations")}
            />
            <FieldError errors={errors.integrations ? [errors.integrations] : undefined} />
          </Field>
          <Field className="md:col-span-2">
            <FieldLabel htmlFor="coverImage">Cover Image</FieldLabel>
            <Controller
              name="coverImage"
              control={control}
              render={({ field: { onChange, onBlur, name, ref } }) => (
                <Input
                  id="coverImage"
                  type="file"
                  accept="image/*"
                  name={name}
                  ref={ref}
                  onBlur={onBlur}
                  onChange={(event) => onChange(event.target.files ?? undefined)}
                />
              )}
            />
            {coverPreview && (
              <img src={coverPreview} alt="Cover preview" className="mt-2 max-h-40 rounded-md border object-cover" />
            )}
            <FieldError errors={errors.coverImage ? [errors.coverImage] : undefined} />
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
