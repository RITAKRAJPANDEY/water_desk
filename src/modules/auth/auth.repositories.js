import { AppError } from "../../errors/appError";
import { pool } from "../../lib/db";

export const addUserRepo = async (username, hashedPassword) => {
    const result = await pool.query(`INSERT  INTO gov_users (username , password_hash) VALUES ($1,$2) RETURNING created_at,username `, [username, hashedPassword]);
    return result.rows[0];
};

export const findUserRepo = async (username) => {
    const result = await pool.query(`SELECT username,password_hash,id FROM gov_users WHERE LOWER(username)=LOWER($1)`, [username]);
    return result.rows[0];
};


export const addRefreshToken = async ({ tokenHash, user_id }) => {
    const result = await pool.query(`INSERT INTO refresh_tokens (user_id,token_hash) VALUES ($1,$2) RETURNING created_at`, [user_id, tokenHash]);
    return result.rows[0];
};

export const getRefreshToken = async (token) => {
    const result = await pool.query(`SELECT user_id,revoked,expires_at FROM refresh_tokens WHERE token_hash=$1`, [token]);
    return result.rows[0];
};

export const revokeAllTokensRepo = async (user_id) => {
    const result = await pool.query(`UPDATE refresh_tokens SET revoked=TRUE WHERE user_id=$1 RETURNING created_at`, [user_id]);
    return result.rows[0];
};

export const storeNewRefreshToken = async ({ refreshToken,newRefreshToken, user_id }) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const lockRow = await client.query(`SELECT id FROM refresh_tokens WHERE token_hash=$1 and user_id=$2 FOR UPDATE`, [refreshToken, user_id]);

        if (lockRow.rowCount === 0) {
            throw new AppError('INVALID_REFRESH_TOKEN', 401);
        };

        const revokeToken= await client.query(`UPDATE refresh_tokens SET revoked = $1 , replaced_with=$2 WHERE token_hash =$3`,[true,newRefreshToken,refreshToken]);

        if(revokeToken.rowCount===0){
            throw new AppError('TOKEN ALREADY REVOKED ',401);
        }

        const result = await client.query(`INSERT INTO refresh_tokens (user_id,token_hash) VALUES ($1,$2) RETURNING created_at`,[user_id,newRefreshToken]);

        await client.query('COMMIT');

        return result.rows[0];

    } catch (err) {
        await client.query(`ROLLBACK`);
        throw err;
    } finally {
        client.release();
    }
};
/**
 * multi_tenant_v1=> \d refresh_tokens
                                Table "public.refresh_tokens"                                                 
    Column     |           Type           | Collation | Nullable |          Default           
---------------+--------------------------+-----------+----------+----------------------------
 id            | uuid                     |           | not null | gen_random_uuid()
 refresh_hash  | text                     |           | not null | 
 revoked       | boolean                  |           |          | false
 expires_in    | timestamp with time zone |           | not null | now() + '7 days'::interval
 created_at    | timestamp with time zone |           | not null | now()
 user_id       | uuid                     |           |          | 
 replaced_with | text                     |           |          | 
Indexes:
    "refresh_tokens_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "fk_refresh_token_tenant_users" FOREIGN KEY (user_id) REFERENCES tenant_users(id) ON UPDATE CASCADE ON DELETE CASCADE                                                                                                    
               
 */