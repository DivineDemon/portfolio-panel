import { z } from "zod";

export const testimonialFormSchema = z.object({
  company: z.string().min(1),
  content: z.string().min(1),
  designation: z.string().min(1),
  client_name: z.string().min(1),
  image: z.union([z.url(), z.literal(""), z.instanceof(FileList)]).optional(),
});

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

const allowedMetricValue = (v: unknown): v is string | number | boolean =>
  typeof v === "string" || typeof v === "number" || typeof v === "boolean";

const metricsJsonSchema = z
  .string()
  .superRefine((val, ctx) => {
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
    } catch (e) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: e instanceof Error ? `Invalid JSON: ${e.message}` : "Invalid JSON",
      });
    }
  })
  .transform((s): Record<string, string | number | boolean> => {
    const trimmed = s.trim();
    if (!trimmed) return {};
    try {
      const parsed = JSON.parse(trimmed) as Record<string, unknown>;
      const result: Record<string, string | number | boolean> = {};
      for (const [k, v] of Object.entries(parsed)) {
        if (v != null && allowedMetricValue(v)) result[k] = v;
      }
      return result;
    } catch {
      return {};
    }
  });

export const projectFormSchema = z.object({
  featured: z.boolean(),
  published: z.boolean(),
  slug: z.string().min(1),
  role: z.string().min(1),
  title: z.string().min(1),
  status: z.string().min(1),
  tagline: z.string().min(1),
  problem: z.string().min(1),
  context: z.string().min(1),
  demoUrl: z.string().min(1),
  industry: z.string().min(1),
  strategy: z.string().min(1),
  teamSize: z.coerce.number().min(1),
  solution: z.string().min(1),
  seoTitle: z.string().min(1),
  execution: z.string().min(1),
  challenges: z.string().min(1),
  keywords: stringToArray,
  projectType: z.string().min(1),
  techStack: stringToArray,
  architecture: z.string().min(1),
  repositoryUrl: z.string().min(1),
  seoDescription: z.string().min(1),
  integrations: stringToArray,
  engagementModel: z.string().min(1),
  infrastructure: stringToArray,
  durationInMonths: z.coerce.number().min(1),
  measurableImpact: z.string().min(1),
  metrics: metricsJsonSchema,
  coverImage: z.union([z.url(), z.literal(""), z.instanceof(FileList)]).optional(),
  galleryImages: z.array(z.union([z.url(), z.literal(""), z.instanceof(FileList)])),
});

export type ProjectFormValues = z.input<typeof projectFormSchema>;
export type ProjectFormOutputValues = z.infer<typeof projectFormSchema>;
