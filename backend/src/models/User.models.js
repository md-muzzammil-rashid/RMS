import mongoose, { mongo } from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type:Number
    },
    username:{
        type:String,
        required:true
    },
    address: {
        state:{
            type:String
        },
        country:{
            type:String
        },
        city:{
            type:String
        },
        address:{
            type:String
        },
        pincode:{
            type:Number
        }
    },
    hireDate: {
        type:Date
    },
    position: String,
    department: {
        type:String,
        enum: ['Front of House', 'Back of House', 'Management and Administrative', ]
    },
    salary: Number,
    softwareManagement:{
        isAdmin:{type:Boolean},
        canMakeOrders:{type:Boolean},
        canCreateItems:{type:Boolean},
        canAddNewEmployee:{type:Boolean},
        canLogin:{type:Boolean},
        canManageOrderStatus:{type:Boolean}
    },
    restaurant:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Restaurants'
    }
});

userSchema.pre('save', async function (next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 5)
    }
    return next();
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = async function () {
    return await jwt.sign({
        _id: this._id,
    },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = async function () {
    return await jwt.sign({
        _id: this._id,
    },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const UserModel = mongoose.model('Users', userSchema)