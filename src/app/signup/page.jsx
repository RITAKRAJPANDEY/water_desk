'use client';
import Navbar from '../../components/navbar'
import SignUp from '../../components/signup';
export default function App(){
    return  <div className="signUp">
       <div className="home">
        <Navbar/>
        <SignUp/>
       </div>
    </div>
}