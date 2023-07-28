
class ErrorHandler extends Error {
  constructor(message , statusCode)
  {
    super(message);
    this.statusCode = statusCode
  }
}

export const errorMiddleware = (err, req, res, next) => {  //any error that occurs in catch block that arrives here will be internal server error
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;
  
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  };
  
  export default ErrorHandler;