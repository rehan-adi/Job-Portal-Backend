import { Router } from 'express';
import { jobSeekerProfileCreate } from '../controllers/jobSeekerProfile.controller.js';

const jobSeekerProfileRouter = Router();

jobSeekerProfileRouter.post('/create', jobSeekerProfileCreate);

export default jobSeekerProfileRouter;
