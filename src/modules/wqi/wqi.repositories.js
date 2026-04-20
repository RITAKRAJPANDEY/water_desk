import { pool } from "../../lib/db";

export const findStateRepo = async (location) => {

    const result = await pool.query(`SELECT * FROM water_quality_data WHERE LOWER(state) = LOWER($1)`, [location]);

    return result.rows||null;
}

export const  findLocationRepo = async(location)=>{
    
    const result = await pool.query(`SELECT * FROM water_quality_data   WHERE location ILIKE $1`,[`%${location}%`]);

    return result.rows||null;
}
export const wqiDetailsRepo = async (station_code)=>{
    const result = await pool.query(`SELECT id, station_code ,wqi FROM water_quality_timeseries WHERE station_code = $1`,[station_code]);
    return result.rows||null;
}