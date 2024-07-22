import { Schema, model } from 'mongoose';
import { JobApplication } from '../interfaces/interfaces.js';

const jobApplicationSchema = new Schema<JobApplication>(
    {
        jobListing: {
            type: Schema.Types.ObjectId,
            ref: 'JobListing',
            required: true
        },
        jobSeeker: {
            type: Schema.Types.ObjectId,
            ref: 'JobSeeker',
            required: true
        },
        status: {
            type: String,
            enum: [
                'applied',
                'shortlisted',
                'interviewing',
                'hired',
                'rejected'
            ],
            default: 'applied'
        },
        coverLetter: String,
        appliedAt: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true }
);

export const jobApplicationModel = model<JobApplication>(
    'JobApplication',
    jobApplicationSchema
);
