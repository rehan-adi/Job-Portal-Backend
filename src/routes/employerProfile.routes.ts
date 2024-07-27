import { Router } from "express";
import { employerProfileCreate } from "../controllers/employerProfile.controller.js";
import { isLogin } from "../middlewares/isLogin.js";

const employerProfileRouter = Router();

employerProfileRouter.post('/create', isLogin, employerProfileCreate)


export default employerProfileRouter;