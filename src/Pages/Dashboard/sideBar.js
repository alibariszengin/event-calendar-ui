import "./index.css";
function SideBar() {
  return (
    <div
      className="w-1/4 d-block flex flex-col items-center"
      /*style={{
        background:
          "linear-gradient(to bottom, rgba(241, 255, 173, 255) 0%, rgba(86, 92, 90, 0) 75%, rgba(241, 255, 118, 0) 75%, rgba(241, 255, 118, 255) 100%)",
      }}*/
    >
      <div>Ali Barış Zengin</div>

      <div id="add-event" className="flex flex-row">
        <div className="w-1/3 flex flex-col justify-center">
          <p>Title</p>
          <p>Type</p>
          <p>Description</p>
          <p>Start Time</p>
          <p>End Time</p>
        </div>
        <div className="w-2/3 ">
          <form className=" pt-2 flex flex-col">
            <input />
            <div>
              <input type="radio" name="fav_language" value="Event" /> Event
              <input type="radio" name="fav_language" value="Task" /> Task
            </div>

            <input />
            <input placeholder="15.05.1999 02.15"/>
            <input placeholder="15.05.2022 02.15"/>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
