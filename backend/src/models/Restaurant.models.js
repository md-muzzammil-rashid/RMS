import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { itemsSchema } from "./Items.Schema.js";
import { orderSchema } from "./Order.Schema.js";

const restaurantSchema = new mongoose.Schema({
    restaurantName: {
        type: String,
        unique: true,
        toLowerCase: true
    },
    restaurantCode:{
        type:String
    },
    restaurantEmail: {
        type: String,
        required: true,
        unique: true
    },
    GSTNumber:{
        type:String
    },
    restaurantLocation:{
        state:{
            type:String
        },
        country:{
            type:String
        },
        city:{
            type:String
        },
        address:{
            type:String
        },
        pincode:{
            type:Number
        }
    },
    contactNumber:{
        type:String
    },

    totalOrder:{
        type:Number,
        default:10000
    },
    items:[
        {
            type:itemsSchema
        }

    ],
    productCategory: [{
        category: { type: String},
        categoryImage: { type: String }
    }],
    orders:[{
        type:orderSchema
    }],
    employees:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Us'
    }]

})



export const RestaurantModel = mongoose.model("Rest", restaurantSchema)