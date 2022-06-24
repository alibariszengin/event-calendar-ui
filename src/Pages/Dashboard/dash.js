import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Col, Row } from "reactstrap";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import axios from "axios";
import Cookies from "js-cookie";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import Alert from "sweetalert2";

import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fullcalendar/core/main.css";
import "./style.css";
import { white } from "@tailwindcss/postcss7-compat/colors";
import Loading from "../../shared/loading";
import { Redirect } from "react-router-dom";

class Dash extends Component {
  state = {
    load: false,
    err: "",
    tags: {
      One: {
        color: "red",
      },
    },
    showNotification: false,
    calendarEvents: [
      {
        title: "Atlanta Monster",
        start: new Date("2022-06-19 00:00"),
        end:new Date("2022-06-20 00:00"),
        id: "99999998",
      },
      {
        title: "My Favorite Murder",
        start: new Date("2022-06-19 00:00"),
        end:new Date("2022-06-19 12:00"),
        id: "99999999",
      },
    ],
    events: [],
  };
  /**
   * adding dragable properties to external events through javascript
   */
  componentDidMount() {
    this.getUserInfos();
    
      let draggableEl = document.getElementById("external-events");
      new Draggable(draggableEl, {
        itemSelector: ".fc-event",
        eventData: (eventEl) => {
          let title = eventEl.getAttribute("title");
          let id = eventEl.getAttribute("data");
          let description = eventEl.getAttribute("description");
          let tag = eventEl.getAttribute("tag");

          let backgroundColor = this.state.tags[tag].color;
          return {
            title: title,
            id: id,
            description: description,
            tag: tag,
            backgroundColor: backgroundColor,
          };
        },
      });
    
  }
  logout = async () => {
    const access = Cookies.get("access");
    await axios.get("http://localhost:5000/api/auth/logout", {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }).then(
      (response) => {
        Cookies.set("access", null);

        
        window.location.replace("/login")
        
      },
      (error) => {
        console.log(error.message);
        this.setState({ err: error.message });
      }
    );
  };
  outlooklogout = async () => {
    await axios.get("http://localhost:5000/api/calendar/deleteAll").then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error.message);
        this.setState({ err: error.message });
      }
    );
  };
  syncOutlook = async () => {
    // const getProfileAxios=axios.create({
    //   baseURL:"https://janusbackend.herokuapp.com",

    // })

    const access = Cookies.get("access");
    await axios.get("http://localhost:5000/api/outlook").then(
      (response) => {
        console.log(response);
        window.location.href = response.data;
        // const based64 = new Buffer.from(response.data).toString('base64');
        // setImg(based64)

        //setImg(response.config.url);
      },
      (error) => {
        console.log(error.message);
        this.setState({ err: error.message });
      }
    );
  };
  getUserInfos = async () => {
    // const getProfileAxios=axios.create({
    //   baseURL:"https://janusbackend.herokuapp.com",

    // })

    const access = Cookies.get("access");
    await axios
      .get("http://localhost:5000/api/calendar", {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      .then(
        (response) => {
          console.log("Profile res");
          const events = this.state.calendarEvents
          events.push(...response.data.data)
          this.setState({calendarEvents:events})
          console.log(this.state.calendarEvents)
          //   user.data = response.data;
          //   user.status = response.status;
          //   user.data.name = `${response.data.first_name} ${response.data.last_name}`;

          //console.log(user);
          setTimeout(() => {
            this.setState({ load: true });
          }, 1000);
        },
        (error) => {
          console.log(error.message);
          setTimeout(() => {
            this.setState({ err: error.message });
          }, 1000);
        }
      );
  };

  addTagAlert = async (values = {}) => {
    return await Alert.fire({
      title: values.title,
      html: values.html,

      focusConfirm: false,
      preConfirm: () => [
        document.querySelector("#swal-input2").value,

        document.querySelector("#swal-color-input3").value,
      ],
    }).then((result) => {
      if (result.value) {
        return result.value;
      }
    });
  };
  editEventAlert = async (values = {}) => {
    let tag_string = "";
    const all_tags = Object.keys(this.state.tags).map(
      (key) => (tag_string += "<option value=" + key + ">" + key + "</option>")
    );
    const desc = values.description ? values.description : "Description";
    const tit = values.title ? values.title : "Title";
    return await Alert.fire({
      html: `<div style='background:#3788D8;color:white;border-radius:1rem;height:3rem;display:flex;align-items:center;justify-content:center;'>${values.text}</div>
      <div style='margin-top:2rem;display:flex;flex-direction:column;align-items:start;'><div><label style='margin-right:4.1rem'>Title</label><input id='swal-input2' class='swal2-input' placeholder=${tit}></div><div><label>Description</label><input id='swal-input3' class='swal2-input' placeholder=${desc}><select style="width:8rem" id='country' name='country'>${tag_string}</select></div></div>`,

      focusConfirm: false,
      preConfirm: () => [
        document.querySelector("#swal-input2").value,
        document.querySelector("#swal-input3").value,

        document.querySelector("#country").value,
      ],
    }).then((result) => result.value);
  };

  inputAlert = async (options, text) => {
    return await Alert.fire({
      html: text,
      ...options,
      focusConfirm: false,
      preConfirm: () => [
        document.querySelector("#swal-input2").value,
        document.querySelector("#swal-input3").value,
        document.querySelector("#country").value,
      ],
    }).then((result) => result.value);
  };
  fireAlert = (info = {}, options = {}, cb = () => {}) => {
    const desc = info.description ? info.description : "-";
    const title = info.title ? info.title : "No Title";
    Alert.fire({
      title: title,
      html:
        `<div class="table-responsive">
      <table class="table">
      <tbody>
      <tr >
      <td>Description</td>
      <td><strong>` +
        desc +
        `</strong></td>
      </tr>
      <tr >
      <td>Start Time</td>
      <td><strong>
      ` +
        info.start +
        `
      </strong></td>
      </tr>
      <tr >
      <td>End Time</td>
      <td><strong>
      ` +
        info.endTime +
        `
      </strong></td>
      </tr>
      </tbody>
      </table>
      </div>`,

      ...options,
    }).then((result) => {
      if (result.value) {
        cb();
      }
    });
  };
  /**
   * when we click on event we are displaying event details
   */
  eventClick = (eventClick, props = {}) => {
    const endTime =
      eventClick.event.end === null
        ? new Date(
            new Date(eventClick.event.start).setHours(
              eventClick.event.start.getHours() + 1
            )
          )
        : eventClick.event.end;
    const options =
      Object.keys(props).length === 0
        ? {
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Remove Event",
            cancelButtonText: "Close",
          }
        : props;

    console.log(eventClick.event);
    const info = {
      title: eventClick.event.title,
      description: eventClick.event.extendedProps.description,
      tag: eventClick.event.extendedProps.tag,
      start: eventClick.event.start,
      endTime: endTime,
    };
    const cb = () => {
      eventClick.event.remove(); // It will remove event from the calendar
      Alert.fire("Deleted!", "Your Event has been deleted.", "success");
    };
    this.fireAlert(info, options, cb);
  };
  renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }
  handleDateSelect = async (selectInfo) => {
    let tag_string = "";
    const all_tags = Object.keys(this.state.tags).map(
      (key) => (tag_string += "<option value=" + key + ">" + key + "</option>")
    );

    const title = await this.inputAlert(
      {},
      `<div style='background:#3788D8;color:white;border-radius:1rem;height:3rem;display:flex;align-items:center;justify-content:center;'>Please enter informations for your new event</div>
        <div style='margin-top:2rem;display:flex;flex-direction:column;align-items:start;'><div><label style='margin-right:4.1rem'>Title</label><input id='swal-input2' class='swal2-input'></div><div><label>Description</label><input id='swal-input3' class='swal2-input' ><select id='country' name='country'>${tag_string}</select></div></div>`
    );

    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: Math.random(),
        title: title[0],
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        extendedProps: {
          ...this.extendedProps,
          description: title[1],
          tag: title[2],
        },
        backgroundColor: this.state.tags[title[2]].color,
      });
    }
  };
  editValues = async (item) => {
    console.log(item);
    const values = await this.editEventAlert({
      text: "Please enter informations to update your event",
      title: item.title,
      description: item.description,
    });
  };
  addEvent = async () => {
    const values = await this.editEventAlert({
      text: "Please enter informations for your new event",
    });

    if (values) {
      const events = this.state.events;
      events.push({ title: values[0], description: values[1], tag: values[2] });
      this.setState({ events: events });
      console.log(this.state.events);
    }
  };
  addTag = async () => {
    const values = await this.addTagAlert({
      title: "Add New Tag",
      html:
        '<input id="swal-input2" class="swal2-input">' +
        '<input style="width:7rem;" id="swal-color-input3" type="color" class="swal2-input">',
    });
    const tags = this.state.tags;
    // const new_tag = {
    //     title:values[0],
    //     color:values[1],
    // }
    if (values) tags[values[0]] = { color: values[1] };
    console.log(tags);
    //tags.push(new_tag);
    this.setState({ tags: tags });
  };
  openEntegrationBar = () => {
    const right_bar = document.querySelector("#entegration-bar");
    const left_bar_arrow = document.querySelector("#left_bar_arrow");

    //right_bar.style.transform = "translate(-2rem,0px)";
    if (right_bar.style.width === "4%") {
      right_bar.style.width = "1%";
      left_bar_arrow.style.transform = "rotate(0deg)";
    } else {
      right_bar.style.width = "4%";
      left_bar_arrow.style.transform = "rotate(180deg)";
    }
  };
  openEnvelope = () => {
    const envelope = document.getElementById("envelope");

    this.setState({ showNotification: !this.state.showNotification });
    if (envelope.className === "fa-regular fa-envelope") {
      envelope.className = "fa-regular fa-envelope-open";
      envelope.style.transform = "translateY(-0.22rem)";
    } else {
      envelope.className = "fa-regular fa-envelope";
      envelope.style.transform = "translateY(0)";
    }
  };

  render() {
    
    return (
      <div
        style={{
          zIndex: 1,
          height: "100vh",
          width: "100%",
          display: "flex",
          overflow: "hidden",
        }}
      >
        <div
          className="animated fadeIn  demo-app "
          style={{
            zIndex: 1,
            height: "100vh",
            width: "99%",
            padding: "1.5rem 0px 1.5rem 1.5rem",
            overflow: "hidden",
          }}
        >
          <Row className="media-col-to-row">
            <Col id="side-bar-col" style={{ height: "100%" }}>
              <div
                id="external-events"
                style={{
                  padding: "1rem",
                  width: "100%",
                  minHeight: "100%",
                  maxHeight: "-webkit-fill-available",
                }}
              >
                <div style={{ width: "" }}>
                  <p align="center" style={{ position: "relative" }}>
                    <strong>
                      Etiketler{" "}
                      <span
                        onClick={() => this.addTag()}
                        style={{
                          display: "inline-block",
                          color: "white",
                          cursor: "pointer",
                        }}
                      >
                        <i
                          style={{
                            color: "#3788D8",
                            fontSize: "1.5rem",
                            position: "absolute",
                            right: "0rem",
                            top: "0rem",
                          }}
                          class="fa-solid fa-circle-plus"
                        ></i>
                      </span>
                    </strong>
                  </p>
                  <div style={{ display: "inline-block " }}>
                    {Object.keys(this.state.tags).map((key, index) => {
                      return (
                        <label class="container-checkbox">
                          {key}{" "}
                          <div
                            style={{
                              width: "0.5rem",
                              height: "2rem",
                              background: this.state.tags[key].color,
                              position: "absolute",
                              top: "0.2rem",
                              right: "-1rem",
                            }}
                          ></div>
                          <input type="checkbox" defaultChecked="true" />
                          <span class="checkmark"></span>
                        </label>
                      );
                    })}
                  </div>
                </div>
                <p align="center" style={{ position: "relative" }}>
                  <strong>
                    Events{" "}
                    <span
                      onClick={() => this.addEvent()}
                      style={{
                        display: "inline-block",
                        color: "white",
                        cursor: "pointer",
                      }}
                    >
                      <i
                        style={{
                          color: "#3788D8",
                          fontSize: "1.5rem",
                          position: "absolute",
                          right: "0rem",
                          top: "0rem",
                        }}
                        class="fa-solid fa-circle-plus"
                      ></i>
                    </span>
                  </strong>
                </p>
                {this.state.events.map((event) => (
                  <div
                    className="fc-event"
                    style={{
                      height: "3rem",
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    title={event.title}
                    data={event.id}
                    key={event.id}
                    tag={event.tag}
                    description={event.description}
                    onClick={(item) => this.editValues(event)}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            </Col>

            <Col id="cal-col">
              <div className="demo-app-calendar">
                <FullCalendar
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  defaultView="dayGridMonth"
                  header={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                  }}
                  color="white"
                  height="100%"
                  rerenderDelay={10}
                  eventDurationEditable={true}
                  editable={true}
                  selectable={true}
                  selectMirror={true}
                  droppable={true}
                  ref={this.calendarComponentRef}
                  weekends={this.state.calendarWeekends}
                  events={this.state.calendarEvents}
                  select={this.handleDateSelect}
                  eventDrop={this.drop}
                  eventContent={this.renderEventContent}
                  // drop={this.drop}
                  eventReceive={this.eventReceive}
                  eventClick={this.eventClick}
                  // selectable={true}
                  eventAdd={function () {}}
                  eventChange={function () {}}
                  eventRemove={function () {}}
                />
              </div>
            </Col>
          </Row>
        </div>
        <div
          id="entegration-bar"
          style={{
            width: "1%",
            background: "black",
            marginLeft: "1rem",
            borderTopLeftRadius: "1rem",
            borderBottomLeftRadius: "1rem",
            display: "flex",
            //justifyContent:"space-between",
            //justifyContent: "center",
            //transform: "translate(0rem,0px)",
            transition: "width 1s ease-in-out",
            position: "relative",
            fontSize: "1.5rem",
          }}
        >
          <div style={{ marginTop: "1rem" }}>
            <div
              style={{ cursor: "pointer", fontSize: "1.2rem" }}
              onClick={() => this.openEntegrationBar()}
            >
              <i
                id="left_bar_arrow"
                class="fa-solid fa-square-caret-left"
                style={{
                  color: "white",
                  transition: "transform 1s ease-in-out",
                }}
              ></i>
            </div>
            <div
              style={{
                marginTop: "3.1rem",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <i
              onClick={()=>this.syncOutlook()}
                class="fa-brands fa-windows "
                style={{
                  color: "white",
                  cursor: "pointer",
                  transform: "translateX(1.5rem)",
                  marginBottom: "2rem",
                }}
              ></i>
              <i
                style={{
                  color: "white",
                  cursor: "pointer",
                  transform: "translateX(1.5rem)",
                }}
                class="fa-brands fa-google"
              ></i>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              zIndex: "5",
              bottom: "1rem",
              transform: "translateX(1.5rem)",
            }}
          >
            <div
              onClick={this.openEnvelope}
              style={{ color: "white", position: "relative", zIndex: 10 }}
            >
              <div
                style={{
                  display: this.state.showNotification ? "block" : "none",
                  width: "25rem",
                  height: "25rem",
                  position: "absolute",
                  left: "-25.5rem",
                  top: "-23rem",
                  color: "black",
                  background: "#EEEEEE",
                  zIndex: "20",
                  borderRadius: "2rem",
                  overflow: "hidden",
                }}
              >
                <p align="center" style={{ background: "#3788D8" }}>
                  Notifications
                </p>
                <div style={{ fontSize: "1rem", padding: "0 1rem 0 1rem" }}>
                  <div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;User256 15.05.1999 tarihinde
                    sizden saat 19.00 için BlaBla schedule'dan görüşme almıştır.
                  </div>
                  <hr></hr>
                  <div>
                    User256 15.05.1999 tarihinde sizden saat 19.00 için BlaBla
                    schedule'dan görüşme almıştır.
                  </div>
                  <div>
                    User256 15.05.1999 tarihinde sizden saat 19.00 için BlaBla
                    schedule'dan görüşme almıştır.
                  </div>
                </div>
              </div>
              <i id="envelope" class="fa-regular fa-envelope"></i>
            </div>
            <div onClick={() => this.logout()}>
              <i
                style={{ color: "white" }}
                class="fa-solid fa-arrow-right-from-bracket"
              ></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dash;
