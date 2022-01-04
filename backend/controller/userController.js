const ErrorHandler = require('../middleware/errorhandler')
const asyncErrorHandler = require('../middleware/asyncErrorHandler')
const User = require('../models/user')

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

    res.status(201).json({
        success: true,
        user
    });
    
});

module.exports = {userRegister}