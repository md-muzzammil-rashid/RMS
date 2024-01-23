import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))
app.use(cors())

//importing routes
import userRoute from "./routes/users.routes.js";
import productRoute from "./routes/products.routes.js"
import asyncHandler from "./utils/asyncHandler.js";
import { UsersModel } from "./models/Users.models.js";
import { ApiResponse } from "./utils/ApiResponse.js";
import { testModel } from "./models/test.model.js";

app.use("/api/v1/users", userRoute)

app.use("/api/v1/products", productRoute)

app.post("/test", asyncHandler(async (req, res, next)=>{
    const user = await UsersModel.create({username:"ayaan",password:"ayaan",displayName:"ayaan",email:"ayaan", businessName:"ayaan"})
    res.status(200)
    .json(
        new ApiResponse(200, "done", {user})
    )
}))


export default app