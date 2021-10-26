import React from "react";
import api from "../data/dataset";
import CanvasJSReact from "../assets/canvasjs.react";
import chroma from "chroma-js";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var color_scale = chroma.scale(["red", "limegreen"]).domain([0, 0.9]);

function pieChart(items, index) {
  let key;
  const newArray = [];
  const total = items.reduce((sum, item) => {
    return sum + item.Count;
  }, 0);
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (index === 2) key = Object.keys(item)[0];
    else key = Object.keys(item)[1];
    const refresh = {
      label: item[key],
      y: Number.parseFloat((item.Count / total) * 100).toPrecision(4)
    };
    newArray.push(refresh);
  }
  console.log(newArray);
  return [total, newArray];
}

function pieObjects(item, index) {
  const key = Object.keys(item);
  const title = item[key].title;
  const [total, data] = pieChart(item[key].data, index);
  const colors = item[key].data.map((i) => {
    return color_scale((i.Count / total) * 1).hex();
  });
  const chartInfo = {
    title: title,
    data: data,
    colors: colors
  };
  return chartInfo;
}

function charts(data, index) {
  const item = pieObjects(data, index);
  CanvasJS.addColorSet(item.title, item.colors);
  const option = {
    // colorSet: item.title,
    animationEnabled: true,
    title: {
      text: item.title
    },
    data: [
      {
        type: "pie",
        toolTipContent: "{label}: <strong>{y}%</strong>",
        indexLabel: "{label} - {y}%",
        dataPoints: item.data
      }
    ]
  };
  return option;
}

export default function Test() {
  const API = api;
  const pie = API.response.slice(0, 3);
  // const bar = API.response.slice(3, 5);
  const options = pie.map((item, index) => {
    return charts(item, index);
  });

  return (
    <div className="row mt-5">
      {options.map((option, index) => {
        if (index < 2)
          return (
            <div className="col-lg-6">
              <CanvasJSChart options={option} />
            </div>
          );
        else
          return (
            <div className="col-lg-6 container">
              <CanvasJSChart options={options[2]} />
            </div>
          );
      })}
      {/* <DataTable /> */}
    </div>
  );
}
