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
    fullName: string,
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
