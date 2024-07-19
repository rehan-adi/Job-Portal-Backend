import { Document } from 'mongoose';

export interface User extends Document {
    name: string;
    email: string;
    password: string;
}

export interface Profile extends Document {
    username: String;
    email: String;
    password: String;
    fullName: String;
    location: String;
    role: String;
    bio: String;
    githubURL: String;
    linkedinURL: String;
    profileImage: String;
}
