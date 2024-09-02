import express from 'express';
import { createJobListing, getAllJobListings } from '../controllers/jobListing.controller.js';
import { isEmployer, isLogin } from '../middlewares/isLogin.js';

const jobListingRouter = express.Router();

jobListingRouter.post('/create', isLogin, isEmployer, createJobListing);
jobListingRouter.get('/get', isLogin, isEmployer, getAllJobListings);

export default jobListingRouter;
