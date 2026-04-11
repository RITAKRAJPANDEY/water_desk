'use client';
import Navbar from '../components/navbar'
import Hero from '../components/hero'
export default function App(){
    return  <div className="app">
       <div className="home">
        <Navbar/>
        <Hero/>
       </div>
    </div>
}