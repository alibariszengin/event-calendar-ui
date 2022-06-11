import useAxios from "../../../../customHooks/useAxios";
import auth from "../../../../auth/auth.js";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
const useCheckCredantials=(props)=>{
    const [mail, setMail] = useState()
    const [password, setPassword] = useState()
    const history = useHistory();
    const { response, loading, error } = useAxios({
        url: `/auth/login`,
        method: "post",
        body: {
            email: mail,
            password: password,
        },
        cb: () => {
            
            auth.login(() => {
                history.replace("/");
                
            });
        },
    });
    useEffect(()=>{
        const form = document.getElementById("loginForm");
        const inputs = form.children[0].getElementsByTagName("input");
        console.log(form);
        setMail(inputs.item(0).value)
        setPassword(inputs.item(1).value)
        if(response && response.data !==undefined)
            Cookies.set("access", response.data.access_token);
    },[response, loading, error])
    
    //const [data, setData] = useState([]);

    
    return(response)

}
export default useCheckCredantials;