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
        headers:{
        'Content-Type':'application/json'
        }   
    });

    const result = await res.json();
    if(!res.ok){
        throw new Error(result.message||"unbale to fetch data ");
    }
    return result;
}
export const wqiDetails=async(station_code)=>{
    if(!station_code){
        throw new Error ('station_code is required');
    }
    const res = await fetch(`/api/wqi/search/${station_code}`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        }
    });
    const result = await res.json();
    if(!res.ok){
        throw new Error(result.message||'unable to fetch data');
    }
      
    return result;
}