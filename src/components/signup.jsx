'use client';

import Link from "next/link";
import { useState } from "react";
import {postSignUp} from "../services/auth.services"

export default function SignUp() {
const initialState={
    username:'',
    password:'',
    confirmPassword:''
};
const [signUp,setSignUp]=useState(initialState);
const [error,setError]=useState(null);
const handleChange=(e)=>{
    const {name,value}=e.target;
    setSignUp((prev)=>({
        ...prev,
        [name]:value
    }));
}
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
        setSignUp(initialState);
    }catch(err){
        console.error(err);
        return setError(err.message||"unable to signUp")
    

}

}
    return <div className="flex  min-h-screen justify-center items-center">
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
                <div>
                    <button type="submit" className="rounded border border-mg bg-white" >signUp</button>
                </div>
                <div className="flex px-12">
                <pre className="text-gray-500">already have an account </pre>
                <Link className="text-green-400 hover:underline" href={'/login'}>login ?</Link>
                </div>
            </form>
        </div>
    </div>
}

/**
 * import { useState } from "react"
import {postBlog} from '@/services/blog.api';
const initialState={
    author:'',
        title:'',
        description:''
}
export default function Create (){
    const [blog,setBlog]=useState(initialState);
const handleChange=(e)=>{
    const {name,value}=e.target;
    setBlog((prev) => ({
    ...prev,
    [name]: value
  }));}
const handelSubmit=(e)=>{
    e.preventDefault();
    // console.log(blog);
    const addData=async()=>{
        try{
            await postBlog(blog); 
            setBlog(initialState);
            
     }catch(err){

        console.error(err);
        throw new Error("unable to post blog");
     }
    }
    addData();
}

    return <div className="create">
        <h2 className="text-2xl px-50 text-[#7b2cbf] ">Add A New Blog</h2>
        <div className="flex flex-col gap-3 p-3 max-w-md" >
            <form onSubmit={handelSubmit}>
        <input  name="author" onChange={handleChange} value={blog.author} placeholder="enter your name "/>
        <input name="title" onChange={handleChange} value={blog.title} placeholder="enter title"/>
        <input name="description" onChange={handleChange} value={blog.description} placeholder="enter description"/>
        <div>
            <button type="submit"     className="active:scale-95 active:brightness-120 hover:shadow-md hover:bg-[#00b4d8] rounded p-1 bg-blue-300 flex mx-80">Add</button>
        </div>
        </form>
        </div>
    </div>
}
 */