import React from "react";
import api from "../data/dataset";
import CanvasJSReact from "../assets/canvasjs.react";
import chroma from "chroma-js";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var color_scale = chroma.scale(["red", "limegreen"]).domain([0, 0.08]);
function getData(items) {
  const bar = [];
  bar.push(items.response[3]);
  bar.push(items.response[4]);
  bar.push(items.response[6]);
  bar.push(items.response[7]);
  return bar;
}

function parsedData(data, total) {
  return color_scale(data.Count / total).hex();
}

function barObjects(item) {
  const key = Object.keys(item);
  const title = item[key].title;
  const dataSet = item[key].data;
  const total = dataSet.reduce((sum, data) => {
    return sum + data.Count;
  }, 0);
  const newArray = dataSet.map((data) => {
    const k = Object.keys(data)[1];
    const value = { y: data.Count, label: data[k] };
    // console.log(value);
    return { y: data.Count, label: data[k] };
  });
  // console.log(newArray);
  const color = dataSet.map((data) => {
    return parsedData(data, total);
  });
  const object = {
    title: title,
    data: newArray
  };
  // console.log(object.data);
  CanvasJS.addColorSet(object.title, color);
  const option = {
    culture: "es",
    colorSet: object.title,
    animationEnabled: true,
    theme: "light2", // "light1", "light2", "dark1", "dark2"
    title: {
      text: object.title
    },
    axisX: {
      interval: 1,
      labelAngle: -90
    },
    data: [
      {
        type: "column",
        dataPoints: object.data
      }
    ]
  };
  return option;
}

export default function BarChart() {
  const bar = getData(api);
  const options = bar.map((b) => barObjects(b));
  return (
    <div className="mt-5 mb-5">
      {options.map((option, index) => {
        return (
          <div className="mt-5">
            <CanvasJSChart key={index} options={option} />
          </div>
        );
      })}
    </div>
  );
}
