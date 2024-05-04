import { Router } from "express";
import { loginUser, logoutUser, userData } from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

// router.route('/register')
//     .post(createUser)

router.route('/login')
    .post(loginUser)

router.route('/logout')
    .post(verifyJWT, logoutUser)

router.route('/create-user')

router.route('/user-details')
    .get(verifyJWT, userData)

export default router