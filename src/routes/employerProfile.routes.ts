import { Router } from 'express';
import { employerProfileCreate } from '../controllers/employerProfile.controller.js';
import { isEmployer, isLogin } from '../middlewares/isLogin.js';

const employerProfileRouter = Router();

employerProfileRouter.post(
    '/create',
    isLogin,
    isEmployer,
    employerProfileCreate
);

export default employerProfileRouter;
