import styles from './loginRegisterInputs.module.css'
import React, { useState } from 'react'
const MailInput =(props) =>{

  const [checkMail, setCheckMail] = useState(false)
  let clicked = props.isButtonClicked;
  const [mail , setMail ] = useState('')


  const changeMail = (e) => {

    const mailValue = e.target.value;
    console.log(mailValue);
    setMail(mailValue);
    checkValidMail();
  }
  const checkValidMail = () => {
    props.setButtonClicked(false)
    if(typeof mail !== "undefined"){
      let lastAtPos = mail.lastIndexOf('@');
      let lastDotPos = mail.lastIndexOf('.');

      if ((lastAtPos < lastDotPos && lastAtPos > 0 && mail.indexOf('@@') == -1 && lastDotPos > 2 && (mail.length - lastDotPos) > 2) ) {

        setCheckMail(true);

      }
      else{
        setCheckMail(false);
      }
      if(clicked){
        props.validFunc(checkMail);

      }
   }


  }
  return(

      <div className={styles.inputGroup}>


        <input type={'text'}
             className={styles.input}
             placeholder={'Email'}
             id={'email'}
             value={props.value}
             autoComplete="off"
             onChange={function(e){
               changeMail(e);
               props.handleChange(e);
             }}/>
        <div className={clicked ? (checkMail ? "hidden" :  "block mb-2") : "hidden"}><p className="text-xs" style={{color:"#D63835"}}>Lütfen gecerli bir mail adresi giriniz.</p></div>
        {/* <div className="absolute -bottom-3">
             { clicked  ?

               checkMail ? '':<p className="text-xs" style={{color:"#D63835"}}>Lutfen gecerli bir mail adresi giriniz.</p>

               : ''

             }
        </div> */}
      </div>
  )
}

export default MailInput;



