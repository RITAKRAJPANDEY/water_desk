import { BadRequest } from "../errors/badRequest"

export const postSignUp = async(data)=>{
   
        const res= await  fetch('/api/auth/signup',{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(data)
        })
        if(!res.ok){
            throw new BadRequest("unable to signup try again");
        }
   const result = await res.json();
   return result;
}

export const postLogin = async(data)=>{
    const res = await fetch('/api/auth/login',{
        method:"POST",
        headers:{
            "Content-Type":'application/json'
        },
        body:JSON.stringify(data),
        credentials:'include',
    });
    if(!res.ok){
        throw new BadRequest('Unable to Login')
    }
    return await res.json();
}