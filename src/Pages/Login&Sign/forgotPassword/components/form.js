import { useState, useEffect } from 'react'
import styles from '../../../../shared/loginRegisterInputs.module.css'
import PasswordInput from '../../../../shared/passwordInput'
import MailInput from '../../../../shared/mailInput'
import { Link, useHistory } from 'react-router-dom'
import SvgComponent from '../img-icon/3dots.js'
import onayKutusu from '../img-icon/onay.svg'
import axios from 'axios'
function ForgotForm(props) {
  const history = useHistory();
  const  url =  window.location.href;
  const key = url.slice(url.indexOf("resetPasswordToken")+19,url.length)
  const { type } = props
  const [text, setText] = useState('')
  console.log(key)
  const [infoText, setInfoText] = useState('')
  const [show, setShow] = useState(true)
  const [buttonClicked, setButtonClicked] = useState(false)
  const [validMail,setValidMail] = useState(true)
  const [values, setValues] = useState({
    email: '',
    password: '',
    passwordCheck:''
  })
  useEffect(() => {
    if (type === 'mail') {
      setText('Giriş yaparken sorun mu yaşıyorsun?')
      setInfoText(
        'E-posta adresini gir ve hesabına yeniden girebilmen için sana bir bağlantı gönderelim.',
      )
    } else {
      setText('Şifreni yenile')
      setInfoText('')
    }
  },[])
  const sendRequest = async () => {
    await axios
      .post('http://localhost:5000/api/auth/forgotpassword', {
    
        email: values.email
      })
      .then(
        (response) => {
          console.log(response);
          document.getElementById('animDots').className = 'hidden';
          const onayKutusu = document.getElementById('onayKutusu')
          setInfoText("Bağlantı e-posta adresine gönderildi! E-postana gelen linke tıklayarak şifreni değiştirebilirsin.")
          onayKutusu.style.opacity = '1'
          onayKutusu.style.visibility = 'visible'
        },
        (error) => {

          console.log('Error at Mail request  =>' + error)
        },
      )
  }
  const sendPassword = async () => {
    await axios
      .put(`http://localhost:5000/api/auth/resetPassword?resetPasswordToken=${key}`, {
        password: values.password
      })
      .then(
        (response) => {
          console.log(response);
          document.getElementById('animDots').className = 'hidden';
          const onayKutusu = document.getElementById('onayKutusu')
          const delayInMilliseconds = 3000;
          onayKutusu.style.opacity = '1'
          onayKutusu.style.visibility = 'visible'
          setTimeout(function() {
            history.push("./login")
          }, delayInMilliseconds);
        },
        (error) => {

          console.log('Error at New Password Send  =>' + error)
        },
      )
  }
  const handleValue = (e) => {
    const { id, value } = e.target

    setValues((prevState) => ({
      ...prevState,
      [id]: value,
    }))
  }
  const handleClick = (e) => {

    // const anim = e.target.querySelector('.animButton')
    // console.log(anim)
    // try {
    //   anim.className = 'animButtonChanged'
    // } catch (e) {
    //   console.log("There isn't any class like that")
    // }

    console.log(validMail)
    if(type==="mail"){
      if(validMail && values.email!==""){
        e.target.style.backgroundColor = 'rgba(22, 127, 252, 0.15)'
        setShow(false)
        sendRequest()

      }

    }
    else{

      if(values.password.length>6 && values.password===values.passwordCheck){
        e.target.style.backgroundColor = 'rgba(22, 127, 252, 0.15)'
        setShow(false)
        sendPassword()
      }

    }

    // setTimeout(function () {

    // }, 5000)

    setButtonClicked(true)
  }
  function validMailFunc(e){
    setValidMail(e)
  }
  return (
    <div style={{fontSize:"0.8rem"}} className="h-1/2 ">
      <p className="font-semibold leading-6 mb-10">
        {text}
        <br />
        <span className={"font-normal text-sm"+ show? " text-gray-300" : " bg-gray-500"} >{infoText}</span>
      </p>
      {type === 'mail' ? (
        <MailInput
          type={'text'}
          className={styles.input}
          placeholder={'Email'}
          id={'email'}
          style={{ marginTop: '2em' }}
          handleChange={handleValue}
          isButtonClicked={buttonClicked}
          setButtonClicked={setButtonClicked}
          validFunc={validMailFunc}
        />
      ) : (
        <div>
          <PasswordInput
            isButtonClicked={buttonClicked}
            setButtonClicked={setButtonClicked}
            handleChange={handleValue}
          />

          <PasswordInput
            isButtonClicked={buttonClicked}
            setButtonClicked={setButtonClicked}
            handleChange={handleValue}
            id="passwordCheck"
          />
        </div>
      )}

      <button
        to="./login"
        className={styles.loginButton}
        style={{
          height: '3em',
          position: 'relative',
          transition: 'background 1s linear',
        }}
        onClick={(e) => handleClick(e)}
      >
        <span id="animDots">
          <SvgComponent show={show} />
        </span>
        <span
          className={show ? 'show' : 'hide'}
          style={{
            pointerEvents: 'none',
            transform: 'translateY(0.25em)',
            textTransform: 'capitalize',
          }}
        >
          {props.type === 'mail' ? 'Giriş Bağlantısını Gönder' : text}
        </span>
        <img id="onayKutusu" src={onayKutusu} alt="onay kutusu"></img>

        {/* <span id="onayIcon">Naber</span> */}
        {/* <span className="animButton" style={{ pointerEvents: 'none' }}>
          <span></span>
          <span></span>
          <span></span>
        </span> */}
      </button>
      <h1 style={{fontSize:"1rem"}} className="line">YA DA</h1>
      <Link to="/login">
        <p style={{ marginTop: '1em ' }}>Yeni Hesap Oluştur</p>
      </Link>
    </div>
  )
}
export default ForgotForm
