import EyeIconShow from './eye-icons/eyeIcon-show'
import EyeIconNotShow from './eye-icons/eyeIcon-notShow'
import styles from './loginRegisterInputs.module.css'
import React, { useState } from 'react'
const PasswordInput =(props) =>{
  const [showPassword, setShowPassword] = useState(false)
  const [checkPassword, setCheckPassword] = useState(false)
  const clicked = props.isButtonClicked;
  const [password , setPassword ] = useState('')
  const changeShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const changePassword = (e) => {
    const pass = e.target;
    console.log(pass.value);
    setPassword(pass.value);
    checkValidPassword();
  }
  const checkValidPassword = () => {

    props.setButtonClicked(false)

    if(password !== undefined && password.length >= 5){
      setCheckPassword(true);
      console.log(checkPassword);
    }
    else{
      setCheckPassword(false);

    }
    if(clicked){
      props.validFunc && props.validFunc(checkPassword);
    }



  }
  return(
    <div id="password-div" className={styles.inputGroup}>
        <input type={`${showPassword ? 'text' : 'password'}`}

               onChange={function(e){
                changePassword(e);
                props.handleChange &&  props.handleChange(e);
              }}
               className={styles.input}
               placeholder={'Şifre ( en az 6 karakter )'}
               value = {props.value}
               id={props.id ||'password'}

               >
        </input>
        <div
          onClick={changeShowPassword}
          className={'cursor-pointer z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-1 pr-3 py-3'}>
          {showPassword === false ? <EyeIconNotShow/>: <EyeIconShow/> }
        </div>
        <div className={clicked ? (checkPassword ? "hidden" :  "block text-start mb-2") : "hidden"}><p className="text-xs" style={{color:"#D63835"}}>Şifreniz 6 karakter içermelidir.</p></div>
          {/* { clicked  ?

            checkPassword ? '':<div className=""><p className="text-xs" style={{color:"#D63835"}}>Şifreniz 6 karakter içermelidir.</p></div>

            : ''

          } */}

      </div>
  )
}

export default PasswordInput;



