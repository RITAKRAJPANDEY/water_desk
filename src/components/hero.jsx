'use client';

import { useState } from "react";

export default function Hero() {
    const [location, setLocation] = useState();
    const [error, setError] = useState();
    const handleChange = async (e) => {
        setLocation(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setError("");
            if (!location) {
                setError('Enter location');
                setTimeout(()=>setError(''),2000)
            }
            
        } catch (err) {

        }
    }

    return <div className="hero">
        <div className="py-20">
            <div className="flex justify-center w-full">
                <h1 className="text-[#E5E7EB] text-6xl ">
                    <span >Know Your </span><span className="text-violet-400"> Water</span><span className="text-slate-200">Quality</span>
                </h1>
            </div>
            <div className="flex justify-center gap-4 justify-between w-full py-20 ">
                <form onSubmit={handleSubmit}>
                    <input value={location} onChange={handleChange} name="location" className="bg-[#E5E7EB] text-2xl text-black rounded-md border px-30 border-black hover:scale-99" placeholder="Enter State / Location" ></input>
                    <button type="submit" className="rounded-md cursor-pointer bg-black text-white p-2 border-2 border-black  hover:bg-[#393c43] active:scale-95">search</button>
                </form>
            </div>
            <div className="flex justify-center">
                {error && <p className="text-red-400  bg-black rounded  p-2  ">{error}</p>}
            </div>
        </div>
    </div>
}