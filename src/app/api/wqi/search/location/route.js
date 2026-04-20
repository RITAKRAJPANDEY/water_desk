import { NextResponse } from "next/server";
import { wqiDataController } from "../../../../../modules/wqi/wqi.controllers"

export const GET = async(request) => {
    try {
        const location = request.nextUrl.searchParams.get('location');
        console.log(location);
        if (!location) {
          return NextResponse.json(
                { message: "Location parameter is required" }, 
                { status: 400 }
            );
        }
        const data = await wqiDataController(location);
        return NextResponse.json({
            success:true,
            data:data
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json({
            message:"Internal Server Error"
        },{status:500})
        
    }
};
