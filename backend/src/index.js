// import app from "./app.js";
// import connectDB from "./db/index.js";
import dotenv from "dotenv"
import { startServer } from "./app.js";

dotenv.config()

// connectDB().then(()=>{
//     server.listen(process.env.PORT || 6010,()=>{
//         console.log("Server is running at PORT : ",process.env.PORT)
//     })
// })

startServer()