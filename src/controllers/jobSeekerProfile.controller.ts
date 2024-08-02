import { Request, Response } from 'express';
import { jobSeekerModel } from '../models/jobSeeker.model.js';
import { ZodError } from 'zod';
import { jobSeekerProfileValidation } from '../validations/jobSeekerProfile.Validation.js';

interface CustomRequest extends Request {
    user?: { id: string };
}

export const jobSeekerProfileCreate = async (
    req: CustomRequest,
    res: Response
) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User ID not found in request.'
            });
        }

        const parsedData = jobSeekerProfileValidation.parse(req.body);
        const { fullName, resume, skills, education, experience } = parsedData;

        const existingProfile = await jobSeekerModel.findOne({ user: userId });

        if (existingProfile) {
            return res
                .status(400)
                .json({ success: false, message: 'Profile already exists' });
        }
        const newProfile = await jobSeekerModel.create({
            user: userId,
            fullName,
            resume,
            skills,
            education,
            experience
        });
        return res.status(201).json({
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

export const jobSeekerProfileGet = async (
    req: CustomRequest,
    res: Response
) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User ID not found in request.'
            });
        }

        const profile = await jobSeekerModel.findOne({ user: userId });

        if (!profile) {
            return res
                .status(404)
                .json({ success: false, message: 'Profile not found' });
        }
        return res
            .status(200)
            .json({ success: true, profile, message: 'Showing profile' });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to get Profile',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

export const jobSeekerProfileUpdate = async (
    req: CustomRequest,
    res: Response
) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User ID not found in request.'
            });
        }

        const parsedData = jobSeekerProfileValidation.partial().parse(req.body);
        const { fullName, resume, skills, education, experience } = parsedData;

        const updatedProfile = await jobSeekerModel.findOneAndUpdate(
            { user: userId },
            { fullName, resume, skills, education, experience },
            { new: true, runValidators: true }
        );

        if (!updatedProfile) {
            return res.status(404).json({
                success: false,
                message: 'Profile not found'
            });
        }

        return res.status(200).json({
            success: true,
            profile: updatedProfile,
            message: 'Profile updated successfully'
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
            message: 'Failed to update Profile',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

export const jobSeekerProfileDelete = async (
    req: CustomRequest,
    res: Response
) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User ID not found in request.'
            });
        }

        const profileDelete = await jobSeekerModel.findOneAndDelete({
            user: userId
        });

        if (!profileDelete) {
            return res.status(404).json({
                success: false,
                message: 'Profile not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Profile deleted successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete Profile',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
