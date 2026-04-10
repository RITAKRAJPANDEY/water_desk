'use client';
import Login from '../../components/login';
import Navbar from '../../components/navbar'
export default function App(){
    return  <div className="login">
       <div className="home">
        <Navbar/>
        <Login/>
       </div>
    </div>
}