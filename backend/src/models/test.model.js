import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        toLowerCase: true
    },
    password: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    displayName: {
        type: String,
    },
    businessName: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,

    },
    productCategory: [{
        category: { type: String, required: true },
        categoryImage: { type: String, required: true }
    }]
})

export const testModel = mongoose.model("test",testSchema)