import { z } from 'zod';

export const employerProfileValidation = z.object({
    companyName: z.string().min(1, { message: 'Company name is required' }),
    companyDescription: z
        .string()
        .min(10, {
            message: 'Company description must be at least 10 characters long'
        })
        .optional(),
    companyLogo: z
        .string()
        .url({ message: 'Company logo must be a valid URL' })
        .optional(),
    location: z
        .string()
        .min(2, { message: 'Location must be at least 2 characters long' })
        .optional(),
    website: z
        .string()
        .url({ message: 'Website must be a valid URL' })
        .optional()
});
