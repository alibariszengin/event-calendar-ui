import Navbar from '../Login&Sign/Components/Navbar/Navbar.js'
function Flow(){


    return(
        <div className="h-screen w-100 flex flex-col bg-gray-300">
            
            <Navbar text="Profil" to="/profile"/>

            <div className="flex flex-col justify-between items-center mt-32 h-full">
                <div className="bg-white h-full w-1/2 flex justify-center">
                    <p className="text-2xl">Takvim</p>
                </div>
               
               

            </div>
     
        </div>
        
    )

}


export default Flow;