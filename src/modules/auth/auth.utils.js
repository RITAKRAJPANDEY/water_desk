import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
export const hasher=async(password)=>{
    return await bcrypt.hash(password,10);
};
export const compareHash=async(password,hashedPassword)=>{
    return await bcrypt.compare(password,hashedPassword);
}
export const createAccessToken=(username)=>{
    return jwt.sign({sub:username},process.env.ACCESSTOKENSECRET,{expiresIn:'15m'});
}
export const createCryptoHash=()=>{
    return  crypto.randomBytes('32').toString('hex');
}