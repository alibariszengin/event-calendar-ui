import React, { useState, useRef } from "react";
import axios from "axios";
import "../Form.css";
import Cookies from "js-cookie";
import auth from "../../../../auth/auth.js";
import { useHistory } from "react-router-dom";
import useEventListener from "../../../../customHooks/useEventListener";
import useCheckCredantials from "./CheckCredantials";
function LoginForm(props) {
  const history = useHistory();
  const [show, setShow] = useState("false");
  const loginRef = useRef();
  function UseAxios(mail, password) {
    axios.post(`http://localhost:5000/api/auth/login`, {
      email: mail,
      password: password,
    }).then((res) => {
      Cookies.set("access", res.data.access_token);
     
      auth.login(() => {
        history.replace("/");
      });
  })
  .catch((err) => {
      console.log(err.message)
  })
    
  
  }
  useEventListener(
    "keypress",
    (event) => {
      if (event.key === "Enter") {
        HandleUserInfo();
      }
    },
    window
  );
  const toggleEye = () => {
    setShow(!show);
  };
  const HandleUserInfo = () => {
    const form = document.getElementById("loginForm");
    const inputs = form.children[0].getElementsByTagName("input");
    console.log(form);
    const mail = inputs.item(0).value;
    const password = inputs.item(1).value;
    const data = UseAxios(mail,password)


  };
  return (
    <div
      id="loginForm"
      className="ml-5 inline-block form  "
      style={{ width: "75%" }}
    >
      <div
        className="mt-5 flex flex-col justify-start items-center mx-auto "
        style={{ width: "75%" }}
      >
        <input type="mail" placeholder="E-posta"></input>
        <div className="relative w-full">
          <input
            type={show === false ? "text" : "password"}
            placeholder="Şifre (en az 6 karakter)"
          ></input>
          <i
            onClick={toggleEye}
            className={show === false ? "fa fa-eye" : "fa fa-eye-slash"}
          />
        </div>

        <a href="/forgot-password" className="self-end mt-2 cursor-pointer">
          Şifreni mi unuttun?
        </a>
      </div>

      <span
        href="/"
        onClick={HandleUserInfo}
        className="inline-block form-button"
        ref={loginRef}
      >
        Giriş
      </span>
    </div>
  );
}

export default LoginForm;
