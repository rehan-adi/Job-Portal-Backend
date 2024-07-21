import mongoose from 'mongoose';
import config from '../config/config.js';

const dbConnect = async () => {
    try {
        await mongoose.connect(config.MONGODB_URI, {
            dbName: config.DB_NAME
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error(`DB Connection Failed`, error);
        process.exit(1);
    }
};

export default dbConnect;
