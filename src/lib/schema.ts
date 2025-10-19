import { z } from "zod";

export const projectSchema = z.object({
  link: z.string().url("Invalid URL format."),
  project_name: z.string().min(1, "Project name is required."),
  company: z.string().min(1, "Company name is required."),
  start_year: z.number(),
  features: z.array(z.string()).nonempty().min(3, "At least 3 features are required."),
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

export const companySchema = z.object({
  name: z.string().min(1, "Company name is required."),
  hq: z.string().min(1, "Headquarters is required."),
  founded: z
    .number()
    .min(1800, "Founded year must be valid.")
    .max(new Date().getFullYear(), "Founded year cannot be in the future."),
  industry: z.string().min(1, "Industry is required."),
  revenue: z.string().min(1, "Revenue is required."),
  size: z.string().min(1, "Company size is required."),
  ceo_name: z.string().min(1, "CEO name is required."),
  ceo_title: z.string().min(1, "CEO title is required."),
});

export type Company = z.infer<typeof companySchema>;
