const ErrorHandler = require('../utils/errorHandler')
const asyncErrorHandler = require('../middleware/asyncErrorHandler')
const User = require('../models/user')
const sendJWTToken = require('../utils/genrateJWT')
const userRegister = asyncErrorHandler(async(req,res,next)=>{
    const {name,email,password} = req.body;
    console.log(req.body)
    const user = await User.create({
        name,
        email,
        password,
        profile:{
            public_id: "sample id ",
            url:"sample url"
        }
    });

  sendJWTToken(user,201,res)
    
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

//logoutUser

const logoutUser = asyncErrorHandler((req,res,next)=>{
    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly:true,
    })

    res.status(200).json({
        success:true,
        message:"user loged out "
    })
})

// get user details 
const getUserDetails = asyncErrorHandler(async(req,res)=>{
   
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        user
    })

})


module.exports = {userRegister,loginUser,logoutUser,getUserDetails}