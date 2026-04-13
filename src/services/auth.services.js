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

export const getWqiLocationData = async(locationName)=>{
    
    const res=await fetch(`http://localhost:3000/api/wqi/search/location?location=${encodeURIComponent(locationName)}`,{
        method:'GET',
        'Content-Type':'application/json'
    });

    const result = await res.json();
    if(!res.ok){
        throw new Error(result.message||"unbale to fetch data ")
    }
    return result;
}