import { wqiDataService, wqiIdDetailsService } from "./wqi.services";

export const wqiDataController=async(location)=>{
    try{
        const data = await wqiDataService(location);
        return data;
    }catch(err){

        throw err;
    }
}

export const wqiIdDetailsController = async(station_code)=>{
    try{
        const data = await wqiIdDetailsService(station_code);
        return data;
    }catch(err){
        throw err;
    }
}