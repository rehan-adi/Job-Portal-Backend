import { Schema, model } from 'mongoose';
import { JobSeeker } from '../interfaces/interfaces.js';

const jobSeekerSchema = new Schema<JobSeeker>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        fullName: {
            type: String,
            required: true
        },
        resume: String,
        skills: [String],
        education: [
            {
                degree: String,
                institution: String,
                yearOfCompletion: Number
            }
        ],
        experience: [
            {
                jobTitle: String,
                company: String,
                from: Date,
                to: Date,
                description: [String]
            }
        ]
    },
    { timestamps: true }
);

export const jobSeekerModel = model<JobSeeker>('JobSeeker', jobSeekerSchema);
