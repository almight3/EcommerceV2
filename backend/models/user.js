const mongoose = require('mongoose');
const {Schema} = mongoose;
var jwt = require('jsonwebtoken');
var validator = require('validator');

const userSchema = new Schema ({
   name:{
       type:String,
       require:[true,"Please Enter your Name"],
       maxlength:[30,"you exceed charcter limit"],
       minlength:[4,"name should not be smaller then 4 character"]
   },
   email:{
        type:String,
        required:[true,"Please Enter Your Email "],
        unique: true,
        validate:[validator.isEmail,"Please enter valid email id "]
    },
    password:{
        type:String,
        required:[true,"Please Enter Your Password"],
        minlength:[8,"Password should be greater then 8 character"],
        select:false
    },
    profile:{
        public_id:{
            type:String,
            required:true
        },
        image_url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
}) 


const User = mongoose.model('User',userSchema)
module.exports = User;