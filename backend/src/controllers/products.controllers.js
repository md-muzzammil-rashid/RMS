import { UsersModel } from "../models/Users.models.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import asyncHandler from "../utils/asyncHandler.js";

const addCategory = asyncHandler(async (req, res, next)=>{
    const user = await UsersModel.findById(req.user._id);
    const {category} = req.body
    console.log(category);
    console.log(req.file);
    const imgPath = req.file.path
    const catImg = await uploadOnCloudinary(imgPath) 

    console.log(catImg);
    const categoryImage = catImg.url;

    user.productCategory.push({categoryImage, category})    
    await user.save({validateBeforeSave:false})  
    
    return res.status(200)
        .json(
            new ApiResponse(202, "Uploaded successfully")
        )
})

const getCategories = asyncHandler(async(req,res,next)=>{
    const categories = await UsersModel.findById(req.user._id).populate("productCategory")
    if(!categories){
        throw new ApiError(404,"Categories not found")
    }
    return res.status(200)
        .json( new ApiResponse(200,"Found",categories.productCategory))
})

const addItems = asyncHandler(async(req,res)=>{
    const user = await UsersModel.findById(req.user._id)
    const {category, itemId, itemName, photo, sizes} = req.body
    const sizesJSON=[];
    sizes.forEach(item=>{
        sizesJSON.push(JSON.parse(item))
    })
    
    const itemImg = await uploadOnCloudinary(req.file.path)
    const itemImgLink = itemImg.url
    user.items.push({category, itemId, itemName, sizes:sizesJSON, photo:itemImgLink})
    await user.save({validateBeforeSave:false})
    return res.status(200)
        .json(new ApiResponse(200,"Added", {}))
})

const getItems = asyncHandler(async(req, res, next)=>{
    const user = await UsersModel.findById(req.user._id).populate("items")
    if(!user){
        throw new ApiError(402,"Unauthorized Request")
    }
    res.status(200)
        .json(
            new ApiResponse(200,"Product fetch successful", user.items)
        )
})

export{
    addCategory,
    addItems,
    getCategories,
    getItems
}