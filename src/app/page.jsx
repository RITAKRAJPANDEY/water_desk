//'use client';
import Navbar from '../components/navbar'
import Hero from '../components/hero'
import Cards from '../components/cards'
import Loader from '../components/loading'
import { Suspense } from 'react';

export default  async function App({searchParams}){
    const params = await  searchParams;
    const locationQuery = params.location;
    
    return  <div className="app">
       <div className="home">
        <Navbar/>
        <Hero/> 
        
        {locationQuery&&(
            <Suspense fallback={<div className="fixed inset-0 flex items-center justify-center h-screen w-screen  z-[9999]"> <Loader/></div>}>
                <Cards location={locationQuery}/>
            </Suspense>
            
            )}
       </div>
       </div>
      
}