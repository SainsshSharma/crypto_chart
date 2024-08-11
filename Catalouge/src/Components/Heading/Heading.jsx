import { useEffect, useState } from "react";
import { useStore } from "../store/storeGraph";
import "./Heading.css";
import { fetchHeadingData } from "../utils/utils";
const Heading = () => {

  // eslint-disable-next-line no-unused-vars
  const {curr,updateCurr}=useStore()
  const [data,setData]=useState();

  useEffect(()=>{
    
    fetchHeadingData(curr).then(data=>setData(data[0]))   

  },[curr])
  
  return (
    <div className="headingContainer">
      <div className="heading">
        {data? Number(data.current_price).toLocaleString() : "Loading"}
        
        <sup>USD</sup>
      </div>
      <div className="profit">
        {data? Number(data.ath).toLocaleString():"Loading"} ( {data?Number(data.atl).toLocaleString()+"%":"Loading"} )
      </div>
      
    </div>
  );
};

export default Heading;
