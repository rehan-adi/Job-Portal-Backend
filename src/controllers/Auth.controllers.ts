import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import config from '../config/config.js';
import { ZodError } from 'zod';
import { loginSchema, registerSchema } from '../validation/userValidation.js';

export const register = async (req: Request, res: Response) => {
    try {
        const parsedData = registerSchema.parse(req.body);
        const { email, password, role } = parsedData;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res
                .status(400)
                .json({ success: false, message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            password: hashedPassword,
            role
        });
        res.status(201).json({
            success: true,
            user: {
                id: user._id,
                email: user.email,
                role: user.role
            },
            message: 'User registered successfully'
        });
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                success: false,
                errors: error.errors.map((e) => e.message)
            });
        }
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to register',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const parsedData = loginSchema.parse(req.body);
        const { email, password } = parsedData;

        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(400)
                .json({ success: false, message: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Incorrect password. Please try again.'
            });
        }
        const token = jwt.sign({ userId: user._id, role: user.role }, config.SECRET_KEY, {
            expiresIn: '15d'
        });

        res.cookie('authToken', token, {
            maxAge: 15 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });

        res.status(200).json({
            success: true,
            token,
            message: 'Login successfully'
        });
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                success: false,
                errors: error.errors.map((e) => e.message)
            });
        }
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to login',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
