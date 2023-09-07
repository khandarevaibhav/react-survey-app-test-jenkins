import { Router } from "express";
import authUser from '../Controller/Auth/authUser.js'
import  saveFormConfController from "../Controller/Form/saveFormConfController.js";
import { getFormByIDControlller } from "../Controller/Form/getFormByIDController.js";
import { getFormsByEmailController } from "../Controller/Form/getFormsByEmailController.js";
import { deleteFormByID } from "../Controller/Form/deleteFormByID.js";

const router=Router();

router.post('/saveform',authUser,saveFormConfController)



router.get('/getFormByID',authUser,getFormByIDControlller)

router.get('/userEnd/getFormByID',getFormByIDControlller)

router.get('/getFormsByEmail',authUser,getFormsByEmailController)

router.delete('/deleteFormByID',authUser,deleteFormByID)



export default router;