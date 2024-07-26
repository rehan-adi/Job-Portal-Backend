import { Router } from 'express';
import {
    jobSeekerProfileCreate,
    jobSeekerProfileGet,
    jobSeekerProfileUpdate,
    jobSeekerProfileDelete
} from '../controllers/jobSeekerProfile.controller.js';
import { isLogin } from '../middlewares/isLogin.js';

const jobSeekerProfileRouter = Router();

jobSeekerProfileRouter.post('/create', isLogin, jobSeekerProfileCreate);
jobSeekerProfileRouter.get('/profile', isLogin, jobSeekerProfileGet);
jobSeekerProfileRouter.put('/update', isLogin, jobSeekerProfileUpdate);
jobSeekerProfileRouter.delete('/delete', isLogin, jobSeekerProfileDelete);

export default jobSeekerProfileRouter;
