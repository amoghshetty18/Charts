import React from "react";
import api from "../data/dataset";

function createData(items) {
  return items.map((item) => {
    const data = {
      count: item.Count,
      detail: item.Detail
    };
    return data;
  });
}

export default function DataTable(props) {
  const len = api.response.length;
  const dataTable = api.response[len - 1];
  const cleanData = createData(dataTable.datatable1.data);
  return (
    <div>
      <h1 className="container mb-5" style={{ textAlign: "center" }}>
        List of Errors
      </h1>
      <div style={{ overflow: "scroll", height: "500px" }}>
        <table className="table container table-bordered">
          <thead>
            <tr>
              <th>Error</th>
              <th>Error Details</th>
              <th>Count</th>
            </tr>

            {cleanData.map((data, index) => {
              return (
                <tr key={index}>
                  <td>Error</td>
                  <td>{data.detail}</td>
                  <td>{data.count}</td>
                </tr>
              );
            })}
          </thead>
        </table>
      </div>
    </div>
  );
}
