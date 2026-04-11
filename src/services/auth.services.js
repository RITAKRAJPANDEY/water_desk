export const postSignUp = async(data)=>{
   
        const res= await  fetch('/api/auth/signup',{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(data)
        })
        const result = await res.json();
        if(!res.ok){
            throw new Error(result.message||"Unable to signUp ");
        }
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
    const result = await res.json();
    if(!res.ok){
        throw new Error(result.message|| "unable to Login");
    }
    return  result;
}