import Navbar from "../Login&Sign/Components/Navbar/Navbar.js";
import axios from "axios";
import auth from "../../auth/auth";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect, useHistory  } from "react-router-dom";
import LoggedInUser from "../../store/action/userAction.js";
import SideBar from "./sideBar.js";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import Loading from "../../shared/loading.js";
function Dashboard() {
  const user = useSelector((state) => state.user);
  const [load, setLoad] = useState(false);
  const [err, setErr] = useState("");
  const dispatch = useDispatch();
  const [img, setImg] = useState();

  function UseDispatch(res) {
    dispatch(LoggedInUser(res));
  }
  const logout = async () => {
    await axios.get("http://localhost:5000/api/outlook/logout").then(
      (response) => {
        
        console.log(response);
        
      },
      (error) => {
        console.log(error.message);
        setErr(error.message);
      }
    );
  }
  const syncOutlook = async () => {
    // const getProfileAxios=axios.create({
    //   baseURL:"https://janusbackend.herokuapp.com",

    // })

    const access = Cookies.get("access");
    await axios.get("http://localhost:5000/api/outlook").then(
      (response) => {
        
        console.log(response);
        window.location.href = response.data
        // const based64 = new Buffer.from(response.data).toString('base64');
        // setImg(based64)

        //setImg(response.config.url);
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
          setTimeout(()=>{
            setLoad(true);
          }, 3000)
          
        },
        (error) => {
          console.log(error.message);
          setTimeout(()=>{
            setErr(error.message);
          }, 3000)
          
        }
      );
  };

  useEffect(() => {
    //getImage();
    getUserInfos();
  }, []);
  if (!load) {
    if (err) {
      return <Redirect to="/login" />;
    } else {
      return <Loading/>;
    }

    // <div className="">{err ? err : "Loading"}</div>
  }
  const style= {
    background:"#56A9CA"
  }
  return (
    <div
      className="h-screen w-100 flex flex-col"
      //style={{ background: "#f1ffad" }}
      style={{background:"linear-gradient(to bottom, rgba(86, 169, 202, 255) 0%, rgba(86, 169, 202, 0) 99%, rgba(128, 169, 202, 0) 99%, rgba(128, 169, 202, 255) 100%)"}}
    >
      <Navbar text="Çıkış Yap" to="/login" />

      <div className="flex h-5/6  ">
        <SideBar/><div><button onClick={syncOutlook}>Sync Outlook</button><button onClick={logout}>Logout Outlook</button></div>
        <div className="h-full w-3/4">
          <FullCalendar
            height="100%"
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            weekends={false}
            events={[
              { title: "event 1", date: "2022-07-01" },
              { title: "event 2", date: "2022-07-02" },
            ]}
          />{" "}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
