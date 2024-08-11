import "./Actionbar.css";
import { useStore } from "../store/storeGraph";
import { useState } from "react";

const Actionbar = () => {
  const { interval, updateInterval } = useStore();
  const { compare, updateCompare } = useStore();
  const [fullScreen,setFullScreen]=useState(false);
  function setValue(event) {
    updateInterval(event);
  }

  const btnData = [
    { data: "1d", value: "1" },
    { data: "3d", value: "3" },
    { data: "1w", value: "7" },
    { data: "1m", value: "30" },
    { data: "6m", value: "182" },
    { data: "1y", value: "365" },
    { data: "max", value: 365 },
  ];
  function fullScreenFunction(){
    setFullScreen(!fullScreen)
    
    const elemet=document.getElementById("fullScreen")
    const isFullScreen=document.fullscreenElement
    if(!isFullScreen)
    {
      elemet.requestFullscreen()
    }
    else{
      document.exitFullscreen()
    }
  }
  return (
    <div className="actionbarContainer">
      <div className="options">
        <div className="icons">
          <button className="icon" onClick={fullScreenFunction}>
            <img src="./enlarge.png" alt="" />
            {!fullScreen?"Fullscreen":"Exit FullScreen"}
          </button>
          <button
            className="icon"
            onClick={() => {
              updateCompare(!compare);
            }}
          >
            <img src="./add.png" alt="" />
            Compare
          </button>
        </div>
        <div className="days">
          <ul>
            {btnData.map((item, key) => {
              return (
                <li key={key}>
                  <button
                    onClick={() => setValue(item.value)}
                    className={`${item.value === interval ? "active" : ""}`}
                  >
                    {item.data}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Actionbar;
