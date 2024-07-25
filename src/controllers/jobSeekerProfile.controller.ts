import { Request, Response } from 'express';
import { jobSeekerModel } from '../models/jobSeeker.model.js';
import { ZodError } from 'zod';
import { jobSeekerProfileValidation } from '../validation/jobSeekerProfile.validation.js';

export const jobSeekerProfileCreate = async (req: Request, res: Response) => {
    try {
        const parsedData = jobSeekerProfileValidation.parse(req.body);
        const { user, fullName, resume, skills, education, experience } =
            parsedData;
        const existingProfile = await jobSeekerModel.findOne({ user });
        if (existingProfile) {
            return res
                .status(400)
                .json({ success: false, message: 'Profile already exists' });
        }
        const newProfile = jobSeekerModel.create({
            user,
            fullName,
            resume,
            skills,
            education,
            experience
        });
        return res
            .status(201)
            .json({
                success: true,
                profile: newProfile,
                message: 'Profile saved successfully'
            });
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                success: false,
                errors: error.errors.map((e) => e.message)
            });
        }
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to create Profile',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
