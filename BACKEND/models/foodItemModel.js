const mongoose = require('mongoose')
const User = require("./userModel.js")
const Schema = mongoose.Schema
const foodItemSchema = new Schema({
    donor:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    foodName:{
        type:String,
        required:true,
    },
    quantity:{
        type:String,
        required:true,
    },
    address:{
        street:{
            type:String,
            required:true,
        },
        city:{
            type:String,
            required:true,
        },
        state:{
            type:String,
            required:true,
        },
        country:{
            type:String,
            required:true,
        },
        pinCode:{
            type:String,
            required:true,
        }
    },
    claimedBy:{
        type:Schema.Types.ObjectId,
        ref:"User",
        default:null,
    },
    status:{
        type:String,
        enum:["Available","Claimed","Completion"],
        default:"Available"
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const FoodItem = mongoose.model("FoodItem",foodItemSchema)

module.exports = FoodItem;