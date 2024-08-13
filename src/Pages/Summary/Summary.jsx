/* eslint-disable react/prop-types */
import Tables from "../../Components/Tables/Tables"
import "./Summary.css"
import {useStore} from "../../Components/store/storeGraph"
import { useOutletContext } from "react-router-dom"

const Display=({data,second})=>{
    const {compare,curr,secondCurr}=useStore()
    
  return(<div>
    {
      !compare?
      (<div className="compareTable">
        <Tables data={data} curr={curr}/>
      </div>)
      :
      <div className="compareTable">
        <Tables data={data} curr={curr}/>
        <Tables data={second} curr={secondCurr}/>
      </div>
    }
  </div>)
}
const Summary = () => {

  const [data,secondData]=useOutletContext()  

  return (    
    Object.keys(data).length!==0?<Display data={data} second={secondData}></Display>:<div>Loading...</div>
    
  )
}

export default Summary