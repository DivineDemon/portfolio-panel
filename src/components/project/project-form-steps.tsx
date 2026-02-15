import { useEffect, useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { JsonObjectField } from "@/components/ui/json-object-field";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { ProjectFormValues } from "@/lib/form-schemas";

export const PROJECT_FORM_STEP_FIELDS: (keyof ProjectFormValues)[][] = [
  [
    "slug",
    "title",
    "tagline",
    "industry",
    "projectType",
    "status",
    "role",
    "engagementModel",
    "teamSize",
    "durationInMonths",
  ],
  [
    "problem",
    "context",
    "strategy",
    "architecture",
    "execution",
    "challenges",
    "solution",
    "measurableImpact",
    "metrics",
  ],
  ["keywords", "techStack", "infrastructure", "integrations", "coverImage", "galleryImages"],
  ["seoTitle", "seoDescription", "repositoryUrl", "demoUrl", "featured", "published"],
];

export const PROJECT_FORM_STEP_LABELS = ["Basics", "Story & content", "Tech & media", "SEO & links"] as const;

type StepProps = { form: UseFormReturn<ProjectFormValues>; isEdit?: boolean };

function useCoverImagePreviewUrl(value: ProjectFormValues["coverImage"]): string | null {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  useEffect(() => {
    if (value instanceof FileList && value.length > 0) {
      const url = URL.createObjectURL(value[0]!);
      setObjectUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setObjectUrl(null);
    return undefined;
  }, [value]);
  if (typeof value === "string" && value) return value;
  return objectUrl;
}

function useGalleryPreviewUrls(value: ProjectFormValues["galleryImages"]): string[] {
  const [objectUrls, setObjectUrls] = useState<string[]>([]);
  useEffect(() => {
    if (value instanceof FileList && value.length > 0) {
      const urls = Array.from(value).map((f) => URL.createObjectURL(f));
      setObjectUrls(urls);
      return () => urls.forEach(URL.revokeObjectURL);
    }
    setObjectUrls([]);
    return undefined;
  }, [value]);
  if (Array.isArray(value)) {
    return value.filter((v): v is string => typeof v === "string" && v.length > 0);
  }
  return objectUrls;
}

export function ProjectFormStepBasics({ form }: StepProps) {
  return (
    <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
      <Field>
        <FieldLabel htmlFor="slug">Slug</FieldLabel>
        <Input required type="text" id="slug" placeholder="Slug" {...form.register("slug")} />
        <FieldError errors={form.formState.errors.slug ? [form.formState.errors.slug] : undefined} />
      </Field>
      <Field>
        <FieldLabel htmlFor="title">Title</FieldLabel>
        <Input required type="text" id="title" placeholder="Title" {...form.register("title")} />
        <FieldError errors={form.formState.errors.title ? [form.formState.errors.title] : undefined} />
      </Field>
      <Field>
        <FieldLabel htmlFor="tagline">Tagline</FieldLabel>
        <Input required type="text" id="tagline" placeholder="Tagline" {...form.register("tagline")} />
        <FieldError errors={form.formState.errors.tagline ? [form.formState.errors.tagline] : undefined} />
      </Field>
      <Field>
        <FieldLabel htmlFor="industry">Industry</FieldLabel>
        <Input required type="text" id="industry" placeholder="Industry" {...form.register("industry")} />
        <FieldError errors={form.formState.errors.industry ? [form.formState.errors.industry] : undefined} />
      </Field>
      <Field>
        <FieldLabel htmlFor="projectType">Project Type</FieldLabel>
        <Input required type="text" id="projectType" placeholder="Project Type" {...form.register("projectType")} />
        <FieldError errors={form.formState.errors.projectType ? [form.formState.errors.projectType] : undefined} />
      </Field>
      <Field>
        <FieldLabel htmlFor="status">Status</FieldLabel>
        <Input required type="text" id="status" placeholder="Status" {...form.register("status")} />
        <FieldError errors={form.formState.errors.status ? [form.formState.errors.status] : undefined} />
      </Field>
      <Field>
        <FieldLabel htmlFor="role">Role</FieldLabel>
        <Input required type="text" id="role" placeholder="Role" {...form.register("role")} />
        <FieldError errors={form.formState.errors.role ? [form.formState.errors.role] : undefined} />
      </Field>
      <Field>
        <FieldLabel htmlFor="engagementModel">Engagement Model</FieldLabel>
        <Input
          required
          type="text"
          id="engagementModel"
          placeholder="Engagement Model"
          {...form.register("engagementModel")}
        />
        <FieldError
          errors={form.formState.errors.engagementModel ? [form.formState.errors.engagementModel] : undefined}
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="teamSize">Team Size</FieldLabel>
        <Input required type="number" id="teamSize" placeholder="Team Size" {...form.register("teamSize")} />
        <FieldError errors={form.formState.errors.teamSize ? [form.formState.errors.teamSize] : undefined} />
      </Field>
      <Field>
        <FieldLabel htmlFor="durationInMonths">Duration in Months</FieldLabel>
        <Input
          required
          type="number"
          id="durationInMonths"
          placeholder="Duration in Months"
          {...form.register("durationInMonths")}
        />
        <FieldError
          errors={form.formState.errors.durationInMonths ? [form.formState.errors.durationInMonths] : undefined}
        />
      </Field>
    </div>
  );
}

export function ProjectFormStepStory({ form }: StepProps) {
  return (
    <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-1">
      <Field>
        <FieldLabel htmlFor="problem">Problem</FieldLabel>
        <Textarea required id="problem" placeholder="Problem" {...form.register("problem")} />
        <FieldError errors={form.formState.errors.problem ? [form.formState.errors.problem] : undefined} />
      </Field>
      <Field>
        <FieldLabel htmlFor="context">Context</FieldLabel>
        <Textarea required id="context" placeholder="Context" {...form.register("context")} />
        <FieldError errors={form.formState.errors.context ? [form.formState.errors.context] : undefined} />
      </Field>
      <Field>
        <FieldLabel htmlFor="strategy">Strategy</FieldLabel>
        <Textarea required id="strategy" placeholder="Strategy" {...form.register("strategy")} />
        <FieldError errors={form.formState.errors.strategy ? [form.formState.errors.strategy] : undefined} />
      </Field>
      <Field>
        <FieldLabel htmlFor="architecture">Architecture</FieldLabel>
        <Textarea required id="architecture" placeholder="Architecture" {...form.register("architecture")} />
        <FieldError errors={form.formState.errors.architecture ? [form.formState.errors.architecture] : undefined} />
      </Field>
      <Field>
        <FieldLabel htmlFor="execution">Execution</FieldLabel>
        <Textarea required id="execution" placeholder="Execution" {...form.register("execution")} />
        <FieldError errors={form.formState.errors.execution ? [form.formState.errors.execution] : undefined} />
      </Field>
      <Field>
        <FieldLabel htmlFor="challenges">Challenges</FieldLabel>
        <Textarea required id="challenges" placeholder="Challenges" {...form.register("challenges")} />
        <FieldError errors={form.formState.errors.challenges ? [form.formState.errors.challenges] : undefined} />
      </Field>
      <Field>
        <FieldLabel htmlFor="solution">Solution</FieldLabel>
        <Textarea required id="solution" placeholder="Solution" {...form.register("solution")} />
        <FieldError errors={form.formState.errors.solution ? [form.formState.errors.solution] : undefined} />
      </Field>
      <Field>
        <FieldLabel htmlFor="measurableImpact">Measurable Impact</FieldLabel>
        <Textarea
          required
          id="measurableImpact"
          placeholder="Measurable Impact"
          {...form.register("measurableImpact")}
        />
        <FieldError
          errors={form.formState.errors.measurableImpact ? [form.formState.errors.measurableImpact] : undefined}
        />
      </Field>
      <JsonObjectField<ProjectFormValues>
        name="metrics"
        control={form.control}
        label="Metrics (JSON object)"
        placeholder='{"conversionRate": 0.15, "usersReached": 1000}'
        rows={8}
        error={form.formState.errors.metrics}
      />
    </div>
  );
}

export function ProjectFormStepTechMedia({ form, isEdit }: StepProps) {
  const coverImageValue = form.watch("coverImage");
  const galleryImagesValue = form.watch("galleryImages");
  const coverPreviewUrl = useCoverImagePreviewUrl(coverImageValue);
  const galleryPreviewUrls = useGalleryPreviewUrls(galleryImagesValue);

  return (
    <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
      <Field>
        <FieldLabel htmlFor="keywords">Keywords</FieldLabel>
        <Input required type="text" id="keywords" placeholder="Keywords" {...form.register("keywords")} />
        <FieldError errors={form.formState.errors.keywords ? [form.formState.errors.keywords] : undefined} />
      </Field>
      <Field>
        <FieldLabel htmlFor="techStack">Tech Stack</FieldLabel>
        <Input required type="text" id="techStack" placeholder="Tech Stack" {...form.register("techStack")} />
        <FieldError errors={form.formState.errors.techStack ? [form.formState.errors.techStack] : undefined} />
      </Field>
      <Field>
        <FieldLabel htmlFor="infrastructure">Infrastructure</FieldLabel>
        <Input
          required
          type="text"
          id="infrastructure"
          placeholder="Infrastructure"
          {...form.register("infrastructure")}
        />
        <FieldError
          errors={form.formState.errors.infrastructure ? [form.formState.errors.infrastructure] : undefined}
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="integrations">Integrations</FieldLabel>
        <Input required type="text" id="integrations" placeholder="Integrations" {...form.register("integrations")} />
        <FieldError errors={form.formState.errors.integrations ? [form.formState.errors.integrations] : undefined} />
      </Field>
      <Field>
        <FieldLabel htmlFor="coverImage">Cover Image</FieldLabel>
        <Controller
          name="coverImage"
          control={form.control}
          render={({ field: { value, onChange, onBlur, ref } }) => (
            <div className="space-y-2">
              {coverPreviewUrl && (
                <div className="relative aspect-video w-full max-w-md overflow-hidden rounded-md border bg-muted">
                  <img src={coverPreviewUrl} alt="Cover preview" className="h-full w-full object-cover" />
                </div>
              )}
              <Input
                ref={ref}
                type="file"
                id="coverImage"
                accept="image/*"
                onChange={(e) => {
                  const files = e.target.files;
                  onChange(files?.length ? files : undefined);
                }}
                onBlur={onBlur}
                required={!isEdit && !value}
                className="p-0 file:mr-2.5 file:h-9 file:bg-primary file:px-2.5 file:py-0"
              />
            </div>
          )}
        />
        <FieldError errors={form.formState.errors.coverImage ? [form.formState.errors.coverImage] : undefined} />
      </Field>
      <Field>
        <FieldLabel htmlFor="galleryImages">Gallery Images</FieldLabel>
        <Controller
          name="galleryImages"
          control={form.control}
          render={({ field: { value, onChange, onBlur, ref } }) => (
            <div className="space-y-2">
              {galleryPreviewUrls.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {galleryPreviewUrls.map((url, i) => (
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
                onChange={(e) => {
                  const files = e.target.files;
                  onChange(files?.length ? files : undefined);
                }}
                onBlur={onBlur}
                required={!isEdit && (!value || (Array.isArray(value) && value.length === 0))}
                className="p-0 file:mr-2.5 file:h-9 file:bg-primary file:px-2.5 file:py-0"
              />
            </div>
          )}
        />
        <FieldError errors={form.formState.errors.galleryImages ? [form.formState.errors.galleryImages] : undefined} />
      </Field>
    </div>
  );
}

export function ProjectFormStepSeoLinks({ form }: StepProps) {
  return (
    <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
      <Field className="md:col-span-2">
        <FieldLabel htmlFor="seoTitle">SEO Title</FieldLabel>
        <Input required type="text" id="seoTitle" placeholder="SEO Title" {...form.register("seoTitle")} />
        <FieldError errors={form.formState.errors.seoTitle ? [form.formState.errors.seoTitle] : undefined} />
      </Field>
      <Field className="md:col-span-2">
        <FieldLabel htmlFor="seoDescription">SEO Description</FieldLabel>
        <Textarea required id="seoDescription" placeholder="SEO Description" {...form.register("seoDescription")} />
        <FieldError
          errors={form.formState.errors.seoDescription ? [form.formState.errors.seoDescription] : undefined}
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="repositoryUrl">Repository URL</FieldLabel>
        <Input
          required
          type="text"
          id="repositoryUrl"
          placeholder="Repository URL"
          {...form.register("repositoryUrl")}
        />
        <FieldError errors={form.formState.errors.repositoryUrl ? [form.formState.errors.repositoryUrl] : undefined} />
      </Field>
      <Field>
        <FieldLabel htmlFor="demoUrl">Demo URL</FieldLabel>
        <Input required type="text" id="demoUrl" placeholder="Demo URL" {...form.register("demoUrl")} />
        <FieldError errors={form.formState.errors.demoUrl ? [form.formState.errors.demoUrl] : undefined} />
      </Field>
      <Field>
        <FieldLabel htmlFor="featured">Featured</FieldLabel>
        <Controller
          name="featured"
          control={form.control}
          render={({ field }) => <Switch id="featured" checked={field.value} onCheckedChange={field.onChange} />}
        />
        <FieldError errors={form.formState.errors.featured ? [form.formState.errors.featured] : undefined} />
      </Field>
      <Field>
        <FieldLabel htmlFor="published">Published</FieldLabel>
        <Controller
          name="published"
          control={form.control}
          render={({ field }) => <Switch id="published" checked={field.value} onCheckedChange={field.onChange} />}
        />
        <FieldError errors={form.formState.errors.published ? [form.formState.errors.published] : undefined} />
      </Field>
    </div>
  );
}
