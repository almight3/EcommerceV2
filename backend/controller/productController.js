const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const asyncErrorHandler = require('../middleware/asyncErrorHandler')

// get all products in DB
const getProduct = asyncErrorHandler(async (req,res)=>{
    const products = await Product.find();
    res.status(200).json({
        success:true,
        products
    })
})
// Create Product
const createProduct = asyncErrorHandler(async(req,res)=>{
    console.log(req.body)
    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
});

// find product details
const detailProduct = asyncErrorHandler(async(req,res,next)=>{
    // const {id} = req.params;
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("product not found",404))
    }
    res.status(200).json({
        success:true,
        product
    })
});
// update product

const updateProduct = asyncErrorHandler(async (req,res,next)=>{
    const {id} = req.params;
    const product = await Product.findById(id);
    if(!product){
        return next(new ErrorHandler("product not found",404))
    }
    await Product.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
    })
    res.status(200).json({
        success:true,
        product
    })

});

// delete product
const deleteProduct = asyncErrorHandler(async(req,res,next)=>{
    const {id} = req.params;
    const product = await Product.findById(id);
    if(!product){
        return next(new ErrorHandler("product not found",404))
    }
    await product.remove();
    res.status(200).json({
        success:true,
        message: "product deleted"
    }) 


})



module.exports = {getProduct,createProduct,deleteProduct,updateProduct,detailProduct};