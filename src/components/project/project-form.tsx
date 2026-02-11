import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, Trash } from "lucide-react";
import type { Resolver } from "react-hook-form";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { type Project, projectSchema } from "@/lib/schema";
import type { GetApiProjectsByIdApiResponse } from "@/store/services/apis";
import { usePostApiProjectsMutation, usePutApiProjectsByIdMutation } from "@/store/services/apis";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import ImageUploader from "../ui/image-uploader";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";

type ApiProject = GetApiProjectsByIdApiResponse["data"];

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
  return {
    slug: values.slug,
    title: values.title,
    tagline: values.tagline,
    industry: values.industry || null,
    projectType: values.projectType || null,
    status: values.status || null,
    role: values.role,
    engagementModel: values.engagementModel || null,
    teamSize: values.teamSize,
    durationInMonths: values.durationInMonths,
    problem: values.problem,
    context: values.context || null,
    strategy: values.strategy,
    architecture: values.architecture,
    execution: values.execution,
    challenges: values.challenges || null,
    solution: values.solution,
    measurableImpact: values.measurableImpact,
    metrics: (() => {
      try {
        return typeof values.metrics === "string" ? JSON.parse(values.metrics || "{}") : (values.metrics ?? {});
      } catch {
        return {};
      }
    })(),
    techStack: values.techStack,
    infrastructure: values.infrastructure,
    integrations: values.integrations,
    coverImage: values.coverImage,
    galleryImages: values.galleryImages,
    demoUrl: values.demoUrl && values.demoUrl !== "" ? values.demoUrl : null,
    repositoryUrl: values.repositoryUrl && values.repositoryUrl !== "" ? values.repositoryUrl : null,
    seoTitle: values.seoTitle || null,
    seoDescription: values.seoDescription || null,
    keywords: values.keywords,
    featured: values.featured,
    published: values.published,
  };
}

interface ProjectFormProps {
  project?: ApiProject | null;
}

const ProjectForm = ({ project }: ProjectFormProps) => {
  const form = useForm<Project>({
    resolver: zodResolver(projectSchema) as Resolver<Project>,
    defaultValues: projectToFormValues(project),
  });
  const [addProject, { isLoading: adding }] = usePostApiProjectsMutation();
  const [editProject, { isLoading: editing }] = usePutApiProjectsByIdMutation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const techStack = useFieldArray({ control: form.control as any, name: "techStack" });

  const onSubmit = async (values: Project) => {
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative flex flex-col gap-6">
        <div className="flex flex-col gap-4">
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
                  <Input placeholder="Industry" {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="problem"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Problem</FormLabel>
                <FormControl>
                  <Textarea placeholder="Problem statement" {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="strategy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Strategy</FormLabel>
                <FormControl>
                  <Textarea placeholder="Strategy" {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="architecture"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Architecture</FormLabel>
                <FormControl>
                  <Textarea placeholder="Architecture" {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="execution"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Execution</FormLabel>
                <FormControl>
                  <Textarea placeholder="Execution" {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="solution"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Solution</FormLabel>
                <FormControl>
                  <Textarea placeholder="Solution" {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="measurableImpact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Measurable Impact</FormLabel>
                <FormControl>
                  <Textarea placeholder="Measurable impact" {...field} value={field.value ?? ""} />
                </FormControl>
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
                  <Input placeholder="https://..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Label className="mb-2 block">Cover Image preview</Label>
            <ImageUploader
              image={form.watch("coverImage")}
              setValue={(_, value) => form.setValue("coverImage", value)}
              multiple={false}
            />
          </div>
          <div>
            <Label className="mb-2 flex items-center gap-2">
              Tech stack
              <Button type="button" variant="outline" size="icon" onClick={() => techStack.append("")}>
                <Plus className="size-4" />
              </Button>
            </Label>
            {techStack.fields.map((_, idx) => (
              <div key={techStack.fields[idx]?.id} className="flex gap-2 py-1">
                <Input {...form.register(`techStack.${idx}`)} placeholder="Tech item" className="flex-1" />
                <Button type="button" variant="destructive" size="icon" onClick={() => techStack.remove(idx)}>
                  <Trash className="size-4" />
                </Button>
              </div>
            ))}
          </div>
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
