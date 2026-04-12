import { BadRequest } from "../../errors/badRequest";

export const wqiDataService = async (location) => {
    try {
       const record = (await findStateRepo(location) || await findLocationRepo(location));
       if(!record){
        throw new BadRequest('no such location found');
       }
       const wqi = calculateWqiUtil(record);
       return {wqi_no:wqi.no, wqi_status:wqi.status,location:(record.location||record.state)};
    } catch (err) {
        throw err
    }
}