import { request } from "node:http"
import { Forbidden } from "../../../errors/forbidden";
import { decodeToken } from "../../auth/auth.utils";
import { NextResponse } from "next/server";

export const authenticateUser = async()=>{
    
const token = request.cookies.get('accessToken')?.value;
if(!token){
    throw new Forbidden();
}
try{
    const decoded =  decodeToken(token);
    const requestHeaders = new Headers(request.headers);
        requestHeaders.set('x-user-id', decoded.id);
        return NextResponse.next({
            request:{
                headers:requestHeaders,
            },
        });
}catch(err){
    throw err;
}

}