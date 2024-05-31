import mongoose from "mongoose";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { fillMissingDates } from "../utils/FillMissingDates.js";
import { RestaurantModel } from "../models/Restaurant.models.js";

const dailySales2 = asyncHandler(async (req, res, next) => {

    const dailySalesData = await RestaurantModel.aggregate(
      [
        {
          $match: {
            _id: req.user.restaurant
          }
        },
        {
          $unwind: {
            path: '$orders'
        }
        },
        {
          $match:{
            'orders.orderStatus': {
              $ne: 'Cancelled'
            }
          }
        },
        {
          $match: {
            'orders.createdAt' : {
              $gte: new Date('2024-03-01')
            }
          }
        },
        {
          $group: {
            _id: {
                      year: { $year: "$orders.createdAt" },
                      month: { $month: "$orders.createdAt" },
                      day: { $dayOfMonth: "$orders.createdAt" },
                      date: {'createdAt':"$orders.createdAt"}
                  },
            total:{
              $sum: "$orders.total"
            }
          }
        },
        {
          $sort: {
            _id: 1
          }
        }
      ]
    )

  
    const fillMissingDates = async (data) => {
      // Create a map to store data by date
      const dataMap = new Map();
      await data.forEach(entry => {
        // const dateStr = `${entry._id.year}-${entry._id.month}-${entry._id.day}`;
        const dateStr = entry._id.date.createdAt.toISOString().split('T')[0].trim()
        dataMap.set(dateStr.trim(), entry.total);
        // console.log(dateStr, entry.total);
      });
    
      // Fill in missing dates with total = 0
      const endDate = new Date();
      const startDate = new Date();
      startDate.setFullYear(endDate.getFullYear() - 1);
      const filledData = [];
      for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
        const dateStr = date.toISOString().split('T')[0].trim();
        
        const total = await dataMap.get(dateStr) || 0;
        // console.log(dateStr, dataMap.get(dateStr));
        filledData.push({ date: dateStr, total });
      }
    
      return filledData;
    };
    
    // Use the function to get the filled data
    const dataOfOneYear = await  fillMissingDates(dataOfOneYearRaw);
  
    const orderAndSales = await RestaurantModel.aggregate(
      [
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
            'orders.orderStatus': {
              '$ne': 'Cancelled'
            }
          }
        }, {
          '$match': {
            'orders.createdAt': {
              '$gte': new Date('Fri, 19 Jan 2024 18:30:00 GMT')
            }
          }
        }, {
          '$group': {
            '_id': {
              'year': {
                '$year': '$orders.createdAt'
              }, 
              'month': {
                '$month': '$orders.createdAt'
              }, 
              'day': {
                '$dayOfMonth': '$orders.createdAt'
              }
            }, 
            'totalOrders': {
              '$sum': 1
            }, 
            'total': {
              '$sum': '$orders.total'
            }
          }
        }, {
          '$sort': {
            '_id': -1
          }
        }
      ]
    )
  
  

})


  const mostSellingProduct = asyncHandler(async (req, res, next)=>{
    let {day, limit } = req.query
    day = day || 90
    limit = limit || 10
    const currentDate = new Date()
    const startDate = new Date()
    // console.log('start date is', currentDate);
    startDate.setDate(currentDate.getDate()- Number(day))
    startDate.setHours(0,0,0,0)
    // console.log(day, limit, startDate);
    const mostSellingData = await RestaurantModel.aggregate(
      [
        {
          '$match': {
            '_id': req.user.restaurant
          }
        }, {
          '$unwind': {
            'path': '$orders'
          }
        }, {
          '$unwind': {
            'path': '$orders.items'
          }
        }, {
          '$match': {
            'orders.orderStatus': {
              '$ne': 'Cancelled'
            }
          }
        }, {
          '$match': {
            'orders.createdAt': {
              '$gte': startDate
            }
          }
        }, {
          '$group': {
            '_id': '$orders.items.variants.variant', 
            'quantity': {
              '$sum': '$orders.items.quantity'
            }, 
            'itemsDetails': {
              '$addToSet': {
                'variant'  : '$orders.items.variants.variant', 
                'itemName' : '$orders.items.name', 
                'price'    : '$orders.items.variants.price'
              }
            }
          }
        }, {
          '$sort': {
            'quantity': -1
          }
        },
        {
          $limit : Number(limit)
        }
      ]
    )

    res.status(200)
      .json(
        new ApiResponse(200, "Fetched", mostSellingData)
      )
  })
    
  const dailySales = asyncHandler(async (req, res, next)=>{
    let {day} = req.query
    day = day || 90


    const currentDate = new Date()
    const startDate = new Date()
    startDate.setDate(currentDate.getDate()- Number(day))
    startDate.setHours(-11,-1,0,0)
    // console.log(day, startDate);

    const totalSalesAndOrder = await RestaurantModel.aggregate(
      [
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
            'orders.orderStatus': {
              '$ne': 'Cancelled'
            }
          }
        }, {
          '$match': {
            'orders.createdAt': {
              '$gte': startDate
            }
          }
        }, {
          '$group': {
            '_id': {
              'year': {
                '$year': '$orders.createdAt'
              }, 
              'month': {
                '$month': '$orders.createdAt'
              }, 
              'day': {
                '$dayOfMonth': '$orders.createdAt'
              },
              'date': { $concat: [
                { $toString: { $year: { $toDate: "$orders.createdAt" } } },
                "-",
                { $toString: { $month: { $toDate: "$orders.createdAt" } } },
                "-",
                { $toString: { $dayOfMonth: { $toDate: "$orders.createdAt" } } },
              ]}
            }, 
            'totalOrders': {
              '$sum': 1
            }, 
            'total': {
              '$sum': '$orders.total'
            }
          }
        }, {
          '$sort': {
            '_id': -1
          }
        }
      ]
    )
      const report = await fillMissingDates(totalSalesAndOrder, day)
    // console.log(report.length, report )

    res.status(200)
      .json(
        new ApiResponse(200, 'Success', report)
      )
  })

  const totalSales = asyncHandler(async (req, res, next)=>{
    let {type} = req.query
    let startDate = new Date()
    let currentDate = new Date()
    if(type=='m'||type=='M'){
      startDate.setDate(1)
      startDate.setHours(0,0,0,0)
    }else{
      startDate.setHours(0,0,0,0)
    }
    // console.log(startDate);
    const data = await RestaurantModel.aggregate(
      [
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
            'orders.orderStatus': {
              '$ne': 'Cancelled'
            }
          }
        }, {
          '$match': {
            'orders.createdAt': {
              '$gte': startDate
            }
          }
        }, {
          '$group': {
            '_id': null, 
            'totalOrders': {
              '$sum': 1
            }, 
            'total': {
              '$sum': '$orders.total'
            }
          }
        }, {
          '$sort': {
            '_id': 1
          }
        }
      ]
    )
    res.status(200)
      .json(
        new ApiResponse(200, 'Success', data)
      )
  })


  export{
    mostSellingProduct,
    dailySales,
    totalSales
  }