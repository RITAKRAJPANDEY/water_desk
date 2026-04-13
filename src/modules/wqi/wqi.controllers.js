import { NextResponse } from "next/server";
import { wqiDataService } from "./wqi.services";

export const wqiDataController=async(location)=>{
    try{
        const data = await wqiDataService(location);
        return data;
    }catch(err){

        throw err;
    }
}