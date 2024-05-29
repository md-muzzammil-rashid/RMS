import { RestaurantModel } from "../models/Restaurant.models.js";
import { io } from "../socket/socket.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";


const submitOrder = asyncHandler(async (req, res, next) => {
  const user = await RestaurantModel.findById(req.user.restaurant);
  if (!user) {
    throw new ApiError(401, "Unauthorized request")
  }
  const { customerName, customerContact, subTotal, tax, total, discountAmount, items, tableNumber } = req.body
  const getUserDetail = await RestaurantModel.findById(user._id)
  const orderSummery = await RestaurantModel.findByIdAndUpdate(user._id, { $push: { orders: { customerName, customerContact, subTotal, tax, total, discountAmount, items, tableNumber, orderId:getUserDetail.totalOrder+1 } }, totalOrder:getUserDetail.totalOrder+1 }, { new: true })
  if (!orderSummery) {
    throw new ApiError(500, "Unable to make order")
  }

  console.log('new order notification triggered');
  io.to(user.id).emit("newOrder",orderSummery)

  res.status(201)
    .json(new ApiResponse(201, "Order Success", orderSummery))
})

const getOrderSummery = asyncHandler(async (req, res, next) => {
  const user = await RestaurantModel.findById(req.user.restaurant);
  const { orderId } = req.params
  console.log(orderId);
  const data = user.orders.filter((item) => item._id == orderId)
  // console.log(data[0]);
  res.status(200)
    .json(new ApiResponse(200, "Get Success", data[0]))
})

const orderHistory = asyncHandler(async (req, res, next) => {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit
  const currentDate = new Date()
  const fromDate = req.query.fromDate || "1990-01-01T00:00:00.000Z"
  const toDate = req.query.toDate || currentDate.toISOString()
  // console.log(currentDate.toISOString());
  ///////////////////////////////////////
  const orders = await RestaurantModel.aggregate(

    [
      {
        $match: {
          _id: req.user.restaurant,
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
          len: {
            $size: "$orders"
          }
        }
      },
      {
        $addFields: {
          orders: {
            $slice: ["$orders", skip, limit]
          }
        }
      }
    ]
  )



  res.status(200)
    .json(new ApiResponse(200, "Fetched", { userData: orders[0]?.orders, len: orders[0] ? Math.ceil((orders[0].len / limit)) : 0 }))
})

const updateOrderStatus = asyncHandler(async (req, res, next) => {
  const { status, orderId } = req.body
  const user = await RestaurantModel.findOneAndUpdate(
    {
      _id: req.user.restaurant,
      "orders._id": orderId
    },
    {
      $set: {

        'orders.$.orderStatus': status
      }
    },
    {
      new: true
    }
  )
  const data = user.orders.filter((item) => item._id == orderId)

  io.to(user.id).emit('orderStatusUpdated', data)


  res.status(200)
    .json(
      new ApiResponse(200, "Updated", data[0])
    )
})

const incompleteOrders = asyncHandler(async (req, res) => {
  const restaurant = await RestaurantModel.aggregate([
    {
      '$match': {
        '_id': req.user.restaurant
      }
    }, {
      '$unwind': {
        'path': '$orders'
      }
    }, {
      '$match': {
        '$and': [
          {
            'orders.orderStatus': {
              '$ne': 'Completed'
            }
          }, {
            'orders.orderStatus': {
              '$ne': 'Cancelled'
            }
          }
        ]
      }
    }, {
      '$group': {
        '_id': null, 
        'orders': {
          '$push': '$orders'
        }
      }
    }
  ])

 if(!restaurant){
  throw new ApiError(500, "Unable to fetch incomplete orders")
 }
  return res.status(200)
        .json(
          new ApiResponse(200, "Fetched", restaurant[0]?.orders)
        )
                    
})


export {
  submitOrder,
  getOrderSummery,
  orderHistory,
  updateOrderStatus,
  incompleteOrders
}