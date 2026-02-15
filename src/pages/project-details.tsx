import { zodResolver } from "@hookform/resolvers/zod";
import { type Resolver, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { ProjectFormStepper } from "@/components/project/project-form-stepper";
import { type ProjectFormOutputValues, type ProjectFormValues, projectFormSchema } from "@/lib/form-schemas";
import { resolveProjectFormImages } from "@/lib/utils";
import {
  type PutApiProjectsByIdApiArg,
  useGetApiProjectsByIdQuery,
  usePutApiProjectsByIdMutation,
} from "@/store/services/apis";

function projectToDefaultValues(project: NonNullable<ReturnType<typeof useGetApiProjectsByIdQuery>["data"]>) {
  const rawMetrics = project.data.metrics ?? {};
  const metricsObj = Object.fromEntries(
    Object.entries(rawMetrics).filter((entry): entry is [string, string | number | boolean] => entry[1] != null),
  ) as Record<string, string | number | boolean>;

  const toStr = (arr: string[] | undefined) => (Array.isArray(arr) ? arr.join(", ") : "");

  return {
    metrics: JSON.stringify(metricsObj),
    slug: project.data.slug ?? "",
    role: project.data.role ?? "",
    title: project.data.title ?? "",
    status: project.data.status ?? "",
    tagline: project.data.tagline ?? "",
    problem: project.data.problem ?? "",
    context: project.data.context ?? "",
    demoUrl: project.data.demoUrl ?? "",
    teamSize: project.data.teamSize ?? 1,
    strategy: project.data.strategy ?? "",
    industry: project.data.industry ?? "",
    solution: project.data.solution ?? "",
    seoTitle: project.data.seoTitle ?? "",
    keywords: toStr(project.data.keywords),
    execution: project.data.execution ?? "",
    techStack: toStr(project.data.techStack),
    featured: project.data.featured ?? false,
    coverImage: project.data.coverImage ?? "",
    challenges: project.data.challenges ?? "",
    published: project.data.published ?? false,
    projectType: project.data.projectType ?? "",
    integrations: toStr(project.data.integrations),
    architecture: project.data.architecture ?? "",
    repositoryUrl: project.data.repositoryUrl ?? "",
    galleryImages: project.data.galleryImages ?? [],
    infrastructure: toStr(project.data.infrastructure),
    seoDescription: project.data.seoDescription ?? "",
    engagementModel: project.data.engagementModel ?? "",
    durationInMonths: project.data.durationInMonths ?? 1,
    measurableImpact: project.data.measurableImpact ?? "",
  } satisfies ProjectFormValues;
}

function formValuesToApiBody(
  data: ProjectFormOutputValues,
  resolved: { coverImage: string | undefined; galleryImages: string[] },
): PutApiProjectsByIdApiArg["body"] {
  const { metrics: _metrics, coverImage: _cover, galleryImages: _gallery, ...rest } = data;
  return {
    ...rest,
    coverImage: resolved.coverImage,
    galleryImages: resolved.galleryImages,
  };
}

function ProjectDetailsForm({
  project,
}: {
  project: NonNullable<ReturnType<typeof useGetApiProjectsByIdQuery>["data"]>;
}) {
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema) as unknown as Resolver<ProjectFormValues>,
    defaultValues: projectToDefaultValues(project),
  });

  const [updateProject, { isLoading }] = usePutApiProjectsByIdMutation();

  const onSubmit = async (data: ProjectFormOutputValues) => {
    const resolved = await resolveProjectFormImages(data);
    const response = await updateProject({
      id: project.data.id,
      body: formValuesToApiBody(data, resolved),
    });

    if (response.error) {
      // @ts-expect-error - response.error.data.message is not typed
      toast.error(response.error.data.message ?? "Something went wrong");
    } else {
      toast.success("Project updated successfully!");
    }
  };

  return (
    <ProjectFormStepper form={form} onSubmit={onSubmit} submitLabel="Update Project" isSubmitting={isLoading} isEdit />
  );
}

const ProjectDetails = () => {
  const { id } = useParams();
  const { data: project } = useGetApiProjectsByIdQuery(
    { id: id ?? "" },
    {
      skip: !id,
      refetchOnMountOrArgChange: true,
    },
  );

  if (!project) {
    return null;
  }

  return <ProjectDetailsForm project={project} />;
};

export default ProjectDetails;
