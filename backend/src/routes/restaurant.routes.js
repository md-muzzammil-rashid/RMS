import { Router } from "express";
import { createRestaurant } from "../controllers/restaurant.controllers.js";

const router = Router()

router.route('/register-restaurant')
    .post(createRestaurant)


export default router