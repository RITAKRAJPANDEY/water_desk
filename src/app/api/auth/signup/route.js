import { NextResponse } from "next/server";
import { verifyUserController } from "../../../../modules/auth/auth.controller";
import { errorHandlerWraper } from "../../../../lib/with-error-handeler";
// import {errorHandlerWraper} from '../../../../lib/with-error-handeler';
export const POST = errorHandlerWraper(async(req)=>{
    const data= await req.json();
    const result = await verifyUserController(data);
  return NextResponse.json(result);
});