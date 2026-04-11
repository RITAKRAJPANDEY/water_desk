'use client';

import { useState } from "react";

export default function Hero(){
    const initialval={};
    const [location,setLocation]=useState(null);
    ;
    const handleClick=async()=>{
       
    }
    return <div className="hero">
        <div className="flex justify-center w-full">
            <h1 className="text-[#E5E7EB] text-6xl ">{location}Know Your WaterQuality</h1>
        </div>
        <div className="flex justify-center gap-4 justify-between w-full py-8 ">
            
            <input   className="bg-[#E5E7EB] text-black rounded-md border px-30 border-black hover:scale-99" placeholder="Enter State / Location" ></input>
            
            <button onClick={handleClick} className="rounded-md bg-black text-white p-2 border-2 border-black  hover:bg-[#393c43] active:scale-95">search</button>
        </div>
    </div>
}