/* eslint-disable react/prop-types */
import { useEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import {filterOHLCData } from "../utils/utils";

const CandleChart = ({data,element}) => {
  
  useEffect(() => {
    // Create the root element for the chart
    const root = am5.Root.new(element);
    root._logo.dispose();

    // Set the theme
    root.setThemes([am5themes_Animated.new(root)]);

    // Create the XY chart
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
      })
    );

    // Add X and Y axes
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.5,
        groupData: true,
        baseInterval: { timeUnit: "day", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // Create the candlestick series
    const series = chart.series.push(
      am5xy.CandlestickSeries.new(root, {
        name: "Candlestick",
        clustered: false,
        valueYField: "c",
        openValueYField: "o",
        lowValueYField: "l",
        highValueYField: "h",
        valueXField: "t",
        xAxis: xAxis,
        yAxis: yAxis,
      })
    );

    series.data.setAll(filterOHLCData(data));

    // Clean up the chart when the component unmounts
    return () => {
      root.dispose();
    };
  }, [data]);

  return <div id={element} className="charts" style={{ width: "100%", height: "500px" }}></div>;
};

export default CandleChart;
