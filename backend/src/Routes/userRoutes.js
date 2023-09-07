import { Router } from "express";
import { loginController } from "../Controller/User/loginController.js";
import {signupController} from '../Controller/User/signupController.js'
import { logoutController } from "../Controller/User/logoutController.js";

const router=Router();

router.post('/login',loginController)
router.post('/signup',signupController)
router.post('/logout',logoutController)



export default router;