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