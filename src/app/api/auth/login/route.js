
import { NextResponse } from "next/server";
import { errorHandlerWraper } from "../../../../lib/with-error-handeler";
import { loginController } from "../../../../modules/auth/auth.controller";

export const POST = errorHandlerWraper(async (req) => {
    const data = await req.json();
    const result = await loginController(data);
    return NextResponse.json(result);
});