/* eslint-disable react/prop-types */
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useEffect } from "react";
import { filterOHLCData, filterOHLCDataForVolume } from "../utils/utils";

const AreaChart = ({ data, element, curr }) => {
  useEffect(() => {
    var root = am5.Root.new(element);
    root._logo.dispose();

    
    root.setThemes([am5themes_Animated.new(root)]);

    
    var chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        focusable: true,
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        layout: root.verticalLayout,
        cursor: am5xy.XYCursor.new(root, {}),
      })
    );

    chart.setAll({
      fontFamily: "circularstd",
    });

    
    chart.children.unshift(
      am5.Label.new(root, {
        text: `${curr}`,
        fontSize: 20,
        fontWeight: "normal",
        textAlign: "center",
        x: am5.p50,
        centerX: am5.p50,
        paddingTop: 20,
        paddingBottom: 20,
        fontFamily: "circularstd",
      })
    );
    var yRenderer = am5xy.AxisRendererY.new(root, {});
    yRenderer.labels.template.set("visible", false);
    var xRenderer = am5xy.AxisRendererX.new(root, {});
    xRenderer.labels.template.set("visible", false);
    
    var xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.1,
        groupData: false,
        baseInterval: {
          timeUnit: "minute",
          count: 1,
        },
        renderer:xRenderer,
        tooltip: am5.Tooltip.new(root, {
          dy:-60,
        }),
      })
    );

    
    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer:yRenderer,
        tooltip: am5.Tooltip.new(root, {
          dx:60,
        }),
      })
    );

    
    var series = chart.series.push(
      am5xy.LineSeries.new(root, {
        stacked: true,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "c", 
        valueXField: "t", 
        stroke: am5.color("#4B40EE"),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    
    series.fills.template.setAll({
      visible: true,
      fillOpacity: 1,
      fillGradient: am5.LinearGradient.new(root, {
        stops: [
          { color: am5.color("#4B40EE"), opacity: 0.4 },
          { color: am5.color("#fff"), opacity: 0 },
        ],
        rotation: 90,
      }),
    });

    var yRendererVolume = am5xy.AxisRendererY.new(root, {opposite:true})
yRendererVolume.labels.template.set('visible', false)

    
    var yAxisVolume = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: yRendererVolume,
        y: 280,
        
        height: am5.percent(30), 
        min: 0,
      })
    );

    var xAxisVolume = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.1,
        groupData: false,
        baseInterval: {
          timeUnit: "minute",
          count: 1,
        },
        renderer:xRenderer,        
      })
    );

    
    var volumeSeries = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        stacked: true,
        xAxis: xAxisVolume,
        yAxis: yAxisVolume,
        valueYField: "v", 
        valueXField: "t", 
        fill: am5.color("#E6E8EB"),        
        tooltip: am5.Tooltip.new(root, {
          labelText: "Volume: {valueY}",
        }),
      })
    );

    
    volumeSeries.columns.template.setAll({
      width: 5,
    });

    
    series.data.setAll(filterOHLCData(data));
    volumeSeries.data.setAll(filterOHLCDataForVolume(data));

    
    series.appear(1000, 100);
    volumeSeries.appear(1000, 100);
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [data, element, curr]);

  return (
    <div
      id={element}
      className="charts"
      style={{ width: "100%", height: "500px" }}
    ></div>
  );
};

export default AreaChart;
