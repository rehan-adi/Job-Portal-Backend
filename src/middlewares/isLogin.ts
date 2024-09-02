import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config/config.js';

interface UserPayload {
    userId: string;
    role: string;
}

interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        role: string;
    };
}

export const isLogin = (req: Request, res: Response, next: NextFunction) => {
    const token =
        req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Authentication token is required. Please login.'
        });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, config.SECRET_KEY) as UserPayload;
        (req as AuthenticatedRequest).user = {
            id: decoded.userId,
            role: decoded.role
        };
        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        return res.status(401).json({
            success: false,
            message: 'Invalid authentication token. Please login again.'
        });
    }
};


/**
 * Middleware to check if the user has the role of 'Job Seeker'.
 * It ensures that only users with the 'job_seeker' role can access the route.
 */
export const isJobSeeker = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    if (!req.user || req.user.role !== 'job_seeker') {
        return res
            .status(403)
            .json({ message: 'Access forbidden: Job Seekers only' });
    }
    next();
};

/**
 * Middleware to check if the user has the role of 'Employer'.
 * It ensures that only users with the 'employer' role can access the route.
 */
export const isEmployer = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    if (!req.user || req.user.role !== 'employer') {
        return res
            .status(403)
            .json({ message: 'Access forbidden: Employers only' });
    }
    next();
};
