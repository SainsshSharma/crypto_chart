import { useStore } from "../../Components/store/storeGraph";
import "./Settings.css";

const Settings = () => {

  const {updateCurr}=useStore()
  const {updateSecondCurr}=useStore()  

  const data=[
    {
      name:"Bitcoin",
      id:"bitcoin"
    },
    {
      name:"Tether",
      id:"tether"
    },
    {
      name:"XRP",
      id:"ripple"
    },
    {
      name:"LiteCoin",
      id:"litecoin"
    },
    {
      name:"Dogecoin",
      id:"dogecoin"
    },
    
  ]

  return (
    <div className="settingsContainer">
      <div className="firstValue">
        <div className="settingsHeading">Default Coin</div>
        <select name="default" id="" onChange={(value)=>{updateCurr(value.target.value)}}>          
          {data.map((item,index)=>{
            return(
              <option value={item.id} key={index}>{item.name}</option>
            )
          })}
        </select>
      </div>
      <div className="secondValue">
        <div className="settingsHeading">Second Coin</div>
        <select name="default" id="" onChange={(value)=>{updateSecondCurr(value.target.value)}}>
        {data.map((item,index)=>{
            return(
              <option value={item.id} key={index}>{item.name}</option>
            )
          })}
        </select>
      </div>
    </div>
  );
};

export default Settings;
