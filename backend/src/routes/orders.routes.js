import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { getOrderSummery, orderHistory, submitOrder, updateOrderStatus } from "../controllers/orders.controllers.js";


const router = Router()

router.route("/submit-order")
    .post(verifyJWT, submitOrder)

router.route("/order-summery/:orderId")
    .get(verifyJWT, getOrderSummery)

router.route("/order-history")
    .get(verifyJWT, orderHistory)

router.route('/update-order-status/:orderId')
    .post(verifyJWT, updateOrderStatus)

// router.route('/get-sales-report')
//     .get(verifyJWT, salesReport)

export default router