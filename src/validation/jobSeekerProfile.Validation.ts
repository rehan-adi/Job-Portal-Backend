import { z } from 'zod';

export const jobSeekerProfileValidation = z.object({
    user: z.string().email({ message: 'Invalid email address format' }),
    fullName: z.string().min(1, { message: 'Full name is required' }),
    resume: z.string().optional(),
    skills: z.array(z.string()).optional(),
    education: z.array(z.object({
        degree: z.string().min(1, { message: 'Degree is required' }),
        institution: z.string().min(1, { message: 'Institution is required' }),
        yearOfCompletion: z.number().int({ message: 'Year of completion must be an integer' })
    })).optional(),
    experience: z.array(z.object({
        jobTitle: z.string().min(1, { message: 'Job title is required' }),
        company: z.string().min(1, { message: 'Company is required' }),
        from: z.date({ message: 'From date is required' }),
        to: z.date().optional(),
        description: z.string().optional()
    })).optional()
});
