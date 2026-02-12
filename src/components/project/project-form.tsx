import { zodResolver } from "@hookform/resolvers/zod";
import MDEditor from "@uiw/react-md-editor";
import { Loader2, Plus, Trash } from "lucide-react";
import type { Resolver, UseFormReturn } from "react-hook-form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useTheme } from "@/components/theme-provider";
import { type Project, projectSchema } from "@/lib/schema";
import type { GetApiProjectsByIdApiResponse } from "@/store/services/apis";
import { usePostApiProjectsMutation, usePutApiProjectsByIdMutation } from "@/store/services/apis";
import { Button } from "../ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import ImageUploader from "../ui/image-uploader";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";

type ApiProject = GetApiProjectsByIdApiResponse["data"];
type MarkdownFieldName =
  | "problem"
  | "context"
  | "strategy"
  | "architecture"
  | "execution"
  | "challenges"
  | "solution"
  | "measurableImpact";
type StringArrayFieldName = "techStack" | "infrastructure" | "integrations" | "galleryImages" | "keywords";
type MetricsObject = Record<string, string | number | boolean | null>;

function projectToFormValues(project: ApiProject | null | undefined): Partial<Project> {
  if (!project)
    return {
      slug: "",
      title: "",
      tagline: "",
      industry: null,
      projectType: null,
      status: null,
      role: "",
      engagementModel: null,
      teamSize: null,
      durationInMonths: null,
      problem: "",
      context: null,
      strategy: "",
      architecture: "",
      execution: "",
      challenges: null,
      solution: "",
      measurableImpact: "",
      metrics: "{}",
      techStack: [],
      infrastructure: [],
      integrations: [],
      coverImage: "",
      galleryImages: [],
      demoUrl: null,
      repositoryUrl: null,
      seoTitle: null,
      seoDescription: null,
      keywords: [],
      featured: false,
      published: false,
    };
  return {
    slug: project.slug,
    title: project.title,
    tagline: project.tagline ?? "",
    industry: project.industry,
    projectType: project.projectType,
    status: project.status,
    role: project.role,
    engagementModel: project.engagementModel,
    teamSize: project.teamSize,
    durationInMonths: project.durationInMonths,
    problem: project.problem,
    context: project.context,
    strategy: project.strategy,
    architecture: project.architecture,
    execution: project.execution,
    challenges: project.challenges,
    solution: project.solution,
    measurableImpact: project.measurableImpact,
    metrics: typeof project.metrics === "object" && project.metrics !== null ? JSON.stringify(project.metrics) : "{}",
    techStack: project.techStack ?? [],
    infrastructure: project.infrastructure ?? [],
    integrations: project.integrations ?? [],
    coverImage: project.coverImage,
    galleryImages: project.galleryImages ?? [],
    demoUrl: project.demoUrl,
    repositoryUrl: project.repositoryUrl,
    seoTitle: project.seoTitle,
    seoDescription: project.seoDescription,
    keywords: project.keywords ?? [],
    featured: project.featured,
    published: project.published,
  };
}

function formValuesToBody(values: Project) {
  const metrics = parseMetricsString(values.metrics);
  const safeMetrics = metrics.value ?? {};
  return {
    slug: values.slug,
    title: values.title,
    tagline: values.tagline,
    industry: nullableString(values.industry),
    projectType: nullableString(values.projectType),
    status: nullableString(values.status),
    role: values.role,
    engagementModel: nullableString(values.engagementModel),
    teamSize: values.teamSize,
    durationInMonths: values.durationInMonths,
    problem: values.problem,
    context: nullableString(values.context),
    strategy: values.strategy,
    architecture: values.architecture,
    execution: values.execution,
    challenges: nullableString(values.challenges),
    solution: values.solution,
    measurableImpact: values.measurableImpact,
    metrics: safeMetrics,
    techStack: cleanStringArray(values.techStack),
    infrastructure: cleanStringArray(values.infrastructure),
    integrations: cleanStringArray(values.integrations),
    coverImage: values.coverImage,
    galleryImages: cleanStringArray(values.galleryImages),
    demoUrl: nullableString(values.demoUrl),
    repositoryUrl: nullableString(values.repositoryUrl),
    seoTitle: nullableString(values.seoTitle),
    seoDescription: nullableString(values.seoDescription),
    keywords: cleanStringArray(values.keywords),
    featured: values.featured,
    published: values.published,
  };
}

function cleanStringArray(values: string[] | null | undefined): string[] {
  if (!values) return [];
  return values.map((value) => value.trim()).filter((value) => value.length > 0);
}

function nullableString(value: string | null | undefined): string | null {
  if (!value) return null;
  return value.trim().length > 0 ? value : null;
}

function parseMetricsString(value: string | null | undefined): { value: MetricsObject | null; error: string | null } {
  const normalizedValue = value?.trim().length ? value : "{}";
  try {
    const parsedValue = JSON.parse(normalizedValue);
    if (parsedValue === null || typeof parsedValue !== "object" || Array.isArray(parsedValue)) {
      return { value: null, error: "Metrics must be a valid JSON object." };
    }
    return { value: parsedValue as MetricsObject, error: null };
  } catch {
    return { value: null, error: "Metrics must be valid JSON." };
  }
}

interface MarkdownFieldProps {
  form: UseFormReturn<Project>;
  name: MarkdownFieldName;
  label: string;
  placeholder: string;
  optional?: boolean;
  colorMode: "dark" | "light";
}

const MarkdownField = ({ form, name, label, placeholder, optional, colorMode }: MarkdownFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{optional ? `${label} (optional)` : label}</FormLabel>
          <FormControl>
            <div data-color-mode={colorMode}>
              <MDEditor
                value={field.value ?? ""}
                onChange={(value) => field.onChange(value ?? "")}
                preview="edit"
                visibleDragbar={false}
                height={240}
                textareaProps={{ placeholder }}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

interface StringArrayFieldProps {
  form: UseFormReturn<Project>;
  name: StringArrayFieldName;
  label: string;
  placeholder: string;
  inputType?: "text" | "url";
}

const StringArrayField = ({ form, name, label, placeholder, inputType = "text" }: StringArrayFieldProps) => {
  const values = form.watch(name) ?? [];

  const appendValue = () => {
    form.setValue(name, [...values, ""], { shouldDirty: true, shouldValidate: true });
  };

  const updateValueAt = (index: number, value: string) => {
    const nextValues = [...values];
    nextValues[index] = value;
    form.setValue(name, nextValues, { shouldDirty: true, shouldValidate: true });
  };

  const removeValueAt = (index: number) => {
    const nextValues = values.filter((_, itemIndex) => itemIndex !== index);
    form.setValue(name, nextValues, { shouldDirty: true, shouldValidate: true });
  };

  return (
    <div>
      <Label className="mb-2 flex items-center gap-2">
        {label}
        <Button type="button" variant="outline" size="icon" onClick={appendValue}>
          <Plus className="size-4" />
        </Button>
      </Label>
      {values.length === 0 && <p className="text-muted-foreground text-sm">No entries yet.</p>}
      {values.map((value, index) => (
        <div key={`${name}-${index}`} className="flex gap-2 py-1">
          <Input
            type={inputType}
            value={value}
            onChange={(event) => updateValueAt(index, event.target.value)}
            placeholder={placeholder}
            className="flex-1"
          />
          <Button type="button" variant="destructive" size="icon" onClick={() => removeValueAt(index)}>
            <Trash className="size-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};

interface ProjectFormProps {
  project?: ApiProject | null;
}

const ProjectForm = ({ project }: ProjectFormProps) => {
  const { theme } = useTheme();
  const form = useForm<Project>({
    resolver: zodResolver(projectSchema) as Resolver<Project>,
    defaultValues: projectToFormValues(project),
  });
  const [addProject, { isLoading: adding }] = usePostApiProjectsMutation();
  const [editProject, { isLoading: editing }] = usePutApiProjectsByIdMutation();
  const systemDarkMode =
    typeof window !== "undefined" ? window.matchMedia("(prefers-color-scheme: dark)").matches : false;
  const editorColorMode = theme === "system" ? (systemDarkMode ? "dark" : "light") : theme;

  const onSubmit = async (values: Project) => {
    const parsedMetrics = parseMetricsString(values.metrics);
    if (!parsedMetrics.value) {
      form.setError("metrics", { type: "validate", message: parsedMetrics.error ?? "Metrics must be valid JSON." });
      toast.error(parsedMetrics.error ?? "Metrics must be valid JSON.");
      return;
    }
    form.clearErrors("metrics");
    const body = formValuesToBody(values);
    if (project) {
      const response = await editProject({ id: `${project.id}`, body });
      if (response.error) toast.error("Failed to update project.");
      else toast.success("Project updated successfully.");
    } else {
      const response = await addProject({ body });
      if (response.error) toast.error("Failed to create project.");
      else toast.success("Project created successfully.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative flex w-full flex-col gap-6">
        <div className="grid gap-6">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Project title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="project-slug" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tagline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tagline</FormLabel>
                  <FormControl>
                    <Input placeholder="Short tagline" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Input placeholder="Your role" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry (optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Industry"
                      value={field.value ?? ""}
                      onChange={(event) => field.onChange(event.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="projectType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Type (optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. SaaS platform"
                      value={field.value ?? ""}
                      onChange={(event) => field.onChange(event.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status (optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Completed"
                      value={field.value ?? ""}
                      onChange={(event) => field.onChange(event.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="engagementModel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Engagement Model (optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Contract"
                      value={field.value ?? ""}
                      onChange={(event) => field.onChange(event.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="teamSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team Size (optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      step={1}
                      value={field.value ?? ""}
                      onChange={(event) => {
                        const value = event.target.value;
                        if (value === "") {
                          field.onChange(null);
                          return;
                        }
                        const parsedValue = Number(value);
                        field.onChange(Number.isNaN(parsedValue) ? null : parsedValue);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="durationInMonths"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration in Months (optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      step={1}
                      value={field.value ?? ""}
                      onChange={(event) => {
                        const value = event.target.value;
                        if (value === "") {
                          field.onChange(null);
                          return;
                        }
                        const parsedValue = Number(value);
                        field.onChange(Number.isNaN(parsedValue) ? null : parsedValue);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="demoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Demo URL (optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://demo.example.com"
                      value={field.value ?? ""}
                      onChange={(event) => field.onChange(event.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="repositoryUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repository URL (optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://github.com/org/repo"
                      value={field.value ?? ""}
                      onChange={(event) => field.onChange(event.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="seoTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SEO Title (optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="SEO page title"
                      value={field.value ?? ""}
                      onChange={(event) => field.onChange(event.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="seoDescription"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>SEO Description (optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="SEO page description"
                      value={field.value ?? ""}
                      onChange={(event) => field.onChange(event.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <MarkdownField
            form={form}
            name="problem"
            label="Problem"
            placeholder="Describe the project problem statement..."
            colorMode={editorColorMode}
          />
          <MarkdownField
            form={form}
            name="context"
            label="Context"
            placeholder="Provide project context..."
            optional
            colorMode={editorColorMode}
          />
          <MarkdownField
            form={form}
            name="strategy"
            label="Strategy"
            placeholder="Describe your strategy..."
            colorMode={editorColorMode}
          />
          <MarkdownField
            form={form}
            name="architecture"
            label="Architecture"
            placeholder="Describe architecture decisions..."
            colorMode={editorColorMode}
          />
          <MarkdownField
            form={form}
            name="execution"
            label="Execution"
            placeholder="Describe how execution happened..."
            colorMode={editorColorMode}
          />
          <MarkdownField
            form={form}
            name="challenges"
            label="Challenges"
            placeholder="Describe key challenges..."
            optional
            colorMode={editorColorMode}
          />
          <MarkdownField
            form={form}
            name="solution"
            label="Solution"
            placeholder="Describe the delivered solution..."
            colorMode={editorColorMode}
          />
          <MarkdownField
            form={form}
            name="measurableImpact"
            label="Measurable Impact"
            placeholder="Share measurable outcomes..."
            colorMode={editorColorMode}
          />

          <FormField
            control={form.control}
            name="metrics"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Metrics JSON</FormLabel>
                <FormControl>
                  <Textarea
                    className="font-mono text-sm"
                    rows={8}
                    placeholder='{"revenueGrowth": 25, "nps": 67}'
                    value={field.value ?? "{}"}
                    onChange={(event) => field.onChange(event.target.value)}
                    onBlur={(event) => {
                      field.onBlur();
                      const parsedMetrics = parseMetricsString(event.target.value);
                      if (!parsedMetrics.value) {
                        form.setError("metrics", {
                          type: "validate",
                          message: parsedMetrics.error ?? "Metrics must be valid JSON.",
                        });
                        return;
                      }
                      form.clearErrors("metrics");
                    }}
                  />
                </FormControl>
                <FormDescription>Must be a JSON object (not an array). Example: {`{"users": 1200}`}.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coverImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cover Image URL</FormLabel>
                <FormControl>
                  <Input type="url" placeholder="https://..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Label className="mb-2 block">Cover Image Upload</Label>
            <ImageUploader
              image={form.watch("coverImage")}
              setValue={(_, value) => form.setValue("coverImage", value, { shouldDirty: true, shouldValidate: true })}
              multiple={false}
            />
          </div>

          <StringArrayField form={form} name="techStack" label="Tech Stack" placeholder="Type a technology" />
          <StringArrayField
            form={form}
            name="infrastructure"
            label="Infrastructure"
            placeholder="Type an infra component"
          />
          <StringArrayField
            form={form}
            name="integrations"
            label="Integrations"
            placeholder="Type an integration name"
          />
          <StringArrayField
            form={form}
            name="galleryImages"
            label="Gallery Images"
            placeholder="https://..."
            inputType="url"
          />
          <div>
            <Label className="mb-2 block">Gallery Image Upload</Label>
            <ImageUploader
              images={form.watch("galleryImages")}
              setImages={(images) =>
                form.setValue("galleryImages", images, { shouldDirty: true, shouldValidate: true })
              }
              multiple
            />
          </div>
          <StringArrayField form={form} name="keywords" label="Keywords" placeholder="Type a keyword" />

          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="featured"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel className="!mt-0">Featured</FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="published"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel className="!mt-0">Published</FormLabel>
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 border-t pt-4">
          <Button type="submit" disabled={adding || editing}>
            {adding || editing ? (
              <>
                <Loader2 className="animate-spin" />
                Please wait...
              </>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProjectForm;
