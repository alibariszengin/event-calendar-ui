import React, { useState } from "react";
import axios from "axios";
import "../Form.css";
import auth from "../../../../auth/auth.js";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import Alert from "sweetalert2";

function SignForm(props) {
  const history = useHistory();
  const [show, setShow] = useState("false");
  const [error, setError] = useState(" ");
  const toggleEye = () => {
    setShow(!show);
  };
  const handleUserInfo = async () => {
    const form = document.getElementById("signForm");
    const inputs = form.children[0].getElementsByTagName("input");
    const name = inputs.item(0).value;
    const mail = inputs.item(1).value;
    const password = inputs.item(2).value;

    console.log(inputs);
    await axios
      .post("http://localhost:5000/api/auth/register", {
        name: name,
        email: mail,
        password: password,
        role: "user",
      })
      .then(
        (response) => {
			console.log(response.data.access_token)
          Cookies.set("access", response.data.access_token);
          auth.login(() => {
            history.replace("/");
          });
        },
        (err) => {
          setError("Check your credentials!")
          console.log(err.message);
        }
      );
  };
  const userRights = ()=>{
          Alert.fire({
          title: "User Rights",
          text: "In our application, the user has the rights of share their informations with their approval.",
          icon: "info",
        });
  }
  return (
    <div
      id="signForm"
      className="ml-5 inline-block form"
      style={{ width: "75%", fontSize:"1rem" }}
      
    >
      <div className="mt-5 mx-auto " style={{ width: "90%" }}>
        <input type="text" placeholder="Ad Soyad"></input>
        <input type="mail" placeholder="E-posta"></input>
        <div className="relative">
          <input
            type={show === false ? "text" : "password"}
            placeholder="Şifre (en az 6 karakter)"
          ></input>
          <i
            onClick={toggleEye}
            className={show === false ? "fa fa-eye" : "fa fa-eye-slash"}
          />
        </div>
        <p className="mt-2">
          Kullanıcı haklari sözlesmesini{" "}
          <span className="cursor-pointer" onClick={()=>(userRights())}>
            buradan 
          </span>
           {" "}okuyabilirsiniz.
        </p>
      </div>
      <span style={{color:"red"}}>{error}</span>
      <p
        href="/#"
        onClick={handleUserInfo}
        className="inline-block form-button"
      >
        Kaydol
      </p>
    </div>
  );
}

export default SignForm;
