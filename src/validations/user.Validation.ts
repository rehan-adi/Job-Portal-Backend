import { z } from 'zod';

export const registerSchema = z.object({
    email: z.string().trim().email({ message: 'Invalid email address format' }),
    password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters long' })
        .regex(/[a-z]/, {
            message: 'Password must contain at least one lowercase letter'
        })
        .regex(/[A-Z]/, {
            message: 'Password must contain at least one uppercase letter'
        })
        .regex(/\d/, { message: 'Password must contain at least one digit' })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Password must contain at least one special character'
        }),
    role: z.enum(['job_seeker', 'employer'], {
        message: 'Invalid role specified'
    })
});

export const loginSchema = z.object({
    email: z.string().trim().email({ message: 'Invalid email address format' }),
    password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters long' })
        .regex(/[a-z]/, {
            message: 'Password must contain at least one lowercase letter'
        })
        .regex(/[A-Z]/, {
            message: 'Password must contain at least one uppercase letter'
        })
        .regex(/\d/, { message: 'Password must contain at least one digit' })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Password must contain at least one special character'
        })
});
