import express from 'express';
import cors from 'cors';

import postJob from './routes/Job.routs.js';
import authRoute from './routes/Auth.routs.js';
import profileRoute from './routes/Profile.routs.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// routes
app.use('/postjob', postJob);
app.use('/auth', authRoute);
app.use('/profile', profileRoute);

export default app;
