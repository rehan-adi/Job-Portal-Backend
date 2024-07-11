import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import helmet from 'helmet';

import postJob from './routes/Job.routs.js';
import authRoute from './routes/Auth.routs.js';
import profileRoute from './routes/Profile.routs.js';

const app = express();

// Rate limiting configuration
const limit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
  })
);
app.use(limit);
app.use(morgan('dev'));
app.use(helmet());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/auth', authRoute);
app.use('/postjob', postJob);
app.use('/profile', profileRoute);

export default app;
