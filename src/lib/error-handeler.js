import { NextResponse } from "next/server"
import { AppError } from "../errors/appError"

export const errorHandeler=(error)=>{
 if(error instanceof AppError){
    return NextResponse.json({
        success:false,
        message:error.message,
        errors:error.errors||[],
    },
{
    status:error.statusCode,
})
 }
 return NextResponse.json({
    success:false,
    message:"Internal Server Error"
 },
 {status:500,}
)
}