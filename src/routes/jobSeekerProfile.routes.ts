import { Router } from 'express';
import {
    jobSeekerProfileCreate,
    jobSeekerProfileGet,
    jobSeekerProfileUpdate,
    jobSeekerProfileDelete
} from '../controllers/jobSeekerProfile.controller.js';
import { isJobSeeker, isLogin } from '../middlewares/isLogin.js';

const jobSeekerProfileRouter = Router();

jobSeekerProfileRouter.post(
    '/create',
    isLogin,
    isJobSeeker,
    jobSeekerProfileCreate
);
jobSeekerProfileRouter.get(
    '/profile',
    isLogin,
    isJobSeeker,
    jobSeekerProfileGet
);
jobSeekerProfileRouter.put(
    '/update',
    isLogin,
    isJobSeeker,
    jobSeekerProfileUpdate
);
jobSeekerProfileRouter.delete(
    '/delete',
    isLogin,
    isJobSeeker,
    jobSeekerProfileDelete
);

export default jobSeekerProfileRouter;
