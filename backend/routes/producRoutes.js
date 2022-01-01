const express = require('express');
const router = express.Router()
const {getProduct,createProduct} = require('../controller/productController')


// fetching all products
router.get('/products',getProduct)
//create new product
router.post('/products/new',createProduct)




module.exports = router;