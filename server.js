import express from 'express';
import dotenv from 'dotenv';
import postJob from './routes/Job.routs.js'
import authRoute from './routes/Auth.routs.js'
import profileRoute from './routes/Profile.routs.js'
import dbConnect from './config/dbConnect.js'
import cors from 'cors'

const server = express();

dotenv.config();

// Connect to the database
dbConnect();

// Middleware
server.use(express.json());
server.use(cors());

// routes
server.use('/postjob', postJob);
server.use('/auth', authRoute);
server.use('/profile', profileRoute);

server.listen(process.env.PORT || 1000, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});