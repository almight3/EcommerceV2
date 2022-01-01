const Product = require('../models/product')


// get all products in DB
const getProduct = async (req,res)=>{
     const products = await Product.find();
     res.status(200).json({
         success:true,
         products
     })
}

// Create Product

const createProduct = async(req,res)=>{
    console.log(req.body)
    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
}


module.exports = {getProduct,createProduct};