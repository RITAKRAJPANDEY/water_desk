import { NextResponse } from "next/server";
import { wqiIdDetailsController } from "../../../../../modules/wqi/wqi.controllers";

export const GET = async(req,{params})=>{
    const {id} = await params;
    const result = wqiIdDetailsController(id);
    return NextResponse.json({result});
}