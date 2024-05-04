import { UserModel } from "../models/User.models.js";
import  ApiError  from "../utils/ApiError.js";
import {ApiResponse} from '../utils/ApiResponse.js'
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"


export const verifyJWT = asyncHandler(async (req, res, next)=>{
    try {
        const AccessToken = await req.cookies?.AccessToken||req.header("Authorization")?.replace("Bearer ","")
        if(!AccessToken){
            console.log("veryfying...");
            
            // throw new ApiError(401,"Unauthorized request")
            return res.status(401)
                .json(new ApiResponse(401, "Unauthorized request", {}, false))
        }
        const decoded =  jwt.decode(AccessToken, process.env.ACCESS_TOKEN_SECRET);

        if(!decoded){
            // throw new ApiError(401, "Invalid Token")
            return res.status(401)
            .json(new ApiResponse(401, "Invalid Token", {}, false))
        }
        const user = await UserModel.findById(decoded._id);
        
    
        if(!user){
            return res.status(401)
                .json(new ApiResponse(401, "Token Expired", {}, false))
            // throw new ApiError(401, "Token Expired")
        }


    
        req.user = user;
        next()
    
    } catch (error) {
   
        return res.status(501)
            .json(new ApiResponse(501, "Unable to verify token", undefined))
        // throw new ApiError(501, "Unable to verify token", error?.message)
    }
})