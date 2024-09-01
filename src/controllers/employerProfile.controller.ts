import jwt from 'jsonwebtoken';
import { ZodError } from 'zod';
import { Request, Response } from 'express';
import { employerModel } from '../models/employer.model.js';
import { employerProfileValidation } from '../validations/employerProfile.Validation.js';

interface CustomRequest extends Request {
    user?: { id: string };
}

export const employerProfileCreate = async (
    req: Request,
    res: Response
) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(400).json({
                success: false,
                message: 'Token not found'
            });
        }

        let userId: string;
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
            userId = decodedToken.id;
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: 'Invalid or expired token'
            });
        }

        const parsedData = employerProfileValidation.parse(req.body);
        const {
            companyName,
            companyDescription,
            companyLogo,
            location,
            website
        } = parsedData;

        const existingProfile = await employerModel.findOne({ user: userId });

        if (existingProfile) {
            return res
                .status(400)
                .json({ success: false, message: 'Profile already exists' });
        }

        const newProfile = await employerModel.create({
            user: userId,
            companyName,
            companyDescription,
            companyLogo,
            location,
            website
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

export const employerProfileGet = async (req: CustomRequest, res: Response) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(400).json({
                success: false,
                message: 'Token not found'
            });
        }


        let userId: string;
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
            userId = decodedToken.id;
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: 'Invalid or expired token'
            });
        }


        const profile = await employerModel.findOne({ user: userId });

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

export const employerProfileUpdate = async (
    req: CustomRequest,
    res: Response
) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(400).json({
                success: false,
                message: 'Token not found'
            });
        }


        let userId: string;
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
            userId = decodedToken.id;
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: 'Invalid or expired token'
            });
        }

        const parsedData = employerProfileValidation.partial().parse(req.body);
        const {
            companyName,
            companyDescription,
            companyLogo,
            location,
            website
        } = parsedData;

        const updatedProfile = await employerModel.findOneAndUpdate(
            { user: userId },
            { companyName, companyDescription, companyLogo, location, website },
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

export const employerProfileDelete = async (
    req: CustomRequest,
    res: Response
) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(400).json({
                success: false,
                message: 'Token not found'
            });
        }


        let userId: string;
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
            userId = decodedToken.id;
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: 'Invalid or expired token'
            });
        }
        const profileDelete = await employerModel.findOneAndDelete({
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
