import React from "react";
import API from "./components/API";
import DataTable from "./components/DataTable";
import Pie from "./components/Test";
import Bar from "./components/BarChart";

export default function App() {
  return (
    <div className="container">
      <h1
        className="container mt-5 mb-5"
        style={{ textAlign: "center", fontSize: "80px" }}
      >
        Data Representations
      </h1>
      <Pie />
      <Bar />
      <DataTable />
    </div>
  );
}
