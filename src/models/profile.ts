import { Schema, model } from 'mongoose';
import { Profile } from '../interfaces/interfaces.js';

const profileSchema = new Schema<Profile>({
    username: { type: String },
    email: { type: String },
    password: { type: String },
    fullName: { type: String },
    location: { type: String },
    role: { type: String },
    bio: { type: String },
    githubURL: { type: String },
    linkedinURL: { type: String },
    profileImage: { type: String }
});

const profileModel = model<Profile>('Profile', profileSchema);

export default profileModel;
