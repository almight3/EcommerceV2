const express = require('express');
const router = express.Router()
const {getProduct,createProduct,detailProduct,deleteProduct,updateProduct} = require('../controller/productController')


// fetching all products
router.get('/products',getProduct)
//create new product
router.post('/products/new',createProduct)
// product details
router.get('/products/:id',detailProduct)
// update product 
router.put('/products/:id/edit',updateProduct)
// delete products
router.delete('/products/:id',deleteProduct)


module.exports = router;