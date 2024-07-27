import { z } from 'zod';

export const employerProfileValidation = z.object({
    companyName: z.string().min(1, { message: 'Company name is required' }),
    companyDescription: z.string().optional(),
    companyLogo: z.string().optional(),
    location: z.string().optional(),
    website: z.string().optional()
});
