const asyncErrorHandler =require('../middleware/asyncErrorHandler')
const ErrorHandler = require('../utils/errorHandler')
const jwt = require("jsonwebtoken")
const cookieParser = require('cookie-parser')
const User = require("../models/user")
const authenticatUser = asyncErrorHandler(async(req,res,next)=>{
  const {token} = req.cookies;
  // check if got token 
  if(!token){
    return next(new ErrorHandler("please log in to access the resource"),401)
  }
  // if token then verify token 
  const verfiyToken = jwt.verify(token,process.env.SECRET_KEY)
  // geting user from id which is decode from jwt token 
  res.user = await User.findById(verfiyToken.id)
  next()

})


module.exports = authenticatUser;