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
import userRoute from "./routes/user.routes.js";
import productRoute from "./routes/products.routes.js"
import orderRoute from "./routes/orders.routes.js"
import reportRoute from './routes/reports.routes.js'
import restaurantRoute from './routes/restaurant.routes.js'

app.use("/api/v1/restaurant", restaurantRoute)

app.use("/api/v1/users", userRoute)

app.use("/api/v1/products", productRoute)

app.use("/api/v1/orders", orderRoute)

app.use("/api/v1/reports", reportRoute)




export default app