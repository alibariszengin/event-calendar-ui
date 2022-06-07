import React, {useState,useRef} from "react";
import axios from 'axios'
import '../Form.css';
import auth from "../../../../auth/auth.js";
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie'
import useEventListener from '../../../../customHooks/useEventListener'
import useAxios from '../../../../customHooks/useAxios'

function LoginForm(props) {

	const history = useHistory();
	const [show,setShow] = useState("false");
	const loginRef = useRef();
	function UseAxios(mail,password) {
		const {data} = useAxios('http://localhost:5000/api/auth/login',"post",{
		  
			email:mail,
			password: password
	
		  },()=>{
			auth.login(() => {
			  history.replace("/");
			});
		});
		return data;
	}
	useEventListener('keypress',event=>{
		if(event.key==='Enter'){
			handleUserInfo()
		}
	}
	,window);
	const toggleEye=()=>{
		setShow(!show);
	}
	const handleUserInfo =() =>{
	    const form = document.getElementById('loginForm');
	    const inputs=form.children[0].getElementsByTagName('input');
		console.log(form)
	    const mail=inputs.item(0).value;
	    const password=inputs.item(1).value;
  		const data = UseAxios(mail,password);
	    
		Cookies.set("access", data.data.access_token);
	}
	return(
			
		<div  id="loginForm" className="ml-5 inline-block form  " style={{width:"75%"}} >
	
			<div className="mt-5 flex flex-col justify-start items-center mx-auto " style={{width:"75%"}}>
				
				<input type="mail" placeholder="E-posta"></input>
				<div className="relative w-full">
					
					<input  type={show===false?"text":"password"} placeholder="Şifre (en az 6 karakter)"></input>
					<i onClick={toggleEye}  className={show===false?"fa fa-eye":"fa fa-eye-slash"} />
					
				</div>
				
				<a href ="/forgot-password" className="self-end mt-2 cursor-pointer">Şifreni mi unuttun?</a>
			</div>

			<span href ="/" onClick={handleUserInfo}  className="inline-block form-button" ref={loginRef}>Giriş</span>
			
		</div>
	);	

				
	

}	

export default LoginForm;