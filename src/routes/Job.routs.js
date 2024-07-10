import express from 'express';
import { createJob, getJobs, getSalary, getJobDetails } from '../controllers/Job.controllers.js';

const router = express.Router();

router.post('/', createJob);
router.get('/', getJobs);
router.get('/salary', getSalary);
router.get('/:id', getJobDetails);

export default router;