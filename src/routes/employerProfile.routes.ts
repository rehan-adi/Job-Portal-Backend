import { Router } from 'express';
import { employerProfileCreate, employerProfileGet, employerProfileUpdate } from '../controllers/employerProfile.controller.js';
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
employerProfileRouter.put(
    '/update',
    isLogin,
    isEmployer,
    employerProfileUpdate
);

export default employerProfileRouter;
