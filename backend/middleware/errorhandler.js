const ErrorHandler = require("../utils/errorHandler")

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500
    err.message = err.message || "internal server error"

   //invalid mongoDb ID
   if(err.name == "CasteError"){
       const message = `Resouirce not found. Invalid: ${err.path}`;
       err = new ErrorHandler(message,400)
   }


    // Mongoose duplicate key error 
    if(err.code === 11000 ){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHandler(message,400)
    }
  // JWT Error 
  if(err.name === "JsonWebTokenrror" ){
    const message = `Json Web Token is Invalid , try again `
    err = new ErrorHandler(message,400)
}
  
// JWT Expire        
if(err.name === "JsonWebTokenrror" ){
    const message = `Json Web Token is Expires , try again `
    err = new ErrorHandler(message,400)
}

    
    res.status(err.statusCode).json({
        success:false,
        message: err.message,
        status: err.statusCode
    })

}