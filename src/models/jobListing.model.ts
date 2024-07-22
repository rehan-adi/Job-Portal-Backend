import { Schema, model } from 'mongoose';
import { JobListing } from '../interfaces/interfaces.js';

const jobListingSchema = new Schema<JobListing>(
    {
        employer: {
            type: Schema.Types.ObjectId,
            ref: 'Employer',
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        requirements: [String],
        location: String,
        salaryRange: {
            min: {
                type: Number,
                required: true
            },
            max: {
                type: Number,
                required: true
            }
        },
        category: String
    },
    { timestamps: true }
);

export const jobListingModel = model<JobListing>(
    'JobListing',
    jobListingSchema
);
