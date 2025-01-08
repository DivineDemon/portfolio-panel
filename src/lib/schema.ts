import { z } from "zod";

export const projectSchema = z.object({
  projectLink: z.string().url("Invalid URL format."),
  projectName: z.string().min(1, "Project name is required."),
  companyName: z.string().min(1, "Company name is required."),
  year: z.string().regex(/^\d{4}$/, "Year must be a 4-digit number."),
  projectFeatures: z
    .array(z.string())
    .nonempty()
    .min(3, "At least 3 features are required."),
});

export type Project = z.infer<typeof projectSchema>;

export const testimonialSchema = z.object({
  clientName: z.string(),
  jobTitle: z.string(),
  message: z.string(),
  image: z.string().url(),
});

export type Testimonial = z.infer<typeof testimonialSchema>;
