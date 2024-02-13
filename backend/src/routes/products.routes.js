import { Router } from "express";
import { addCategory, addItems, editItemDetail, getCategories, getItemDetail, getItems } from "../controllers/products.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

 const router = Router();

 router.route('/add-category')
    .post(upload.single('categoryImage'), verifyJWT, addCategory)

router.route('/add-items')
    .post(upload.single('photo'), verifyJWT, addItems)

router.route('/get-category')
    .get(verifyJWT, getCategories)

router.route('/get-items')
    .get(verifyJWT, getItems)

router.route('/edit')
    .get(verifyJWT, getItemDetail)
    .post(upload.single(''),verifyJWT, editItemDetail)

 export default router