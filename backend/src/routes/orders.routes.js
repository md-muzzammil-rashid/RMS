import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { getOrderSummery, orderHistory, submitOrder } from "../controllers/orders.controllers.js";


const router = Router()

router.route("/submit-order")
    .post(verifyJWT, submitOrder)

router.route("/order-summery/:orderId")
    .get(verifyJWT, getOrderSummery)

router.route("/order-history")
    .get(verifyJWT, orderHistory)

export default router