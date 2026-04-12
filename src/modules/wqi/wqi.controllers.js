import { NextResponse } from "next/server";
import { wqiDataService } from "./wqi.services";

export const wqiDataController=async(location)=>{
    try{
        const data = await wqiDataService(location);
        return NextResponse.json({
            success:true,
            location:data.location
        })
    }catch(err){
        throw err;
    }
}