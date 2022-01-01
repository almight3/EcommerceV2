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

// find product details
const detailProduct = async(req,res)=>{
    const {id} = req.params;
    const product = await Product.findById(id);
    if(!product){
        return res.status(500).json({
            success:false,
            message:"product not found"
        })
    }
    res.status(200).json({
        success:true,
        product
    })
}

// update product

const updateProduct = async (req,res)=>{
    const {id} = req.params;
    const product = await Product.findById(id);
    if(!product){
        return res.status(500).json({
            success:false,
            message:"product not found"
        })
    }
    await Product.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
    })

}









// delete product
const deleteProduct = async(req,res)=>{
    const {id} = req.params;
    const product = await Product.findById(id);
    if(!product){
        return res.status(500).json({
            success:false,
            message:"product not found"
        })
    }
    await product.remove();
    res.status(200).json({
        success:true,
        message: "product deleted"
    }) 


}



module.exports = {getProduct,createProduct,deleteProduct,updateProduct,detailProduct};