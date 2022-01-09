const express = require('express');
const router = express.Router();
const {userRegister, loginUser,logoutUser,getUserDetails} = require('../controller/userController')
const {authenticatUser,authorizeUser} = require('../middleware/authenticatUser')


// register user
router.post('/register',userRegister)

//login user
router.post('/login',loginUser)

//logout User
router.get('/logout',logoutUser)


// get user details
router.get('/profile',authenticatUser,getUserDetails)






module.exports = router;