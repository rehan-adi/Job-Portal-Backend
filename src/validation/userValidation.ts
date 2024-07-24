import { z } from 'zod';

export const registerSchema = z.object({
    email: z.string().email({ message: 'Invalid email address format' }),
    password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters long' }),
    role: z.enum(['job_seeker', 'employer', 'admin'], {
        message: 'Invalid role specified'
    })
});

export const loginSchema = z.object({
    email: z.string().email({ message: 'Invalid email address format' }),
    password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters long' })
});
