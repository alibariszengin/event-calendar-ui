import Navbar from "../Login&Sign/Components/Navbar/Navbar.js";
import axios from "axios";
import auth from "../../auth/auth";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import LoggedInUser from "../../store/action/userAction.js";
function Dashboard() {
  const user = useSelector((state) => state.user);
  const [load, setLoad] = useState(false);
  const [err, setErr] = useState("");
  const dispatch = useDispatch();
  const [img,setImg] = useState();
  function UseDispatch(res) {
    dispatch(LoggedInUser(res));
  }
  const getImage = async () => {
    // const getProfileAxios=axios.create({
    //   baseURL:"https://janusbackend.herokuapp.com",

    // })

    const access = Cookies.get("access");
    await axios
      .get("http://localhost:5000/api/users/image/get")
      .then(
        (response) => {
          console.log("img");
          console.log(response);
          // const based64 = new Buffer.from(response.data).toString('base64');
          // setImg(based64)
          
          setImg(response.config.url)
          
        },
        (error) => {
          console.log(error.message);
          setErr(error.message);
        }
      );
  };
  const getUserInfos = async () => {
    // const getProfileAxios=axios.create({
    //   baseURL:"https://janusbackend.herokuapp.com",

    // })

    const access = Cookies.get("access");
    await axios
      .get("http://localhost:5000/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      .then(
        (response) => {
          console.log("Profile res");
          user.data = response.data;
          user.status = response.status;
          user.data.name = `${response.data.first_name} ${response.data.last_name}`;

          UseDispatch(user);
          console.log(user);
          setLoad(true);
        },
        (error) => {
          console.log(error.message);
          setErr(error.message);
        }
      );
  };

  useEffect(() => {
    getImage();
    getUserInfos();

  }, []);
  if (!load) {
    if (err) {
      return <Redirect to="/login" />;
    } else {
      return <div>Loading</div>;
    }

    // <div className="">{err ? err : "Loading"}</div>
  }
  return (
    <div className="h-screen w-100 flex flex-col" style={{background:"#f1ffad"}}>
      <Navbar text="Çıkış Yap" to="/login" />

      <div className="flex flex-row justify-end items-start  h-5/6  ">
        <div className="w-1/2  h-full flex flex-col items-center  p-3 overflow-y-scroll no-scroll" >
          <div
            className="w-11/12  flex flex-col px-3 mb-12 bg-white"
            style={{ minHeight: "30rem",boxShadow:" 0px 4px 12px 1px #888888" }}
          >
            <div className="self-start text-xl font-bold flex items-center ">
              <div className="rounded-full w-6 h-6 bg-white flex items-center ">
                <img style={{objectFit:"cover"}} className="rounded-full w-full h-full" src={img} alt="profile" />
              </div>
              <p>Paylaşan Kişi</p>
            </div>
            <div className="px-6 py-3">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias aut, repellat ipsum facere voluptate dicta obcaecati deserunt nobis suscipit eaque?<img className="w-full h-72 mt-3 " style={{objectFit:"contain"}} src={img}  alt=""/></div>
          </div>
          <div className="w-11/12 bg-gray-500" style={{ minHeight: "30rem" }}>
            Post
          </div>
          <div className="w-11/12 bg-gray-500" style={{ minHeight: "30rem" }}>
            Post
          </div>
        </div>

        <div className="w-1/4 flex flex-col justify-start items-center">
          <div className="w-3/4 bg-white h-1/2">En Aktif Kulüpler</div>
          <div className="w-3/4 bg-white h-1/2">En Aktif Konular</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
