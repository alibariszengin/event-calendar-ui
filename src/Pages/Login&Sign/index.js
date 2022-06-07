
import FormsCard from './Components/FormsCard';
import Navbar from './Components/Navbar/Navbar.js';
import './login&sign.css';
function Login(){


    return(
        <div className="h-screen w-100 flex flex-col">
            <Navbar/>
            <div className="w-100 h-full  flex flex-row justify-center items-center"> <FormsCard/></div>
           
    
     
        </div>
        
    )

}


export default Login;