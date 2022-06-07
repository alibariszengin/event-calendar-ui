import { useDispatch } from 'react-redux'
import LoggedInUser from '../store/action/userAction.js'
import { useSelector } from "react-redux";
import axios from 'axios'
import Cookies from 'js-cookie'
// function SetUser(){
//   const dispatch = useDispatch()
//   const user = useSelector((state) => state.user);
//   axios
//       .get('https://janusbackend.herokuapp.com/api/v1/self/profile')
//       .then(
//         (response) => {
//           user.data=response
//         },
//         (error) => {
//           console.log(error.message)
//         },
//       )
//   dispatch(LoggedInUser(user))
// }

const accessValid=(accessToken)=>{
  return new Promise((resolve, reject)=>{
    axios.get("http://localhost:5000/api/auth/profile",{ headers:{Authorization:`Bearer ${accessToken}`} })
    .then(data=>{
      if(!data.data){
        resolve(false)
      }
      else{

        resolve(true)
      }
    })
  })
}
const hasAccess =async(accessToken) =>{


  if(accessValid(accessToken)===false || accessToken===undefined){
    accessToken=false;
    return accessToken
  }
  return accessToken
}
const checkCookies=async()=>{
  let accessToken =Cookies.get("access")
  console.log("Acess tokenenee")
  console.log(accessToken)

  accessToken = await hasAccess(accessToken)

  if(!accessToken){
    return false;
  }
  else{
    return true;
  }
}
class Auth{
  constructor(){
    this.authenticated=false
  }

  login(cb){
    this.authenticated=true
    cb()
  }

  logout(cb){
    Cookies.set("access",null)
    this.authenticated=false
    cb()
  }

  isAuthenticated(){
    this.authenticated=checkCookies()
    return this.authenticated
  }
}

export default new Auth()

