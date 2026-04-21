import { BadRequest } from "../../errors/badRequest";
import { findLocationRepo, findStateRepo, wqiDetailsRepo } from "./wqi.repositories";
import { computeWqiResult, getAlarmingParameters } from "./wqi.utils";

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
            station_code:(r.station_code),
            ...computeWqiResult(r)
        }));
    } catch (err) {
        throw err
    }
}

export const wqiIdDetailsService = async (station_code) => {
    try {
        const record = await wqiDetailsRepo(station_code);
        if (!record || record.length === 0) {
            throw new BadRequest('no such id exists');
        }
        return record.map((r)=>({
            stationCode:r.station_code,
            time:r.recorded_at,
            id:r.id,
            wqi:r.wqi,
            ph:r.ph,
            dissolved_oxygen:r.dissolved_oxygen,
            bod:r.bod,
            total_coliform:r.total_coliform
        }));
    } catch (err) {
        throw err;
    }
}