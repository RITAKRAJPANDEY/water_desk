import { NextResponse } from "next/server";
import { wqiIdDetailsController } from "../../../../../modules/wqi/wqi.controllers";

export const GET = async(req,{params})=>{
    try{
    const {id} = await params;
    const result = await wqiIdDetailsController(id);

    return NextResponse.json({success:true,data:result},{status:200});
    }catch(err){
        return NextResponse.json({success:false,message:'unable to fetch data'},
            {status:500}
        );
        throw err;
    }
}