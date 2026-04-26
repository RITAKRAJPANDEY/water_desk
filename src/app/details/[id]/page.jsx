'use client'
import Details from "../../../components/details";
import Navbar from "../../../components/navbar";
import Loader from '../../../components/loading';
import { Suspense } from "react";

export default  function App(){
    return <div className="details">
        <Navbar/>
       <Suspense fallback={<Loader/>}>
         <Details/>
       </Suspense>
    </div>
}