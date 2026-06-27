import { z } from "zod";
import { workflowJsonStringSchema } from "@/lib/workflow-json";

export const loginSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

const stringToArray = z.union([z.string(), z.array(z.string())]).transform((v) =>
  Array.isArray(v)
    ? v
    : v === ""
      ? []
      : v
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
);

const engagementTypeValues = ["client-work", "founder-built", "open-source", "internal-tool"] as const;

function isValidMetricValue(value: unknown): boolean {
  if (value === null) return true;
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return true;
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

const metricsStringSchema = z.string().superRefine((val, ctx) => {
  const t = val.trim();
  if (t === "") {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Metrics is required (use {} for empty object)" });
    return;
  }
  try {
    const p = JSON.parse(t);
    if (Array.isArray(p)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Metrics must be a JSON object, not an array" });
      return;
    }
    if (typeof p !== "object" || p === null) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Metrics must be a JSON object" });
      return;
    }
    for (const [key, value] of Object.entries(p)) {
      if (!isValidMetricValue(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Invalid metric value for "${key}": must be string, number, boolean, null, or string array`,
        });
      }
    }
  } catch (e) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: e instanceof Error ? `Invalid JSON: ${e.message}` : "Invalid JSON",
    });
  }
});

const imageValueSchema = z.union([z.url(), z.literal(""), z.instanceof(FileList)]);

const galleryImagesSchema = z
  .union([z.instanceof(FileList), z.array(imageValueSchema)])
  .transform((value): (string | FileList)[] => {
    if (value instanceof FileList) {
      return [value];
    }
    return value.filter((v): v is string | FileList => v !== "");
  });

export const basicsFormSchema = z.object({
  slug: z.string().min(1, "Required"),
  title: z.string().min(1, "Required"),
  headlineResult: z.string().min(1, "Required"),
  industry: z.string().min(1, "Required"),
  role: z.string().min(1, "Required"),
  teamSize: z.coerce.number().min(1, "Required"),
  durationInMonths: z.coerce.number().min(1, "Required"),
  engagementType: z.union([z.enum(engagementTypeValues), z.literal("")]),
  clientId: z.union([z.coerce.number().int().positive(), z.literal("")]),
  isLive: z.boolean(),
  engagementModel: z.string().optional(),
});

export const storyFormSchema = z.object({
  problem: z.string().min(1, "Required"),
  situation: z.string().min(1, "Required"),
  beforeAfter: z.string().optional(),
  approach: z.string().min(1, "Required"),
  whatMadeThisHard: z.string().min(1, "Required"),
  businessOutcome: z.string().optional(),
  results: z.string().min(1, "Required"),
  architecture: z.string().min(1, "Required"),
  execution: z.string().min(1, "Required"),
  whatWeBuilt: z.string().min(1, "Required"),
  metrics: metricsStringSchema,
});

const galleryCaptionsSchema = z.union([z.string(), z.array(z.string())]).transform((value) => {
  if (Array.isArray(value)) return value;
  if (value === "") return [];
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
});

export const techMediaFormSchema = z.object({
  keywords: stringToArray,
  techStack: stringToArray,
  infrastructure: stringToArray,
  integrations: stringToArray,
  coverImage: imageValueSchema.optional(),
  galleryImages: galleryImagesSchema.optional().default([]),
  galleryCaptions: galleryCaptionsSchema.optional().default([]),
});

export const seoLinksFormSchema = z.object({
  seoTitle: z.string().min(1, "Required"),
  seoDescription: z.string().min(1, "Required"),
  repositoryUrl: z.string().min(1, "Required"),
  demoUrl: z.string().min(1, "Required"),
  cardOutcome: z.string().optional(),
  displayOrder: z.union([z.coerce.number().int().positive(), z.literal("")]),
  featured: z.boolean(),
  published: z.boolean(),
});

export const clientFormSchema = z.object({
  company: z.string().min(1, "Required"),
  content: z.string().min(1, "Required"),
  designation: z.string().min(1, "Required"),
  clientName: z.string().min(1, "Required"),
  feedback: z.string().optional(),
  companyUrl: z.string().optional(),
  featured: z.boolean().default(false),
  image: z.union([z.url(), z.literal(""), z.instanceof(FileList)]).optional(),
  logo: z.union([z.url(), z.literal(""), z.instanceof(FileList)]).optional(),
});

export const pageFormSchema = z.object({
  slug: z.string().min(1, "Required"),
  title: z.string().min(1, "Required"),
  pageType: z.enum(["persona", "index"]),
  content: z.string().min(1, "Required"),
  excerpt: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  keywords: z.string().optional(),
  relatedProjectSlugs: z.string().optional(),
  relatedWorkflowSlugs: z.string().optional(),
  sortOrder: z.union([z.coerce.number().int(), z.literal("")]).optional(),
  featured: z.boolean(),
  published: z.boolean(),
});

export type PageFormValues = z.infer<typeof pageFormSchema>;

export const blogPostFormSchema = z.object({
  slug: z.string().min(1, "Required"),
  title: z.string().min(1, "Required"),
  excerpt: z.string().optional(),
  content: z.string().min(1, "Required"),
  coverImage: imageValueSchema.optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  keywords: z.string().optional(),
  featured: z.boolean(),
  published: z.boolean(),
});

export type BlogPostFormValues = z.input<typeof blogPostFormSchema>;

export type BasicsFormValues = z.infer<typeof basicsFormSchema>;
export type StoryFormValues = z.infer<typeof storyFormSchema>;
export type TechMediaFormValues = z.input<typeof techMediaFormSchema>;
export type SeoLinksFormValues = z.infer<typeof seoLinksFormSchema>;
export type ClientFormValues = z.infer<typeof clientFormSchema>;

export type ProjectMetricValue = string | number | boolean | string[] | null;
export type ProjectMetrics = Record<string, ProjectMetricValue>;

export const ENGAGEMENT_TYPE_OPTIONS = [
  { value: "client-work", label: "Client work" },
  { value: "founder-built", label: "Founder-built" },
  { value: "open-source", label: "Open source" },
  { value: "internal-tool", label: "Internal tool" },
] as const;

export const workflowBasicsFormSchema = z.object({
  slug: z.string().min(1, "Required"),
  title: z.string().min(1, "Required"),
  headlineResult: z.string().min(1, "Required"),
  clientId: z.union([z.coerce.number().int().positive(), z.literal("")]),
  integrations: stringToArray,
  coverImage: imageValueSchema.optional(),
});

export const workflowStoryFormSchema = z.object({
  problem: z.string(),
  approach: z.string(),
  results: z.string(),
  metrics: metricsStringSchema,
});

export const workflowPublishFormSchema = z.object({
  workflowJson: workflowJsonStringSchema,
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  keywords: stringToArray,
  cardOutcome: z.string().optional(),
  displayOrder: z.union([z.coerce.number().int().positive(), z.literal("")]),
  featured: z.boolean(),
  published: z.boolean(),
});

export type WorkflowBasicsFormValues = z.input<typeof workflowBasicsFormSchema>;
export type WorkflowStoryFormValues = z.infer<typeof workflowStoryFormSchema>;
export type WorkflowPublishFormValues = z.input<typeof workflowPublishFormSchema>;
