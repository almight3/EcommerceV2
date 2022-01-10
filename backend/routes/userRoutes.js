const express = require('express');
const router = express.Router();
const {userRegister, 
    loginUser,
    logoutUser,
    getUserDetails,
    changePassword, 
    getAllUsers,
    userDetails,
    updateUserRole,
    updateUserProfile,
    deleteUser
} = require('../controller/userController')
const {authenticatUser,authorizeUser} = require('../middleware/authenticatUser')


// register user
router.post('/register',userRegister)

//login user
router.post('/login',loginUser)

//logout User
router.get('/logout',logoutUser)

// get user profile details
router.get('/user',authenticatUser,getUserDetails)

//  update password
router.put('/user/password/update',authenticatUser,changePassword)

// update profile
router.post('user/profile/update',authenticatUser,updateUserProfile)

//get all users
router.get('/admin/users',authenticatUser,authorizeUser("admin"),getAllUsers)

// get users details admin
router.get('/admin/users/:id',authenticatUser,authorizeUser('admin'),userDetails)

// update user role
router.put('/admin/users/:id',authenticatUser,authorizeUser('admin'),updateUserRole)

// delete user
router.delete('/admin/users/:id',authenticatUser,authorizeUser('admin'),deleteUser)




module.exports = router;