import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import autoIncrement from "mongoose-auto-increment"

const orderSchema = new mongoose.Schema({
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
    orderIdAuto:{
        type:Number
    }
}, {timestamps:true})

// const connection = mongoose.createConnection(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`)
// autoIncrement.initialize(connection)

// orderSchema.plugin(autoIncrement.plugin, {
//     model:"Users",
//     field: "orderIdAuto",
//     startAt: 10001,
//     incrementBy: 1
// })



const itemsSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
    },
    itemId: {
        type: String,
    },
    price: {
        type: Number,
        default: undefined,
    },
    photo: {
        type: String,
        require: true
    },
    variants:[{
        variant:{type:String},
        price:{type:Number}
    }],
    description: {
        type: String
    },
    category: {
        type: String
    }
})

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        toLowerCase: true
    },
    password: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    displayName: {
        type: String,
    },
    businessName: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,

    },
    items:[
        {
            type:itemsSchema
        }

    ],
    productCategory: [{
        category: { type: String, required: true },
        categoryImage: { type: String, required: true }
    }],
    orders:[{
        type:orderSchema
    }]

})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 5)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = async function () {
    return  jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username
    },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = async function () {
    return  jwt.sign({
        _id: this._id,
    },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const UsersModel = mongoose.model("Users", userSchema)