const mongoose = require('mongoose');
const {Schema} = mongoose;
const  jwt = require('jsonwebtoken');
const validator = require('validator');
const bcrypt = require('bcrypt');

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
        url:{
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

// hashing password
userSchema.pre("save",async function(next){

    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10)
})
// genrating JWT Token
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.SECRET_KEY,
        {
            expiresIn:process.env.EXPIRE,
        })
}
// comapare password
userSchema.methods.comparePassword = async function(userPassword){
     return await bcrypt.compare(userPassword,this.password)
}



const User = mongoose.model('User',userSchema)
module.exports = User;