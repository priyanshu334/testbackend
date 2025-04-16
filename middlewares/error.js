// Global error handler
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace
  
    res.status(500).json({
      message: "Something went wrong!",
      error: err.message || err,
    });
  };
  
  module.exports = { errorHandler };
  