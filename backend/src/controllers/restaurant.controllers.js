import { RestaurantModel } from "../models/Restaurant.models.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { UserModel } from "../models/User.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const createRestaurant = asyncHandler(async (req, res, next)=>{
    const data = JSON.parse(req.body.data);
    const { restaurantName, restaurantCode, restaurantEmail, username, fullName, email, password, confirmPassword } = data

    if([ restaurantName, restaurantCode, restaurantEmail, username, fullName, email, password ].some(field=>field?.trim()===''||field?.trim()===null||field?.trim()===undefined)){

        res.status(400)
            .json(
                new ApiResponse(400, "All fields are required", {}, false)
            )
        // throw new ApiError(400, "All fields are required")
    }

    if(confirmPassword !== password){
        return res.status(400)
            .json(
                new ApiResponse(400, "Passwords do not match", {}, false)
            )
    }

    const restaurantExisted = await RestaurantModel.findOne({restaurantCode:restaurantCode})
    if(restaurantExisted){
        
        res.status(409)
        .json(
            new ApiResponse(409, "Restaurant with same Name or Email already existed", {}, false)
        )
        // throw new ApiError(409, "User already existed with same username or email")
    }
    
    const restaurant = await RestaurantModel.create({
        restaurantName:restaurantName,
        restaurantCode:restaurantCode,
        restaurantEmail:restaurantEmail
    }
)

if(!restaurant){
    throw new ApiError(500, "Failed to Register Restaurant")
}

const user = await UserModel.create({
    fullName,
    username,
    password,
    email,
    restaurant:restaurant._id,
    softwareManagement:{isAdmin:true}
})
if(!user){
    throw new ApiError(500, "Failed to create user")
}

const addEmployee = await RestaurantModel.findByIdAndUpdate(restaurant._id,{
    $push: {
        employees: user._id
    }
})

    const registeredRestaurant = await RestaurantModel.findById(restaurant._id).populate('employees')
    return res.status(200)
    .json(
        new ApiResponse(200, "Restaurant registered Successful", registeredRestaurant)
    )
})


export {
    createRestaurant
}