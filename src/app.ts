import express from 'express';
import hpp from 'hpp';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import xss from 'xss-clean';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import errorHandler from './utils/errorHandler.js';
import config from './config/config.js';

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
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: config.CORS_ORIGIN,
        credentials: true
    })
);
app.use(limit);
app.use(morgan('dev'));
app.use(helmet());
app.use(hpp());
app.use(xss());
app.use(mongoSanitize());

// Disabling 'X-Powered-By' header for security reasons
app.disable('x-powered-by');

// routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/postjob', postJob);
app.use('/api/v1/profile', profileRoute);

app.use(errorHandler);

export default app;
