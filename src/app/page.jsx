// 'use client';
import Navbar from '../components/navbar'
import Hero from '../components/hero'
import Cards from '../components/cards'
export default  async function App({searchParams}){
    const params = await  searchParams;
    const locationQuery = params.location;
    return  <div className="app">
       <div className="home">
        <Navbar/>
        <Hero/> 
        {locationQuery&&<Cards location={locationQuery}/>}
       </div>
    </div>
}