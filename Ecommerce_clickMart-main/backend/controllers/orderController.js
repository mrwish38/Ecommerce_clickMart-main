const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");

// Create a new Order
exports.newOrder = catchAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });
  
  res.status(200).json({
    success: true,
    order,
  });

});

// Get Single Order
exports.getSingleOrder = catchAsyncError( async(req,res,next) => {
  const order = await Order.findById(req.params.id).populate("user","name email");

  if(!order){
    return next(new ErrorHandler("No Order Exists With This Id",404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// Get Loged in Users Order
exports.getMyOrders = catchAsyncError( async(req,res,next) => {
  const orders = await Order.find({user: req.user._id});

  res.status(200).json({
    success: true,
    orders,
  });
});

// Get All Orders --Admin
exports.getAllOrders = catchAsyncError( async(req,res,next) => {
  const orders = await Order.find();

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    orders,
    totalAmount,
  });
});

// Delete Order --Admin
exports.deleteOrder = catchAsyncError( async(req,res,next) => {
  const order = await Order.findById(req.params.id);
  
  if(!order){
    return next(new ErrorHandler("No Order Exists With This Id",404));
  }
  await order.remove();
  res.status(200).json({
    success: true,
  });
});


