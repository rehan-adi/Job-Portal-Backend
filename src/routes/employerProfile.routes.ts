import { Router } from 'express';
import {
    employerProfileCreate,
    employerProfileDelete,
    employerProfileGet,
    employerProfileUpdate
} from '../controllers/employerProfile.controller.js';
import { isEmployer, isLogin } from '../middlewares/isLogin.js';

const employerProfileRouter = Router();

employerProfileRouter.post(
    '/create',
    isLogin,
    isEmployer,
    employerProfileCreate
);
employerProfileRouter.get('/profile', isLogin, isEmployer, employerProfileGet);
employerProfileRouter.put(
    '/update',
    isLogin,
    isEmployer,
    employerProfileUpdate
);
employerProfileRouter.delete(
    '/update',
    isLogin,
    isEmployer,
    employerProfileDelete
);

export default employerProfileRouter;
