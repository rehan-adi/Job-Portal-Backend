import { Router } from 'express';
import {
    jobSeekerProfileCreate,
    jobSeekerProfileGet
} from '../controllers/jobSeekerProfile.controller.js';

const jobSeekerProfileRouter = Router();

jobSeekerProfileRouter.post('/create', jobSeekerProfileCreate);
jobSeekerProfileRouter.get('/profile', jobSeekerProfileGet);

export default jobSeekerProfileRouter;
