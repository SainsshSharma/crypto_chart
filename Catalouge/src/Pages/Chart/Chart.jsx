/* eslint-disable react/prop-types */
import { useStore } from "../../Components/store/storeGraph";
import "./Chart.css";

import AreaChart from "../../Components/AreaChart/AreaChart";
import { useOutletContext } from "react-router-dom";

const DisplayAreaCharts = ({ data, second }) => {
  const { compare,curr,secondCurr } = useStore();
  
  return (
    <div>
      {!compare ? (
        <AreaChart data={data} element="chartdiv1" curr={curr.toUpperCase()} />
      ) : (
        <div className="compareTable">
          <div className="first">
            <AreaChart data={data} element="chartdiv2" curr={curr.toUpperCase()}/>
          </div>
          <div className="second">
            <AreaChart data={second} element="chartdiv3" curr={secondCurr.toUpperCase()}/>
          </div>
        </div>
      )}
    </div>
  );
};

const Chart = () => {
  const [data, secondData] = useOutletContext();
  return Object.keys(data).length !== 0 ? (
    <DisplayAreaCharts data={data} second={secondData} />
  ) : (
    <div>Loading...</div>
  );
};

export default Chart;
