import React from "react";
import chroma from "chroma-js";
import { Pie } from "react-chartjs-2";

export default function Charts(props) {
  var color_scale = chroma.scale(["#08306B", "#F7FBFF"]);
  console.log(props.api);
  const graph1 = props.api.response[0].graph1;
  const os = graph1.data.map((item) => item.Os);
  const items = graph1.data.map((item) => item.Count);
  const total = graph1.data.reduce((accumulate, item) => {
    return accumulate + item.Count;
  }, 0);
  const colors = graph1.data.map((item) => {
    return color_scale(item.Count / total).hex();
  });
  console.log(graph1.title);
  console.log(total);
  console.log(colors);
  return (
    <div className="row">
      <div className="col-md-4 border border-dark rounded-lg">
        <h3 style={{ textAlign: "center" }}>{graph1.title}</h3>
        <div>
          <Pie
            data={{
              labels: os,
              datasets: [
                {
                  label: graph1.title,
                  data: items,
                  backgroundColor: colors
                }
              ]
            }}
            height={400}
            width={600}
            options={{
              maintainAspectRatio: false
            }}
          />
        </div>
      </div>
      <div className="col-md-4 border border-dark rounded-lg">
        <Pie
          data={{
            labels: os,
            datasets: [
              {
                label: graph1.title,
                data: items,
                backgroundColor: colors
              }
            ]
          }}
          height={400}
          width={600}
          options={{
            maintainAspectRatio: false
          }}
        />
      </div>
      <div className="col-md-4 border border-dark rounded-lg">
        <Pie
          data={{
            labels: os,
            datasets: [
              {
                label: graph1.title,
                data: items,
                backgroundColor: colors
              }
            ]
          }}
          height={400}
          width={600}
          options={{
            maintainAspectRatio: false
          }}
        />
      </div>
    </div>
  );
}
