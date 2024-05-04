import { Router } from "express";
import { dailySales, mostSellingProduct, totalSales } from "../controllers/reports.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router()

router.route('/most-selling-product')
    .get(verifyJWT, mostSellingProduct)

router.route('/daily-sales')
    .get(verifyJWT, dailySales)

router.route('/total-sales')
    .get(verifyJWT,totalSales)



export default router