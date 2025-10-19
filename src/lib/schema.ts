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

export const caseStudySchema = z.object({
  title: z.string().min(1, "Title is required."),
  description: z.string().min(1, "Description is required."),
  challenge: z.string().min(1, "Challenge is required."),
  results: z.string().min(1, "Results are required."),
  onboarding_improved: z.string().min(1, "Onboarding improvement is required."),
  retention_increase: z.string().min(1, "Retention increase is required."),
  time_spent_increase: z.string().min(1, "Time spent increase is required."),
  research: z.string().min(1, "Research is required."),
  architecture: z.string().min(1, "Architecture is required."),
  wireframing: z.string().min(1, "Wireframing is required."),
  testing: z.string().min(1, "Testing is required."),
  design: z.string().min(1, "Design is required."),
  tech_stack_urls: z.array(z.string()).optional(),
  images: z.array(z.string()).min(6, "At least 6 images are required."),
  ceo_statement: z.string().min(1, "CEO statement is required."),
  conclusion: z.string().min(1, "Conclusion is required."),
});

export type CaseStudy = z.infer<typeof caseStudySchema>;
