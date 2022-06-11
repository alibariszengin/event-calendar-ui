import Navbar from "../Login&Sign/Components/Navbar/Navbar.js";
import axios from "axios";
import auth from "../../auth/auth";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import LoggedInUser from "../../store/action/userAction.js";

import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
function Dashboard() {
  const user = useSelector((state) => state.user);
  const [load, setLoad] = useState(false);
  const [err, setErr] = useState("");
  const dispatch = useDispatch();
  const [img, setImg] = useState();
  function UseDispatch(res) {
    dispatch(LoggedInUser(res));
  }
  const getImage = async () => {
    // const getProfileAxios=axios.create({
    //   baseURL:"https://janusbackend.herokuapp.com",

    // })

    const access = Cookies.get("access");
    await axios.get("http://localhost:5000/api/users/image/get").then(
      (response) => {
        console.log("img");
        console.log(response);
        // const based64 = new Buffer.from(response.data).toString('base64');
        // setImg(based64)

        setImg(response.config.url);
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
    //getImage();
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
    <div
      className="h-screen w-100 flex flex-col"
      style={{ background: "#f1ffad" }}
    >
      <Navbar text="Çıkış Yap" to="/login" />

      <div className="flex h-5/6  ">
        <div
          className="w-1/4 d-block flex justify-center"
          style={{
            background:
              "linear-gradient(to bottom, rgba(241, 255, 173, 255) 0%, rgba(86, 92, 90, 0) 75%, rgba(241, 255, 118, 0) 75%, rgba(241, 255, 118, 255) 100%)",
          }}
        >
          Ali Barış Zengin
        </div>
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
