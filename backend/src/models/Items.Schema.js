import mongoose from "mongoose";

export const itemsSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
    },
    itemId: {
        type: String,
    },
    price: {
        type: Number,
        default: undefined,
    },
    photo: {
        type: String,
        require: true
    },
    variants:[{
        variant:{type:String},
        price:{type:Number},
    }],
    description: {
        type: String
    },
    category: {
        type: String
    },
    isAvailable: {
        type:Boolean,
        default:true
    }
})
