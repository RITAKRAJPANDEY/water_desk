import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
export const hasher=async(password)=>{
    return await bcrypt.hash(password,10);
};
export const compareHash=async(password,hashedPassword)=>{
    return await bcrypt.compare(password,hashedPassword);
}
export const createAccessToken=(id)=>{
    return  jwt.sign({sub:id},process.env.ACCESSTOKENSECRET,{expiresIn:'15m'});
}

export const decodeToken=(token)=>{
    try{
    return jwt.verify(token,process.env.ACCESSTOKENSECRET);
    }catch(err){
        throw err;
    }
}
export const createCryptoHash=()=>{
    return  crypto.randomBytes(32).toString('hex');
}
export const shaHash =(data)=>{
    return crypto.createHash('sha256').update(data).digest('hex');
}