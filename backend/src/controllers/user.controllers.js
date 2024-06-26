import  ApiError  from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { options } from "../utils/constants.js";
import { RestaurantModel } from "../models/Restaurant.models.js";
import { UserModel } from "../models/User.models.js";

const createUser = asyncHandler(async (req, res, next) => {
    const { username, email, password, fullName} = req.body
    if ([].some((field) => field?.trim() == "")) {
        throw new ApiError(400, "All fields are required")
    }
    const existedUser = await RestaurantModel.findOne(
        {
            $or: [{ username: username, email: email }]
        }
    )
    if (existedUser) {
        throw new ApiError(409, "User already existed with same username or email")
    }
    const user = await UserModel.create( {restaurantName:'CodeCafe'}, {
        $push: {employees :{ 
        email,
        username,
        password,
        displayName,
        businessName,
        }}
    })

    if (!user) {
        throw new ApiError(500, "Failed to create user")
    }
    return res.status(200)
        .json(
            new ApiResponse(200, "User registered Successful", user)
        )
})



const generateAccessAndRefreshToken = async function (userId) {

    try {
        const user = await UserModel.findById(userId);
        const AccessToken = await user.generateAccessToken()
        const RefreshToken = await user.generateRefreshToken()
        user.refreshToken = RefreshToken
        await user.save({
            validateBeforeSave: false
        }).then(() =>
            console.log("Refresh token saved")

        ).catch((err) => console.log("Failed to save refresh token"))

        return { AccessToken, RefreshToken }

    } catch (error) {
        console.log("Error in Generating token");
    }
}



const loginUser = asyncHandler(async function (req, res, next) {
    const { usernameORemail, password } = req.body

    if([usernameORemail, password].some((field)=>field?.trim()== null ||field?.trim()==  undefined || field?.trim()== ''  )){
    // throw new ApiError(401, 'All Fields are required')
        return res.status(200)
           .json(
                new ApiResponse(401, "All fields are required", {}, false)
            )
    }
    const user = await UserModel.findOne({
        $or: [{ username: usernameORemail }, { email: usernameORemail }]
    }).populate('restaurant')

    if (!user) {
        return res.status(200)
        .json( new ApiResponse(404, "User not Found !!"))
    }
    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
        return res.status(200)
        .json(

          new ApiResponse(401, "Invalid Credentials")
        )
    }
    const {RefreshToken, AccessToken} = await generateAccessAndRefreshToken(user._id);


    return res.status(202)
        .cookie("AccessToken", AccessToken, options)
        .cookie("RefreshToken", RefreshToken, options)
        .json(
            new ApiResponse(202, "Login Successful", {user:user, AccessToken, RefreshToken})
        )
})



const logoutUser = asyncHandler(async ( req, res, next )=>{
    
    await UserModel.findByIdAndUpdate(req.user._id,
            {
                $set:{refreshToken: undefined}
            },
            {
                new:true
            }
        ).then(()=>{
            res.status(200)
                .clearCookie("AccessToken", options)
                .clearCookie("RefreshToken", options)
                .json(
                    new ApiResponse(201, "Logout Successful", {})
                )
        })
    
})


const userData = asyncHandler(async (req, res, next)=>{
    const user = await UserModel.findById(req.user._id);
    if(!user){
        return res.status(404)
            .json(
                new ApiResponse(404, "User not found", {}, false)
            )
        }else{
            return res.status(200)
               .json(
                    new ApiResponse(200, "User found", user, true)
                )
        }


})

export {
    loginUser,
    logoutUser,
    userData
}