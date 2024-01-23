import mongoose from "mongoose";
const connectDB = async() =>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`)
        .then(console.log("Database is connected!"))
    } catch (error) {
        console.log("Error in connecting DB ",error);
    }
}

export default connectDB
