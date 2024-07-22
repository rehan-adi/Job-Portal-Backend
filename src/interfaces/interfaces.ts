import { Document, Schema } from 'mongoose';

export interface User extends Document {
    email: string;
    password: string;
    role: string;
}

interface Education {
    degree: string;
    institution: string;
    yearOfCompletion: number;
}

interface Experience {
    jobTitle: string;
    company: string;
    from: Date;
    to: Date;
    description: string;
}

export interface JobSeeker extends Document {
    user: Schema.Types.ObjectId;
    fullName: string;
    resume?: string;
    skills: string[];
    education: Education[];
    experience: Experience[];
}

export interface Employer extends Document {
    user: Schema.Types.ObjectId;
    companyName: string;
    companyDescription?: string;
    companyLogo?: string;
    location?: string;
    website?: string;
}

export interface JobListing extends Document {
    employer: Schema.Types.ObjectId;
    title: string;
    description: string;
    requirements: string[];
    location?: string;
    salaryRange: {
        min: number;
        max: number;
    };
    category?: string;
}

export interface JobApplication extends Document {
    jobListing: Schema.Types.ObjectId;
    jobSeeker: Schema.Types.ObjectId;
    status: 'applied' | 'shortlisted' | 'interviewing' | 'hired' | 'rejected';
    coverLetter?: String;
    appliedAt?: Date;
}
