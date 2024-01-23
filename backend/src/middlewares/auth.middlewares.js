import { UsersModel } from "../models/Users.models.js";
import  ApiError  from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"


export const verifyJWT = asyncHandler(async (req, res, next)=>{
    try {
        console.log("veryfying...");
        const AccessToken = await req.cookies?.AccessToken||req.header("Authorization")?.replace("Bearer ","")
        console.log("Token serech");
        if(!AccessToken){
            throw new ApiError(401,"Unauthorized request")
        }
        console.log("Token serech");
        const decoded =  jwt.decode(AccessToken, process.env.ACCESS_TOKEN_SECRET);

        if(!decoded){
            throw new ApiError(401, "Invalid Token")
        }
        console.log("Token decoded");
        const user = await UsersModel.findById(decoded._id);
        
    
        if(!user){
            throw new ApiError(401, "Token Expired")
        }

        console.log("user forund");

    
        req.user = user;
        next()
    
    } catch (error) {
        throw new ApiError(501, "Unable to verify token", error?.message)
    }
})