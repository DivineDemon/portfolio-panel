import type {
  BasicsFormValues,
  ProjectMetricValue,
  SeoLinksFormValues,
  StoryFormValues,
  TechMediaFormValues,
} from "@/lib/form-schemas";
import type { GetApiProjectsByIdApiResponse, PostApiProjectsApiArg } from "@/store/services/apis";

function toStr(arr: string[] | undefined): string {
  return Array.isArray(arr) ? arr.join(", ") : "";
}

export function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function isMetricValue(value: unknown): value is ProjectMetricValue {
  if (value === null) return true;
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return true;
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function serializeMetrics(metrics: Record<string, unknown> | null | undefined): string {
  const rawMetrics = metrics ?? {};
  const metricsObj = Object.fromEntries(
    Object.entries(rawMetrics).filter((entry): entry is [string, ProjectMetricValue] => isMetricValue(entry[1])),
  );
  return JSON.stringify(metricsObj);
}

export function projectResponseToStepData(project: GetApiProjectsByIdApiResponse): StepData {
  const d = project.data;

  return {
    basics: {
      slug: d.slug ?? "",
      title: d.title ?? "",
      headlineResult: d.headlineResult ?? "",
      industry: d.industry ?? "",
      role: d.role ?? "",
      teamSize: Number(d.teamSize) || 1,
      durationInMonths: Number(d.durationInMonths) || 1,
      engagementType: (d.engagementType ?? "") as BasicsFormValues["engagementType"],
      clientId: d.clientId ?? "",
      isLive: d.isLive ?? false,
      engagementModel: d.engagementModel ?? "",
    },
    story: {
      problem: d.problem ?? "",
      situation: d.situation ?? "",
      beforeAfter: d.beforeAfter ?? "",
      approach: d.approach ?? "",
      whatMadeThisHard: d.whatMadeThisHard ?? "",
      businessOutcome: d.businessOutcome ?? "",
      results: d.results ?? "",
      architecture: d.architecture ?? "",
      execution: d.execution ?? "",
      whatWeBuilt: d.whatWeBuilt ?? "",
      metrics: serializeMetrics(d.metrics),
    },
    tech: {
      keywords: toStr(d.keywords),
      techStack: toStr(d.techStack),
      infrastructure: toStr(d.infrastructure),
      integrations: toStr(d.integrations),
      coverImage: d.coverImage ?? undefined,
      galleryImages: d.galleryImages ?? [],
      galleryCaptions: (d.galleryCaptions ?? []).join("\n"),
    },
    seo: {
      seoTitle: d.seoTitle ?? "",
      seoDescription: d.seoDescription ?? "",
      repositoryUrl: d.repositoryUrl ?? "",
      demoUrl: d.demoUrl ?? "",
      cardOutcome: d.cardOutcome ?? "",
      displayOrder: d.displayOrder ?? "",
      featured: d.featured ?? false,
      published: d.published ?? false,
    },
  };
}

export type StepData = {
  basics?: BasicsFormValues;
  story?: StoryFormValues;
  tech?: TechMediaFormValues;
  seo?: SeoLinksFormValues;
};

export type FullStepData = {
  basics: BasicsFormValues;
  story: StoryFormValues;
  tech: TechMediaFormValues;
  seo: SeoLinksFormValues;
};

function stringToArray(v: string | string[] | undefined): string[] {
  if (Array.isArray(v)) return v;
  if (typeof v === "string" && v.trim()) {
    return v
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

function parseMetrics(s: string | undefined): Record<string, ProjectMetricValue> {
  const t = (s ?? "").trim();
  if (!t) return {};
  try {
    const p = JSON.parse(t) as Record<string, unknown>;
    const out: Record<string, ProjectMetricValue> = {};
    for (const [k, v] of Object.entries(p)) {
      if (isMetricValue(v)) out[k] = v;
    }
    return out;
  } catch {
    return {};
  }
}

export async function mergeStepDataToApiBody(data: FullStepData): Promise<PostApiProjectsApiArg["body"]> {
  const displayOrder =
    data.seo.displayOrder === "" || data.seo.displayOrder === undefined ? null : Number(data.seo.displayOrder);
  const clientId =
    data.basics.clientId === "" || data.basics.clientId === undefined ? null : Number(data.basics.clientId);

  return {
    slug: data.basics.slug,
    title: data.basics.title,
    headlineResult: data.basics.headlineResult,
    industry: data.basics.industry || null,
    role: data.basics.role,
    engagementModel: data.basics.engagementModel || null,
    teamSize: data.basics.teamSize ?? null,
    durationInMonths: data.basics.durationInMonths ?? null,
    engagementType: (data.basics.engagementType || null) as unknown as PostApiProjectsApiArg["body"]["engagementType"],
    clientId,
    isLive: data.basics.isLive,
    problem: data.story.problem,
    situation: data.story.situation || null,
    beforeAfter: data.story.beforeAfter || null,
    approach: data.story.approach,
    whatMadeThisHard: data.story.whatMadeThisHard || null,
    businessOutcome: data.story.businessOutcome || null,
    results: data.story.results,
    architecture: data.story.architecture,
    execution: data.story.execution,
    whatWeBuilt: data.story.whatWeBuilt,
    metrics: parseMetrics(
      typeof data.story.metrics === "string" ? data.story.metrics : JSON.stringify(data.story.metrics ?? {}),
    ),
    cardOutcome: data.seo.cardOutcome || null,
    displayOrder,
    keywords: stringToArray(data.tech.keywords),
    techStack: stringToArray(data.tech.techStack),
    infrastructure: stringToArray(data.tech.infrastructure),
    integrations: stringToArray(data.tech.integrations),
    coverImage: typeof data.tech.coverImage === "string" ? data.tech.coverImage : "",
    galleryImages: Array.isArray(data.tech.galleryImages)
      ? data.tech.galleryImages.filter((v): v is string => typeof v === "string" && v.length > 0)
      : [],
    galleryCaptions: Array.isArray(data.tech.galleryCaptions) ? data.tech.galleryCaptions : [],
    demoUrl: data.seo.demoUrl || null,
    repositoryUrl: data.seo.repositoryUrl || null,
    seoTitle: data.seo.seoTitle || null,
    seoDescription: data.seo.seoDescription || null,
    featured: data.seo.featured,
    published: data.seo.published,
  };
}
