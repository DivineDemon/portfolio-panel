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

/** Validates metrics JSON string (no transform). */
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

// --- Per-step schemas (validate each step; no transform so merged data matches full schema input) ---

export const basicsFormSchema = z.object({
  slug: z.string().min(1, "Required"),
  title: z.string().min(1, "Required"),
  tagline: z.string().min(1, "Required"),
  industry: z.string().min(1, "Required"),
  projectType: z.string().min(1, "Required"),
  status: z.string().min(1, "Required"),
  role: z.string().min(1, "Required"),
  engagementModel: z.string().min(1, "Required"),
  teamSize: z.coerce.number().min(1, "Required"),
  durationInMonths: z.coerce.number().min(1, "Required"),
});

export const storyFormSchema = z.object({
  problem: z.string().min(1, "Required"),
  context: z.string().min(1, "Required"),
  strategy: z.string().min(1, "Required"),
  architecture: z.string().min(1, "Required"),
  execution: z.string().min(1, "Required"),
  challenges: z.string().min(1, "Required"),
  solution: z.string().min(1, "Required"),
  measurableImpact: z.string().min(1, "Required"),
  metrics: metricsStringSchema,
});

export const techMediaFormSchema = z.object({
  keywords: stringToArray,
  techStack: stringToArray,
  infrastructure: stringToArray,
  integrations: stringToArray,
  coverImage: imageValueSchema.optional(),
  galleryImages: galleryImagesSchema.optional().default([]),
});

export const seoLinksFormSchema = z.object({
  seoTitle: z.string().min(1, "Required"),
  seoDescription: z.string().min(1, "Required"),
  repositoryUrl: z.string().min(1, "Required"),
  demoUrl: z.string().min(1, "Required"),
  featured: z.boolean(),
  published: z.boolean(),
});

export type BasicsFormValues = z.infer<typeof basicsFormSchema>;
export type StoryFormValues = z.infer<typeof storyFormSchema>;
/** Input type so form state uses string for keywords/etc. */
export type TechMediaFormValues = z.input<typeof techMediaFormSchema>;
export type SeoLinksFormValues = z.infer<typeof seoLinksFormSchema>;
