import { z } from "zod";

export const projectSchema = z.object({
  slug: z.string().min(1, "Slug is required."),
  title: z.string().min(1, "Title is required."),
  tagline: z.string(),
  industry: z.string().nullable(),
  projectType: z.string().nullable(),
  status: z.string().nullable(),
  role: z.string().min(1, "Role is required."),
  engagementModel: z.string().nullable(),
  teamSize: z.number().nullable(),
  durationInMonths: z.number().nullable(),
  problem: z.string().min(1, "Problem is required."),
  context: z.string().nullable(),
  strategy: z.string().min(1, "Strategy is required."),
  architecture: z.string().min(1, "Architecture is required."),
  execution: z.string().min(1, "Execution is required."),
  challenges: z.string().nullable(),
  solution: z.string().min(1, "Solution is required."),
  measurableImpact: z.string().min(1, "Measurable impact is required."),
  metrics: z.string().default("{}"),
  techStack: z.array(z.string()),
  infrastructure: z.array(z.string()),
  integrations: z.array(z.string()),
  coverImage: z.string().min(1, "Cover image is required."),
  galleryImages: z.array(z.string()),
  demoUrl: z.string().url().nullable().or(z.literal("")),
  repositoryUrl: z.string().url().nullable().or(z.literal("")),
  seoTitle: z.string().nullable(),
  seoDescription: z.string().nullable(),
  keywords: z.array(z.string()),
  featured: z.boolean(),
  published: z.boolean(),
});

export type Project = z.infer<typeof projectSchema>;

export const testimonialSchema = z.object({
  client_name: z.string(),
  designation: z.string(),
  content: z.string(),
  image: z.string().url().optional(),
  company: z.string(),
});

export type Testimonial = z.infer<typeof testimonialSchema>;
