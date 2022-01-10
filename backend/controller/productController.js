const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const asyncErrorHandler = require('../middleware/asyncErrorHandler')
const SearchAndFilter = require('../utils/filter')

// get all products in DB
const getProduct = asyncErrorHandler(async (req,res)=>{
    const productPerPage = 5;
    const searchAndFilter = new SearchAndFilter(Product.find(),req.query).Search().filter().pagination(productPerPage)
    const products = await searchAndFilter.query;
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

// Create New Review or Update the review
const createProductReview =  asyncErrorHandler(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
  
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
  
    const product = await Product.findById(productId);
  
    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
  
    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }
  
    let avg = 0;
  
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    product.ratings = avg / product.reviews.length;
  
    await product.save({ validateBeforeSave: false });
  
    res.status(200).json({
      success: true,
    });
  });
  
  // Get All Reviews of a product
  const getProductReviews =  asyncErrorHandler(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
  
    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }
  
    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  });
  
  // Delete Review
const deleteReview =  asyncErrorHandler(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
  
    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }
  
    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );
  
    let avg = 0;
  
    reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    let ratings = 0;
  
    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }
  
    const numOfReviews = reviews.length;
  
    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
  
    res.status(200).json({
      success: true,
    });
  });


module.exports = {getProduct,createProduct,deleteProduct,updateProduct,detailProduct,createProductReview,getProductReviews,deleteReview};