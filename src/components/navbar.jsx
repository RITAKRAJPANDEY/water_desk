'use client';

import Link from "next/link";

export default function Navbar(){
    return <div className="flex items-centre justify-between bg-[#111827] p-4 ">
        <h1 className="text-5xl px-3 ">
           <span className="text-violet-400">Water</span>
           <span className="text-slate-200">Desk</span> 
            </h1>
            <div className="flex gap-4">
        <Link className="text-[#E5E7EB] bg-violet-600 hover:bg-violet-500 hover:shadow-md active:brightness-120 active:scale-95 rounded-md  px-3 py-2" href={'/'}>
         Home
        </Link>
        <Link className=" border border-green-500  text-green-500 px-3 py-2 rounded cursor-pointer active:brightness-120 active:scale-95" href={'/login'}>Login</Link>
        <Link className="border border-yellow-400  text-yellow-400 px-3 py-2 rounded cursor-pointer active:brightness-120 active:scale-95 " href={'/signup'}>SignUp</Link>
        </div>
    </div>
}