const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/features");

// Create Product
exports.createProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// Get All Product
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  const productPerPage = 8;
  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

    let products = await apiFeature.query;

  let filteredProductsCount = products.length;

  apiFeature.pagination(productPerPage);

  products = await apiFeature.query.clone();

  res.status(200).json({
    success: true,
    products,
    productsCount,
    productPerPage,
    filteredProductsCount,
  });
});


// Get Product Details
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Update Product
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    if (!singleProduct) {
      return next(new ErrorHandler("Product not found", 404));
    }
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// Delete Product
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    if (!singleProduct) {
      return next(new ErrorHandler("Product not found", 404));
    }
  }

  product = await Product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });
});

// Review Product
exports.reviewProduct = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewd = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if(isReviewd) {
    product.reviews.forEach ((rev) => {
      if(rev.user.toString() === req.user._id.toString()){
        (rev.rating = rating) , (rev.comment = comment);
      }
    });
  }else{
    product.reviews.push(review);
    product.noOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  }) 
  
  product.ratings = avg / product.reviews.length;

  await product.save({validateBeforeSave: false});

  res.status(200).json({
    success:true,
  })
});


// Get all reviews of a product
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
  const singleProduct = await Product.findById(req.query.id);

  if (!singleProduct) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: singleProduct.reviews,
  });
});


// Delete Review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const singleProduct = await Product.findById(req.query.productId);

  if (!singleProduct) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = singleProduct.reviews.filter((rev) => {
    rev._id.toString() !== req.query.id.toString()
  });

  let avg = 0;

  if (reviews.length > 0) {
    reviews.forEach((rev) => {
      avg += rev.rating;
    });

    avg = avg / reviews.length;
  }

  const ratings = isNaN(avg) ? 0 : avg;

  const noOfReviews = reviews.length;

  await Product.findByIdAndUpdate(req.query.productId, {
    reviews,ratings,noOfReviews},{
      new:true,
      runValidators:true,
      useFindAndModify:false
  });

  res.status(200).json({
    success: true,
    reviews: singleProduct.reviews,
  });
});