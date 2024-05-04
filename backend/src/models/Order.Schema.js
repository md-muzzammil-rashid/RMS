import mongoose from "mongoose";

export const orderSchema = new mongoose.Schema({
    customerName:{
        type:String,
        required: true,
    },
    customerContact:{
        type:Number,
    },
    subTotal:{
        type:Number
    },
    tax:{
        type:Number
    },
    total:{
        type:Number
    },
    discountAmount:{
        type:Number
    },
    items:{
        type:Array
    },
    orderStatus:{
        type:String,
        enum:['Pending', 'In Progress', 'Completed','Cancelled'],
        default:'Pending'
    },
    orderId:{
        type:Number,
        default:10000
    },
    tableNumber:{
        type:Number
    }
}, {timestamps:true})