const express = require('express');
const router = express.Router();
const {userRegister, loginUser,logoutUser} = require('../controller/userController')


// register user
router.post('/register',userRegister)

//login user
router.post('/login',loginUser)

//logout User
router.get('/logout',logoutUser)
module.exports = router;