import { RestaurantModel } from "../models/Restaurant.models.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import asyncHandler from "../utils/asyncHandler.js";

const addCategory = asyncHandler(async (req, res, next)=>{
    const restaurant = await RestaurantModel.findById(req.user.restaurant);
    const {category} = req.body
    console.log(category);
    console.log(req.file);
    const imgPath = req.file.path
    const catImg = await uploadOnCloudinary(imgPath) 

    console.log(catImg);
    const categoryImage = catImg.url;

    restaurant.productCategory.push({categoryImage, category})    
    await restaurant.save({validateBeforeSave:false})  
    
    return res.status(201)
        .json(
            new ApiResponse(201, "Uploaded successfully")
        )
})

const getCategories = asyncHandler(async(req,res,next)=>{
    const categories = await RestaurantModel.findById(req.user.restaurant).populate("productCategory")
    if(!categories){
        throw new ApiError(404,"Categories not found")
    }
    return res.status(200)
        .json( new ApiResponse(200,"Found",categories.productCategory))
})

const addItems = asyncHandler(async(req,res)=>{
    const user = await RestaurantModel.findById(req.user.restaurant)
    const {category, itemId, itemName, photo, variants} = req.body
    const variantsJSON=[];
    variants.forEach(item=>{
        variantsJSON.push(JSON.parse(item))
    })
    
    const itemImg = await uploadOnCloudinary(req.file.path)
    const itemImgLink = itemImg.url
    user.items.push({category, itemId, itemName, variants:variantsJSON, photo:itemImgLink})
    await user.save({validateBeforeSave:false})
    return res.status(201)
        .json(new ApiResponse(201,"Added", {}))
})

const getItems = asyncHandler(async(req, res, next)=>{
    const user = await RestaurantModel.findById(req.user.restaurant).populate("items")
    if(!user){
        throw new ApiError(402,"Unauthorized Request")
    }
    res.status(200)
        .json(
            new ApiResponse(200,"Product fetch successful", user.items)
        )
})

const getItemDetail = asyncHandler(async (req, res, next)=>{
    const {id} = req.query
    console.log(id);
    const item = await RestaurantModel.findOne({_id:req.user.restaurant ,'items._id':id},{'items.$':1})
    if(!item){
        throw new ApiError(404, 'Item not Found')
    }
    res.status(200)
        .json(
            new ApiResponse(200, 'Item get Successful', item.items[0])
        )

})

const editItemDetail = asyncHandler(async (req, res, next)=>{
    const {id} = req.query
    const {itemName, itemId, variants, category, isAvailable} = req.body
    const variantsJSON=[];
    variants?.forEach(item=>{
        variantsJSON.push(JSON.parse(item))
    })
    console.log(id,itemName, itemId, variants, category,isAvailable);
    const updatedItem = await RestaurantModel.findOneAndUpdate({_id:req.user.restaurant,'items._id':id},
        {
            $set:{
                'items.$.itemName':itemName,
                'items.$.category':category,
                'items.$.variants':variantsJSON,
                'items.$.itemId':itemId,
                'items.$.isAvailable':isAvailable
        }
        }
        )
        if(!updatedItem){
            throw new ApiError(501,"Failed to update item")
        }
        res.status(202)
            .json(
                new ApiResponse(202, "updated Successfully")
            )

})

export{
    addCategory,
    addItems,
    getCategories,
    getItems,
    getItemDetail,
    editItemDetail
}