/* eslint-disable react/prop-types */
import CandleChart from "../../Components/CandleChart/CandleChart";
import { useStore } from "../../Components/store/storeGraph";
import "./Statistics.css";
import { useOutletContext } from "react-router-dom";

const DisplayCandleChart = ({ data, second }) => {
  const { compare, curr, secondCurr } = useStore();

  return (
    <div>
      {!compare ? (
        <CandleChart data={data} element="chartdiv7" curr={curr} />
      ) : (
        <div className="compareTable">
          <div className="first">
            <CandleChart data={data} element="chartdiv8" curr={curr} />
          </div>
          <div className="second">
            <CandleChart data={second} element="chartdiv9" curr={secondCurr} />
          </div>
        </div>
      )}
    </div>
  );
};
const Statistics = () => {
  const [data, secondData] = useOutletContext();

  return Object.keys(data).length !== 0 ? (
    <DisplayCandleChart data={data} second={secondData} />
  ) : (
    <div>Loading...</div>
  );
};

export default Statistics;
