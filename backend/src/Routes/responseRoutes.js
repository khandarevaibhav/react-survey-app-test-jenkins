import { Router } from "express";
import authUser from '../Controller/Auth/authUser.js'
import saveResController from '../Controller/Response/saveResController.js'
import getResByIDController from "../Controller/Response/getResByIDController.js";

const router=Router();

router.post('/saveresponse',saveResController)
router.get('/getResponsesByID',authUser,getResByIDController)

export default router;