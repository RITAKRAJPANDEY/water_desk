'use client';
import Link from "next/link";
import { useState } from "react";
import { postLogin } from "../services/auth.services";
export default function Login(){
   const initialState={
    password:'',
    username:''
   }

   const [login,setLogin]=useState(initialState);
   const [error,setError]=useState(null);
   const handelChange=(e)=>{
    const {name,value}=e.target;
    setLogin((prev)=>({
        ...prev,
        [name]:value
    }));
   }
   const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
        setError("");
        if(!login.username){
           return setError('username is required');
        }
        if(!login.password){
           return setError('password is required');
        }
        await postLogin(login);
        setLogin(initialState);
    }catch(err){
        console.error(err);
        setError(err.message || 'Login failed');
    }
   }
    return <div className="login">
        <div className="flex  min-h-screen justify-center items-center">
        <div className="w-full border border-green-400 max-w-md bg-slate-900 p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-slate-200 text-center mb-6">
    Login To Your Account
  </h2>
  {error&&<div className="text-red-400 px-10">{error}</div>}
            <form onSubmit={handleSubmit} className="flex grid  flex-col-4 gap-1">
                <input placeholder="username" value={login.username} name="username" onChange={handelChange} className="text-white p-2 m-2 border border-gray-600 rounded hover:scale-103 hover:brightness-120" />
                <input placeholder="password" type="password" value={login.password} name="password" onChange={handelChange} className="text-white p-2 m-2 border border-gray-600 rounded hover:scale-103 hover:brightness-120" />
                <button type="submit" className="text-black bg-white px-3 py-1.5 hover:shadow-md w-fix mx-auto active:scale-95 rounded border border-black">Login</button>
                <div className="flex px-12">
                <pre className="text-gray-500"> dont have an account </pre>
                <Link className="text-yellow-400 hover:underline" href={'/signup'}>signUp ?</Link>
                </div>
            </form>
        </div>
    </div>
    </div>
}