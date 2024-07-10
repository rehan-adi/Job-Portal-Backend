import express from 'express';
import { createProfile, getProfile } from '../controllers/Profile.controllers.js';

const router = express.Router();

router.post('/createProfile', createProfile);
router.get('/:id', getProfile);

export default router;
