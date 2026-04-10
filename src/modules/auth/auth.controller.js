import { verifyUserServices } from "./auth.services"

export const verifyUserController =async(data)=>{
try{
const user = verifyUserServices(data);
return Response.json({
    success:true,
    username:user.username,
    createdAt:user.createdAt
});
}catch(err){
console.error(err);
}
}

export const loginController=async(data)=>{
const user = await ServiceWorker(data);
return Response.json({
    success:true,
    refresh_token:user.refreshToken,
    access_token:user.accessToken,
    createdAt:user.created_at
});
}