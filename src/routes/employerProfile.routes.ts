import { Router } from 'express';
import { employerProfileCreate, employerProfileGet } from '../controllers/employerProfile.controller.js';
import { isEmployer, isLogin } from '../middlewares/isLogin.js';

const employerProfileRouter = Router();

employerProfileRouter.post(
    '/create',
    isLogin,
    isEmployer,
    employerProfileCreate
);

employerProfileRouter.get(
    '/profile',
    isLogin,
    isEmployer,
    employerProfileGet
);

export default employerProfileRouter;
