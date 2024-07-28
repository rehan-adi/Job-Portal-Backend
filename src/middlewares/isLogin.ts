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
        req.cookies.authToken || req.headers.authorization?.split(' ')[1];

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
