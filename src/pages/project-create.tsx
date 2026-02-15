import { zodResolver } from "@hookform/resolvers/zod";
import { type Resolver, useForm } from "react-hook-form";
import { toast } from "sonner";
import { ProjectFormStepper } from "@/components/project/project-form-stepper";
import { type ProjectFormOutputValues, type ProjectFormValues, projectFormSchema } from "@/lib/form-schemas";
import { resolveProjectFormImages } from "@/lib/utils";
import { usePostApiProjectsMutation } from "@/store/services/apis";

const defaultValues: ProjectFormValues = {
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
  problem: "",
  context: "",
  strategy: "",
  architecture: "",
  execution: "",
  challenges: "",
  solution: "",
  measurableImpact: "",
  metrics: "{}",
  keywords: "",
  techStack: "",
  infrastructure: "",
  integrations: "",
  coverImage: "",
  galleryImages: [],
  seoTitle: "",
  seoDescription: "",
  repositoryUrl: "",
  demoUrl: "",
  featured: false,
  published: false,
};

const ProjectCreate = () => {
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema) as unknown as Resolver<ProjectFormValues>,
    defaultValues,
  });

  const [postProject, { isLoading }] = usePostApiProjectsMutation();

  const onSubmit = async (data: ProjectFormOutputValues) => {
    const { metrics: _m, ...rest } = data;
    const resolved = await resolveProjectFormImages(data);
    const body = {
      ...rest,
      coverImage: resolved.coverImage ?? "",
      galleryImages: resolved.galleryImages,
    } as Parameters<typeof postProject>[0]["body"];

    const response = await postProject({ body });

    if (response.error) {
      // @ts-expect-error - response.error.data.message is not typed
      toast.error(response.error.data.message ?? "Something went wrong");
    } else {
      toast.success("Project created successfully!");
    }
  };

  return (
    <ProjectFormStepper
      form={form}
      onSubmit={onSubmit}
      submitLabel="Create Project"
      isSubmitting={isLoading}
      isEdit={false}
    />
  );
};

export default ProjectCreate;
