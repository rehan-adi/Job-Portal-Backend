import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbConnect = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error(`DB Connection Failed`, error);
    process.exit(1);
  }
};

export default dbConnect;
