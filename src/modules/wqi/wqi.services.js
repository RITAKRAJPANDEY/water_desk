import { BadRequest } from "../../errors/badRequest";
import { findLocationRepo, findStateRepo } from "./wqi.repositories";
import { computeWqiResult } from "./wqi.utils";

export const wqiDataService = async (location) => {
    try {
        let record = await findStateRepo(location);
        
        // If state search returns empty, try location search
        if (!record || record.length === 0) {
            record = await findLocationRepo(location);
        }
        
        if (!record || record.length === 0) {
            throw new BadRequest('no such location found');
        }
        
        return record.map((r) => ({
            location: (r.location || r.state),
            ...computeWqiResult(r)
        }));
    } catch (err) {
        throw err
    }
}