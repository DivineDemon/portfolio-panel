import type {
  ProjectMetricValue,
  WorkflowBasicsFormValues,
  WorkflowPublishFormValues,
  WorkflowStoryFormValues,
} from "@/lib/form-schemas";
import { parseWorkflowJsonString } from "@/lib/workflow-json";
import type { GetApiN8NWorkflowsByIdApiResponse, PostApiN8NWorkflowsApiArg } from "@/store/services/apis";

export { slugifyTitle } from "@/lib/project-form-steps";

function toStr(arr: string[] | undefined): string {
  return Array.isArray(arr) ? arr.join(", ") : "";
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

export type WorkflowStepData = {
  basics?: WorkflowBasicsFormValues;
  story?: WorkflowStoryFormValues;
  publish?: WorkflowPublishFormValues;
};

export type FullWorkflowStepData = {
  basics: WorkflowBasicsFormValues;
  story: WorkflowStoryFormValues;
  publish: WorkflowPublishFormValues;
};

export function workflowResponseToStepData(workflow: GetApiN8NWorkflowsByIdApiResponse): WorkflowStepData {
  const d = workflow.data;

  return {
    basics: {
      slug: d.slug ?? "",
      title: d.title ?? "",
      headlineResult: d.headlineResult ?? "",
      clientId: d.clientId ?? "",
      integrations: toStr(d.integrations),
      coverImage: d.coverImage ?? undefined,
    },
    story: {
      problem: d.problem ?? "",
      approach: d.approach ?? "",
      results: d.results ?? "",
      metrics: serializeMetrics(d.metrics),
    },
    publish: {
      workflowJson: JSON.stringify(d.workflowJson ?? { nodes: [], connections: {} }, null, 2),
      seoTitle: d.seoTitle ?? "",
      seoDescription: d.seoDescription ?? "",
      keywords: toStr(d.keywords),
      cardOutcome: d.cardOutcome ?? "",
      displayOrder: d.displayOrder ?? "",
      featured: d.featured ?? false,
      published: d.published ?? false,
    },
  };
}

export function mergeWorkflowStepDataToApiBody(data: FullWorkflowStepData): PostApiN8NWorkflowsApiArg["body"] {
  const displayOrder =
    data.publish.displayOrder === "" || data.publish.displayOrder === undefined
      ? null
      : Number(data.publish.displayOrder);
  const clientId =
    data.basics.clientId === "" || data.basics.clientId === undefined ? null : Number(data.basics.clientId);

  return {
    slug: data.basics.slug,
    title: data.basics.title,
    headlineResult: data.basics.headlineResult,
    problem: data.story.problem,
    approach: data.story.approach,
    results: data.story.results,
    workflowJson: parseWorkflowJsonString(data.publish.workflowJson),
    integrations: stringToArray(
      typeof data.basics.integrations === "string" ? data.basics.integrations : data.basics.integrations?.join(", "),
    ),
    metrics: parseMetrics(
      typeof data.story.metrics === "string" ? data.story.metrics : JSON.stringify(data.story.metrics ?? {}),
    ),
    coverImage: typeof data.basics.coverImage === "string" ? data.basics.coverImage : "",
    clientId,
    cardOutcome: data.publish.cardOutcome || null,
    displayOrder,
    seoTitle: data.publish.seoTitle || null,
    seoDescription: data.publish.seoDescription || null,
    keywords: stringToArray(
      typeof data.publish.keywords === "string" ? data.publish.keywords : data.publish.keywords?.join(", "),
    ),
    featured: data.publish.featured,
    published: data.publish.published,
  };
}
