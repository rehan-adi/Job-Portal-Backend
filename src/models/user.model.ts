import { Schema, model } from 'mongoose';
import { User } from '../interfaces/interfaces.js';

const userSchema = new Schema<User>({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['job_seeker', 'employer', 'admin'],
        required: true
    }
}, {timestamps: true} );

const userModel = model<User>('User', userSchema);

export default userModel;
