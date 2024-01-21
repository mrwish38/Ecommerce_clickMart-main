 const ErrorHandler = require("../utils/errorHandler");

module.exports = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // Mongodb duplicate key error
    if(err.code === 11000){
        const message = "Email already exixts!";
        err = new ErrorHandler(message,400);
    }

    res.status(err.statusCode).json({
        success:false,
        message: err.message
    })
}