import { Schema, model } from 'mongoose';
import { User } from '../interfaces/interfaces.js';

const userSchema = new Schema<User>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const userModel = model<User>('User', userSchema);

export default userModel;
