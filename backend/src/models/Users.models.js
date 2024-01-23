import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";


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
    sizes:[{
        size:{type:String},
        price:{type:Number}
    }],
    description: {
        type: String
    },
    category: {
        type: String
    },
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