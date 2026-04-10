import { pool } from "../../lib/db";

export const addUserRepo=async(username,hashedPassword)=>{
const result = await pool.query(`INSERT  INTO gov_users (username , password_hash) VALUES ($1,$2) RETURNING created_at,username `,[username,hashedPassword]);
return result.rows[0];
}

export const findUserRepo=async(username)=>{
const result = await pool.query(`SELECT username,password_hash,id FROM gov_users WHERE LOWER(username)=LOWER($1)`,[username]);
return result.rows[0];
}

export const addRefreshToken=async({tokenHash,user_id})=>{
const result = await pool.query(`INSERT INTO refresh_tokens (user_id,token_hash) VALUES ($1,$2) RETURNING created_at`,[user_id,tokenHash]);
return result.rows[0];
}
export const rotateRefreshToken
