import express from 'express';
import { register, login, logout } from '../controllers/Auth.controllers.js';

const router = express.Router();

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: Password123
 *               role:
 *                 type: string
 *                 example: user
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 60d0fe4f5311236168a109ca
 *                     email:
 *                       type: string
 *                       example: user@example.com
 *                     role:
 *                       type: string
 *                       example: user
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

router.post('/register', register);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login a user
 *     description: Authenticates a user and returns a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: Password123
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MGQwZmU0ZjUxMjMxNjE2OGExMDljYSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjg0NTU2NjAwLCJleHBpcm9jZTIiOiIxNTU4NTYyMDAwIiwiZXhwIjoxNjg0NTU2NjAwLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJpc3MiOiJhcGkiLCJzdWIiOiJ1c2VyIn0.Tw1KfEXAMPLEkPQKP9Qh0oH1Yk9KXkAfWcPdMtXEg
 *                 message:
 *                   type: string
 *                   example: Login successfully
 *       400:
 *         description: Invalid email or password
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

router.post('/login', login);

/**
 * @swagger
 * /api/v1/auth/logout:
 *   post:
 *     summary: Log out a user
 *     description: Logs out the user by clearing the JWT token from cookies.
 *     responses:
 *       200:
 *         description: Successfully logged out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Logged out successfully
 *       500:
 *         description: Internal server error
 */

router.post('/logout', logout);

export default router;
