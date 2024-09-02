import { ZodError } from 'zod';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';
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

        let employerId: string;
        try {
            const decodedToken = jwt.verify(token, config.SECRET_KEY) as { userId: string };
            employerId = decodedToken.userId;
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: 'Invalid or expired token'
            });
        }

        if(!employerId) {
            return res.status(400).json({
                success: false,
                message: 'Employer ID not found in request.'
            });
        }

        const parsedData = jobListingValidation.parse(req.body); 
        const { title, description, requirements, location, salaryRange, category } = parsedData;

        const newJobListing = await jobListingModel.create({
            employer: employerId,
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
            message: 'Failed to create job listing',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}

export const getAllJobListings = async(req: Request, res: Response) => {
   try {
       const jobListings = await jobListingModel.find().populate('employer', 'name');
       return res.status(200).json({
           success: true,
           data: jobListings,
           message: 'Job listings retrieved successfully',
       });
   } catch (error) {
    console.error(error);
    res.status(500).json({
        success: false,
        message: 'Failed to get job listing',
        error: error instanceof Error ? error.message : 'Unknown error'
    });
   }
}