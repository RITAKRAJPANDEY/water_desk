import { wqiDataService } from "./wqi.services";

export const wqiDataController=async(location)=>{
    try{
        const data = await wqiDataService(location);
        return data;
    }catch(err){

        throw err;
    }
}

export const wqiIdDetailsController = async(id)=>{
    try{

    }catch(err){

    }
}