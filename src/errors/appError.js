export class AppError extends Error{
constructor(message,statusCode,errors=[]){
super(message);
this.isOperational=true;
this.statusCode=statusCode;
this.status=`${statusCode}`.startsWith("4")?"Fail":"Error";
this.errors=errors;
Error.captureStackTrace(this, this.constructor);
}
}