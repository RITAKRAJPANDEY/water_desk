'use client';

import Link from "next/link";
import { useState } from "react";
import {postSignUp} from "../services/auth.services"
import { useRouter } from "next/navigation";


export default function SignUp() {
    const router =useRouter();
const initialState={
    username:'',
    password:'',
    confirmPassword:''
};// being used by the signUp hook so that we can make an object out of the form data

const [signUp,setSignUp]=useState(initialState);

const [error,setError]=useState(null);// to give custom error message to the user based on what they write 

const[success,setSuccess]=useState(null);

const handleChange=(e)=>{
    const {name,value}=e.target;
    setSignUp((prev)=>({
        ...prev,
        [name]:value
    }));
}// handels the change mainly stores the form data in key value pairs for the object

const handleSubmit=async(e)=>{ 
    e.preventDefault();
   
        if(signUp.password!==signUp.confirmPassword){
            return setError("password do not match !")
        }
        if(!signUp.username|| !signUp.confirmPassword|| !signUp.password){
            return setError("fill all the fields")
        }
    try{
        await  postSignUp(signUp);
        setSuccess(`Account Created !! Welcome ${signUp.username} Redirecting...`)
        setSignUp(initialState);
        setTimeout(()=>router.push('/login'),2000)
        
    }catch(err){
        console.error(err);
        return setError(err.message||"unable to signUp");
}
// main logic which uses the signup service to connect the frontend to the backend and make our system functional

}
    return <div>
        <p className="rounded flex px-135 py-8">{success&&<div className=" rounded text-black bg-white flex px-25 text-1xl">{success}</div>}</p>
        <div className="flex  min-h-screen justify-center items-center">
        <div className="w-full border border-yellow-400 max-w-md bg-slate-900 p-8 rounded-xl shadow-lg">
            
        <h2 className="text-2xl font-bold text-slate-200 text-center mb-6">
    Create Account
  </h2>
  {error&&<div className="text-red-400 flex px-25 text-1xl">{error}
    
  </div>}
            <form onSubmit={handleSubmit} className="flex grid  flex-col-4 gap-1">
                <input placeholder="username" value={signUp.username} onChange={handleChange} name="username" className="text-white p-2 m-2 border border-gray-600 rounded hover:scale-103 hover:brightness-120" />
                <input placeholder="password" type="password" value={signUp.password} onChange={handleChange} name="password" className="text-white p-2 m-2 border border-gray-600 rounded hover:scale-103 hover:brightness-120" />
                <input type="password" placeholder="confirm password" value={signUp.confirmPassword} onChange={handleChange} name="confirmPassword" className="text-white p-2 m-2 rounded border border-gray-700 
                hover:scale-102 hover:brightness-120" />
                <div className="px-39">
                    <button type="submit"   className="rounded hover:shadow-md active:scale-95 border border-mg mx-auto w-fix px-3 py-2 bg-white" >signUp</button>
                </div>
                <div className="flex px-12">
                <pre className="text-gray-500">already have an account </pre>
                <Link className="text-green-400 hover:underline" href={'/login'}>login ?</Link>
                </div>
            </form>
        </div>
    </div>
    </div>
}
