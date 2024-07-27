import { z } from 'zod';

export const employerProfileValidation = z.object({
    user: z.string().min(1, { message: 'User Id required' }),
    companyName: z.string().min(1, { message: 'Company name is required' }),
    companyDescription: z.string().optional(),
    companyLogo: z.string().optional(),
    location: z.string().optional(),
    website: z.string().optional()
});
