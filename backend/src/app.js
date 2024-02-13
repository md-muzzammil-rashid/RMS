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
import orderRoute from "./routes/orders.routes.js"

app.use("/api/v1/users", userRoute)

app.use("/api/v1/products", productRoute)

app.use("/api/v1/orders", orderRoute)




export default app