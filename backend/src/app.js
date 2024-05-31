import cookieParser from "cookie-parser";
import cors from "cors"
import express from 'express'
import { app, server  } from "./socket/socket.js";

// const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))
app.use(cors(
        {
                origin: ["http://localhost:3000", "http://192.168.77.81:3000","https://rms-six-tan.vercel.app"],
                methods: ["GET", "POST"],
                allowedHeaders: ["Content-Type", "Authorization"],
                credentials: true,
        }
))


//importing routes
import userRoute from "./routes/user.routes.js";
import productRoute from "./routes/products.routes.js"
import orderRoute from "./routes/orders.routes.js"
import reportRoute from './routes/reports.routes.js'
import restaurantRoute from './routes/restaurant.routes.js'
import asyncHandler from "./utils/asyncHandler.js";
import connectDB from "./db/index.js";

app.get('/', asyncHandler(async(req, res, next)=>{
        res.status(200)
        .json({success: 'Success'})
}))

app.use("/api/v1/restaurant", restaurantRoute)

app.use("/api/v1/users", userRoute)

app.use("/api/v1/products", productRoute)

app.use("/api/v1/orders", orderRoute)

app.use("/api/v1/reports", reportRoute)

// export default app

export const startServer =() =>{
        connectDB().then(()=>{
            server.listen(process.env.PORT || 6010,()=>{
            console.log("Server is running at PORT : ",process.env.PORT)
            })
        })
}