const ErrorHandler = require('../middleware/errorhandler')
const asyncErrorHandler = require('../middleware/asyncErrorHandler')
const User = require('../models/user')
const sendJWTToken = require('../utils/genrateJWT')
const userRegister = asyncErrorHandler(async(req,res,next)=>{
    const {name,email,password} = req.body;
    const user = await User.create({
        name,
        email,
        password,
        profile:{
            public_id: "sample id ",
            url:"sample url"
        }
    });

  genrateJWTToken(user,201,res)
    
});

// user login
const loginUser = asyncErrorHandler(async(req,res,next)=>{
    const {email,password} = req.body;
    // check if user enter email and password both
    if(!email || !password){
        return next(new ErrorHandler("please enter email and password",400))
    }
    // check user exists
    const user = await User.findOne({email:email}).select("+password")
    
    if(!user){
     return next(new ErrorHandler("please enter valid email or password"))
    }

    // check user entred correct password
    const isPasswordMatched = user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("please enter valid email or password"))
    }

    sendJWTToken(user,200,res)


})

module.exports = {userRegister,loginUser}