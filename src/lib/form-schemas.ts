import { z } from "zod";

export const testimonialFormSchema = z.object({
  company: z.string().min(1),
  content: z.string().min(1),
  designation: z.string().min(1),
  client_name: z.string().min(1),
  image: z.union([z.url(), z.literal(""), z.instanceof(FileList)]).optional(),
});
