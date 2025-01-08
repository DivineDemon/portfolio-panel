import { z } from "zod";

export const projectSchema = z.object({
  link: z.string().url("Invalid URL format."),
  project_name: z.string().min(1, "Project name is required."),
  company: z.string().min(1, "Company name is required."),
  start_year: z.number(),
  features: z
    .array(z.string())
    .nonempty()
    .min(3, "At least 3 features are required."),
  image: z.string().url(),
});

export type Project = z.infer<typeof projectSchema>;

export const testimonialSchema = z.object({
  client_name: z.string(),
  designation: z.string(),
  content: z.string(),
  image: z.string().url(),
  company: z.string(),
});

export type Testimonial = z.infer<typeof testimonialSchema>;
