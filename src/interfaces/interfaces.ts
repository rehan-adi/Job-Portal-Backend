import { Document } from 'mongoose';

export interface User extends Document {
    email: string;
    password: string;
    role: string;
}

export interface Profile extends Document {
    username: string;
    email: string;
    password: string;
    fullName: string;
    location: string;
    role: string;
    bio: string;
    githubURL: string;
    linkedinURL: string;
    profileImage: string;
}
