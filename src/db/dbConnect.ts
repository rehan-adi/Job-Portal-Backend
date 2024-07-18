import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbConnect = async () => {
    try {
        const Mongo_URI = process.env.MONGODB_URI;
        if (!Mongo_URI) {
            throw new Error(
                'MongoDB URI is not provided in environment variables'
            );
        }
        await mongoose.connect(Mongo_URI, {
            dbName: process.env.DB_NAME
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error(`DB Connection Failed`, error);
        process.exit(1);
    }
};

export default dbConnect;
