import { z } from 'zod';

export const jobListingValidation = z.object({
  title: z.string().min(1, "Title is required."),
  description: z.string().min(1, "Description is required."),
  requirements: z.array(z.string()).optional(),
  location: z.string().optional(),
  salaryRange: z.object({
    min: z.number().min(0, "Minimum salary must be a positive number."),
    max: z.number().min(0, "Maximum salary must be a positive number."),
  }).refine(data => data.min <= data.max, {
    message: "Minimum salary must be less than or equal to maximum salary.",
    path: ["salaryRange"]
  }),
  category: z.string().optional()
});
