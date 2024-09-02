import { ZodError } from 'zod';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { jobListingModel } from '../models/jobListing.model.js';
import { jobListingValidation } from '../validations/jobListing.validation.js';

export const createJobListing = async(req: Request, res: Response) =>  {
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

        if(!userId) {
            return res.status(400).json({
                success: false,
                message: 'User ID not found in request.'
            });
        }

        const parsedData = jobListingValidation.parse(req.body); 
        const { title, description, requirements, location, salaryRange, category } = parsedData;

        const newJobListing = await jobListingModel.create({
            user: userId,
            title,
            description,
            requirements,
            location,
            salaryRange,
            category
        });

        return res.status(200).json({
            success: true,
            data: newJobListing,
            message: 'Job listing created successfully',
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
            message: 'Failed to register',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}