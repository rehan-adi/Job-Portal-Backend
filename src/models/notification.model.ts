import { Schema, model } from 'mongoose';
import { Notification } from '../interfaces/interfaces.js';

const notificationSchema = new Schema<Notification>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        message: {
            type: String,
            required: true
        },
        read: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

export const notificationModel = model<Notification>(
    'Notification',
    notificationSchema
);
