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

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
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

    // Title
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

    // Create Y and X Axis without labels
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
        renderer: xRenderer,
      })
    );

    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: yRenderer,
        tooltip: am5.Tooltip.new(root, {
          radius: 5,
          dx: chart.width() - 22,
          pointerOrientation: "left",          
        }),
      })
    );

    yAxis
      .get("tooltip")
      .get("background")
      .setAll({
        fill: am5.color("#1A243A"),
        cornerRadiusTL: 5,
        cornerRadiusTR: 5,
        cornerRadiusBL: 5,
        cornerRadiusBR: 5,
      });

    yAxis.get("tooltip").label.setAll({
      fontSize: 18,
      fill: am5.color("#FFFFFF"),
      fontFamily: "circularstd",
    });

    // Create the main line series
    var series = chart.series.push(
      am5xy.LineSeries.new(root, {
        stacked: true,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "c", // Closing price
        valueXField: "t", // Time
        stroke: am5.color("#4B40EE"),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    // Add gradient to the line series
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

    // Add label for current value at the end of the series
    const currentLabel = chart.plotContainer.children.push(
      am5.Label.new(root, {
        text: "",
        fontSize: 18,
        fontWeight: "bold",
        fill: am5.color("#FFFFFF"),
        background: am5.RoundedRectangle.new(root, {
          fill: am5.color("#4B40EE"),
          cornerRadiusTL: 5,
          cornerRadiusTR: 5,
          cornerRadiusBL: 5,
          cornerRadiusBR: 5,
        }),
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        x: am5.p100,
        centerX: am5.p100,
        centerY: am5.p50,
        dy: -20, // Adjust vertically
      })
    );

    series.events.on("datavalidated", function () {
      const lastDataItem = series.dataItems[series.dataItems.length - 1];
      const value = lastDataItem.get("valueY");
      const date = lastDataItem.get("valueX");

      // Position label near the last point
      currentLabel.set("text", `${value}`);
      currentLabel.set(
        "x",
        xAxis.valueToPosition(date) * chart.plotContainer.width()
      );

      // Use pixelPositionY for more accurate y placement
      const pixelY = yAxis
        .get("renderer")
        .positionToCoordinate(yAxis.valueToPosition(value));

      // Adjust the label's Y position to stay within the plot area
      const labelHeight = currentLabel.height();
      let adjustedY = pixelY;

      if (pixelY + labelHeight / 2 > chart.plotContainer.height()) {
        adjustedY = chart.plotContainer.height() - labelHeight / 2;
      }
      if (pixelY - labelHeight / 2 < 0) {
        adjustedY = labelHeight / 2;
      }

      currentLabel.set("y", adjustedY);
    });

    // Create the volume series
    var yRendererVolume = am5xy.AxisRendererY.new(root, 
      { opposite: true }
    );
    yRendererVolume.labels.template.set("visible", false);

    var yAxisVolume = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: yRendererVolume,
        y: 280,
        height: am5.percent(30),
        min: 0,
      })
    );
    let yRendererGridVol = yAxisVolume.get("renderer");
    yRendererGridVol.grid.template.setAll({
      stroke: am5.color(0xff0000),
      strokeWidth: 2,
      opacity: 0,
    });
    var xAxisVolume = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.1,
        groupData: false,
        baseInterval: {
          timeUnit: "second",
          count: 1,
        },
        renderer: xRenderer,
      })
    );

    var volumeSeries = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        stacked: true,
        clustered: false,
        xAxis: xAxisVolume,
        yAxis: yAxisVolume,
        valueYField: "v", // Volume
        valueXField: "t", // Time
        fill: am5.color("#E6E8EB"),
        tooltip: am5.Tooltip.new(root, {
          labelText: "Volume: {valueY}",
        }),
      })
    );

    volumeSeries.columns.template.setAll({
      width: 5,
    });

    // Set data
    series.data.setAll(filterOHLCData(data));
    volumeSeries.data.setAll(filterOHLCDataForVolume(data));

    let yRendererGrid = yAxis.get("renderer");
    yRendererGrid.grid.template.setAll({      
      strokeWidth: 2,
      opacity: 0.1,
    });

    // Make stuff animate on load
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
