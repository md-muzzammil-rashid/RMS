import { UsersModel } from "../models/Users.models.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";


const submitOrder = asyncHandler(async(req, res, next)=>{
    const user = await UsersModel.findById(req.user._id);
    if(!user){
        throw new ApiError(401, "Unauthorized request")
    }
    const { customerName,customerContact,subTotal,tax,total,discountAmount,items} = req.body
    
    const orderSummery = await UsersModel.findByIdAndUpdate(user._id,{$push:{orders:{customerName,customerContact,subTotal,tax,total,discountAmount,items}}},{new:true})
    if(!orderSummery){
        throw new ApiError(500,"Unable to make order")
    }
    console.log(orderSummery);
    res.status(201)
        .json(new ApiResponse(201, "Order Success", orderSummery))
})

const getOrderSummery = asyncHandler(async (req, res, next)=>{
    const user = await UsersModel.findById(req.user._id);
    const {orderId} = req.params
    console.log(orderId);
    const data = user.orders.filter((item)=>item._id==orderId)
    // console.log(data[0]);
    res.status(200)
        .json(new ApiResponse(200,"Get Success", data[0]))
})

const orderHistory = asyncHandler(async (req, res, next)=>{
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page-1)*limit
    const currentDate = new Date()
    const fromDate = req.query.fromDate || "1990-01-01T00:00:00.000Z"
    const toDate = req.query.toDate || currentDate.toISOString()
    console.log(currentDate.toISOString());
    ///////////////////////////////////////
    const orders = await UsersModel.aggregate(
        // [
        //     {$match: {_id : req.user._id}},
        //     {$unwind: {path: "$orders"}},
        //     {$sort:{"orders.createdAt":-1}},
        //     {$group:{_id:"$_id",orders:{$push: "$orders",}}},
        //     {
        //         $addFields: {
        //           orders: {
        //             $slice:["$orders", skip, limit]
        //             }
        //         }
        //       }
            
        // ]

        [
            {
              $match: {
                _id: req.user._id,
              },
            },
            {
              $unwind: {
                path: "$orders",
              },
            },
            {
              $sort: {
                "orders.createdAt": -1
              },
            },
            
            {
              $match: {
                "orders.createdAt": {
                  $gte: new Date(fromDate),
                  $lte: new Date(toDate),
                },
              },
            },
            {
              $group: {
                _id: "$_id",
                orders: {
                  $push: "$orders",
                },
              },
            },
            {
              $addFields: {
                len:{
                $size: "$orders"}
              }
            },
            {
              $addFields: {
                orders: {
                  $slice:["$orders",skip,limit]
                }
              }
            }
          ]
        )
    ///////////////////////////////////////
    

    
        res.status(200)
        .json(new ApiResponse(200, "Fetched", {userData:orders[0]?.orders,len:orders[0]?Math.ceil((orders[0].len/limit)):0}))
})

export {
    submitOrder,
    getOrderSummery,
    orderHistory
}