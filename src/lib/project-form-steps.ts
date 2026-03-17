import type { BasicsFormValues, SeoLinksFormValues, StoryFormValues, TechMediaFormValues } from "@/lib/form-schemas";
import type { GetApiProjectsByIdApiResponse, PostApiProjectsApiArg } from "@/store/services/apis";

function toStr(arr: string[] | undefined): string {
  return Array.isArray(arr) ? arr.join(", ") : "";
}

/** Convert API project response to StepData for edit prefill. */
export function projectResponseToStepData(project: GetApiProjectsByIdApiResponse): StepData {
  const d = project.data;
  const rawMetrics = d.metrics ?? {};
  const metricsObj = Object.fromEntries(
    Object.entries(rawMetrics).filter((entry): entry is [string, string | number | boolean] => entry[1] != null),
  );

  return {
    basics: {
      slug: d.slug ?? "",
      title: d.title ?? "",
      tagline: d.tagline ?? "",
      industry: d.industry ?? "",
      projectType: d.projectType ?? "",
      status: d.status ?? "",
      role: d.role ?? "",
      engagementModel: d.engagementModel ?? "",
      teamSize: Number(d.teamSize) || 1,
      durationInMonths: Number(d.durationInMonths) || 1,
    },
    story: {
      problem: d.problem ?? "",
      context: d.context ?? "",
      strategy: d.strategy ?? "",
      architecture: d.architecture ?? "",
      execution: d.execution ?? "",
      challenges: d.challenges ?? "",
      solution: d.solution ?? "",
      measurableImpact: d.measurableImpact ?? "",
      metrics: JSON.stringify(metricsObj),
    },
    tech: {
      keywords: toStr(d.keywords),
      techStack: toStr(d.techStack),
      infrastructure: toStr(d.infrastructure),
      integrations: toStr(d.integrations),
      coverImage: d.coverImage ?? undefined,
      galleryImages: d.galleryImages ?? [],
    },
    seo: {
      seoTitle: d.seoTitle ?? "",
      seoDescription: d.seoDescription ?? "",
      repositoryUrl: d.repositoryUrl ?? "",
      demoUrl: d.demoUrl ?? "",
      featured: d.featured ?? false,
      published: d.published ?? false,
    },
  };
}

/** Manager state: submissions from each step form (parent holds this). */
export type StepData = {
  basics?: BasicsFormValues;
  story?: StoryFormValues;
  tech?: TechMediaFormValues;
  seo?: SeoLinksFormValues;
};

/** All four steps required for final submit. */
export type FullStepData = {
  basics: BasicsFormValues;
  story: StoryFormValues;
  tech: TechMediaFormValues;
  seo: SeoLinksFormValues;
};

function stringToArray(v: string | string[] | undefined): string[] {
  if (Array.isArray(v)) return v;
  if (typeof v === "string" && v.trim())
    return v
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  return [];
}

function parseMetrics(s: string | undefined): Record<string, string | number | boolean | null> {
  const t = (s ?? "").trim();
  if (!t) return {};
  try {
    const p = JSON.parse(t) as Record<string, unknown>;
    const out: Record<string, string | number | boolean | null> = {};
    for (const [k, v] of Object.entries(p)) {
      if (v === null || v === undefined) continue;
      if (typeof v === "string" || typeof v === "number" || typeof v === "boolean") out[k] = v;
    }
    return out;
  } catch {
    return {};
  }
}

/**
 * Merges step form data into the API body shape. Assumes step 3 already resolved images to URLs.
 */
export async function mergeStepDataToApiBody(data: FullStepData): Promise<PostApiProjectsApiArg["body"]> {
  return {
    slug: data.basics.slug,
    title: data.basics.title,
    tagline: data.basics.tagline,
    industry: data.basics.industry || null,
    projectType: data.basics.projectType || null,
    status: data.basics.status || null,
    role: data.basics.role,
    engagementModel: data.basics.engagementModel || null,
    teamSize: data.basics.teamSize ?? null,
    durationInMonths: data.basics.durationInMonths ?? null,
    problem: data.story.problem,
    context: data.story.context || null,
    strategy: data.story.strategy,
    architecture: data.story.architecture,
    execution: data.story.execution,
    challenges: data.story.challenges || null,
    solution: data.story.solution,
    measurableImpact: data.story.measurableImpact,
    metrics: parseMetrics(
      typeof data.story.metrics === "string" ? data.story.metrics : JSON.stringify(data.story.metrics ?? {}),
    ),
    keywords: stringToArray(data.tech.keywords),
    techStack: stringToArray(data.tech.techStack),
    infrastructure: stringToArray(data.tech.infrastructure),
    integrations: stringToArray(data.tech.integrations),
    coverImage: typeof data.tech.coverImage === "string" ? data.tech.coverImage : "",
    galleryImages: Array.isArray(data.tech.galleryImages)
      ? data.tech.galleryImages.filter((v): v is string => typeof v === "string" && v.length > 0)
      : [],
    demoUrl: data.seo.demoUrl || null,
    repositoryUrl: data.seo.repositoryUrl || null,
    seoTitle: data.seo.seoTitle || null,
    seoDescription: data.seo.seoDescription || null,
    featured: data.seo.featured,
    published: data.seo.published,
  };
}
