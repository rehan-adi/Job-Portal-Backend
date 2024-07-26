import { Router } from 'express';
import {
    jobSeekerProfileCreate,
    jobSeekerProfileGet,
    jobSeekerProfileDelete
} from '../controllers/jobSeekerProfile.controller.js';
import { isLogin } from '../middlewares/isLogin.js';

const jobSeekerProfileRouter = Router();

jobSeekerProfileRouter.post('/create', isLogin, jobSeekerProfileCreate);
jobSeekerProfileRouter.get('/profile', isLogin, jobSeekerProfileGet);
jobSeekerProfileRouter.delete('/delete', isLogin, jobSeekerProfileDelete);

export default jobSeekerProfileRouter;
