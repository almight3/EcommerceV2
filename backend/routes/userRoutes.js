const express = require('express');
const router = express.Router();
const {userRegister, loginUser} = require('../controller/userController')


// register user
router.post('/register',userRegister)

//login user
router.post('/login',loginUser)

module.exports = router;